export * from "./rules/login";

/**
 * @description: 验证数据
 * @param dataSource {Object | Ref<Object>} 需要验证的数据源
 * @param rules {Object} 验证规则
 * @returns {Promise} 验证结果,失败时传递错误信息
 */
export const validate = async (dataSource, rules) => {
  const { promise, resolve, reject } = Promise.withResolvers();
  if (!dataSource || !rules) {
    reject("数据源或验证规则不能为空");
    return promise;
  }

  const results = await rules.safeParseAsync(dataSource);
  if (results.success) {
    resolve(results.data);
  } else {
    const errors = results.error.format();
    reject(errors);
  }
  return promise;
};
