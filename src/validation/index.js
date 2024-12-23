import AsyncValidator from "async-validator";
import { isRef, unref } from "vue";
import { log } from "@/tools";

/**
 * @description: 验证数据
 * @param dataSource {Object | Ref<Object>} 需要验证的数据源
 * @param rules {Object} 验证规则
 * @returns {Promise} 验证结果,失败时传递错误信息
 */
export const validate = async (dataSource, rules) => {
  if (!dataSource || !rules) {
    return Promise.reject(new Error("数据源或验证规则不能为空"));
  }

  const source = isRef(dataSource) ? unref(dataSource) : dataSource;
  const validator = new AsyncValidator(rules);

  return new Promise((resolve, reject) => {
    validator.validate(source, (errors) => {
      if (!errors) {
        return resolve();
      }
      log("[validate]数据验证失败", errors);
      reject(errors);
    });
  });
};

export * from "./rules/login";
