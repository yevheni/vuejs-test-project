import Vue from "vue";

interface IError extends Error {
	response?: {
		data?: any
	}
}

export const Base = Vue.extend({
	methods: {
		errorHandle(err: IError) {
			console.error(err);

			const message = err.response?.data?.message || err.message;
			alert(message);
		}
	}
});
