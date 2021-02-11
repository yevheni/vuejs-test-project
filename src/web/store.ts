import Vue from "vue";
import Vuex from "vuex";
import {IWorker} from "./interfaces/worker";

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		workers: [] as IWorker[],
	},

	mutations: {
		new_worker(state, payload) {
			state.workers.push(payload);
		},

		workers(state, payload) {
			state.workers.splice(0, state.workers.length, ...payload);
		}
	},
});
