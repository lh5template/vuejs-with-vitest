import AxiosMockAdapter from "axios-mock-adapter";
import { TOKEN_HEADER_KEY, REQUEST_ID_KEY, http } from "@/tools/http";
import { saveToken } from "@/tools/token";
import { beforeEach, describe, it, vi, expect } from "vitest";
import * as handler from "@/tools/httpErrorHandler";
import { reactive, ref } from "vue";

// 专门用于单元测试的 axios adapater
const mockHttp = new AxiosMockAdapter(http);

// 发送请求
const sendRequest = (opts = {}) => http.get("/mock-request", opts);

// 获取最后一个请求记录
const getLastRequest = () => mockHttp.history.get[0];

// 模拟响应
function mockReply(status, data = null) {
  if (data) {
    mockHttp.onGet("/mock-request").reply(status, data);
  } else {
    mockHttp.onGet("/mock-request").reply(status);
  }
}

describe("测试请求客户端", () => {
  beforeEach(() => {
    mockHttp.reset();
  });
  
  it(`发送请求之前应该自动将vue的响应式数据转化为普通的对象数据`, async () => {
    const rawData = { foo: "bar", baz: 123 };
    
    const params = reactive(rawData);
    const data = ref(rawData);

    mockReply(200);
    await sendRequest({
      params,
      data,
    });

    const lastRequest = getLastRequest();

    expect(lastRequest.params).toEqual({
      ...rawData,

      // 别忘记了请求 requestId 参数
      [REQUEST_ID_KEY]: expect.any(String),
    });

    // 由于 axios 会自动将post参数转换为字符串, 所以应该比较字符串
    expect(lastRequest.data).toBe(JSON.stringify(rawData));
  });

  it(`应该给每个请求添加 ${REQUEST_ID_KEY} 参数`, async () => {
    mockReply(200);
    await sendRequest();

    const lastRequest = getLastRequest();
    expect(lastRequest.params[REQUEST_ID_KEY]).toBeTypeOf("string");
  });

  it(`当有 token 的时候, 应该添加 ${TOKEN_HEADER_KEY} 字段到 header 中`, async () => {
    const token = "token-string";
    saveToken(token);

    mockReply(200);
    await sendRequest();

    const lastRequest = getLastRequest();
    expect(lastRequest.headers[TOKEN_HEADER_KEY]).toBe(token);
  });

  it(`当 status 为 200 的时候,应该直接返回响应体`, async () => {
    const body = {
      msg: "response body",
    };
    mockReply(200, body);

    const data = await sendRequest();

    expect(data).toEqual(body);
  });

  it("当 status 不为 200 的时候, 应该调用 httpErrorHander ", async () => {
    const spyFunc = vi.spyOn(handler, "httpErrorHandler");

    mockReply(500);
    await sendRequest();
    expect(spyFunc).toBeCalled();
  });
});
