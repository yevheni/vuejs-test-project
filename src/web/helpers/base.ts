import Vue from "vue";
import axios from "axios";

interface IError extends Error {
	response?: {
		data?: any
	}
}

export const Base = Vue.extend({
	computed: {
		api: () => {
			return axios.create({
				baseURL: "http://localhost:9090/api",
			});
		}
	},
	methods: {
		errorHandle(err: IError) {
			console.error(err);

			const message = err.response?.data?.message || err.message;
			alert(message);
		}
	},
});
