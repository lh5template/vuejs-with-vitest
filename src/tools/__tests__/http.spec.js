import AxiosMockAdapter from "axios-mock-adapter";
import { TOKEN_HEADER_KEY, http } from "@/tools/http";
import { saveToken } from "@/tools/token";
import { beforeEach, describe, it, vi, expect } from "vitest";
import * as handler from "@/tools/httpErrorHandler";

// 专门用于单元测试的 axios adapater
const mockHttp = new AxiosMockAdapter(http);

// 发送请求
const sendRequest = () => http.get("/mock-request");

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

  it(`当有 token 的时候, 应该添加 ${TOKEN_HEADER_KEY} 字段到 header 中`, async () => {
    const token = "token-string";
    saveToken(token);

    mockReply(200);
    await sendRequest();

    expect(mockHttp.history.get[0].headers[TOKEN_HEADER_KEY]).toBe(token);
  });

  it(`当 status 为 200 的时候,应该直接返回响应体`, async() => {
    const body = {
      msg: 'response body'
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
