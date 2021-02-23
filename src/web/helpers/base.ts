import Vue from "vue";
import axios from "axios";
import toastr from "toastr";

toastr.options.closeButton = true;
toastr.options.extendedTimeOut = 20000;
toastr.options.timeOut = 10000;
toastr.options.progressBar = true;

interface IError extends Error {
	response?: {
		data?: any
	}
}

export const Base = Vue.extend({
	computed: {
		api: () => {
			return axios.create({
				baseURL: process.env.mode === "production" ? "/api" : "http://localhost:9090/api",
			});
		}
	},
	methods: {
		errorHandle(err: IError) {
			console.error(err);

			const message = err.response?.data?.message || err.message;

			toastr.error(message);
		}
	},
});
