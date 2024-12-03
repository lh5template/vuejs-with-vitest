import { reactive } from "vue";

// 可以重置的 reactive
export function useResettableReactive(originObj) {
	const origin = () => structuredClone(originObj);
	const target = reactive(origin());

	const reset = () => Object.assign(target, origin());
	target.$reset = reset;

	return target;
}
