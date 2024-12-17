import { reactive } from "vue";

/**
 * 生成一个可重置的 reactive 对象
 * @param {object} originObj - 一个普通对象
 * @returns {object} 一个 reactive 对象,拥有一个 $reset 方法,用于重置 reactive 对象到初始状态
 */
export function useResettableReactive(originObj) {
	const origin = () => structuredClone(originObj);
	const target = reactive(origin());

	const reset = () => Object.assign(target, origin());
	target.$reset = reset;

	return target;
}
