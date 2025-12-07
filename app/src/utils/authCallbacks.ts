export let onUnauthorizedCallback: (() => void) | null = null;

export const registerUnauthorizedCallback = (callback: () => void) => {
	onUnauthorizedCallback = callback;
};

export const triggerUnauthorizedCallback = () => {
	onUnauthorizedCallback?.();
};