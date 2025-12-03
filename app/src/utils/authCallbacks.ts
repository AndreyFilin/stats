export let onUnauthorizedCallback: (() => void) | null = null;

export const registerUnauthorizedCallback = (callback: () => void) => {
	onUnauthorizedCallback = callback;
};

export const triggerUnauthorized = () => {
	if (typeof onUnauthorizedCallback === 'function') {
		onUnauthorizedCallback();
	}
};