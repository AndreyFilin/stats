export let onUnauthorizedCallback: (() => void) | null = null;

export const registerUnauthorizedCallback = (callback: () => void) => {
	onUnauthorizedCallback = callback;
};

// Функция, которая будет вызывать колбэк, когда нужно
export const triggerUnauthorized = () => {
	if (typeof onUnauthorizedCallback === 'function') {
		onUnauthorizedCallback();
	}
};