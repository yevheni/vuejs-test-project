import Vue from "vue";
import Vuex from "vuex";
import {IWorker} from "./interfaces/worker";

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		workers: [] as IWorker[],
	},

	mutations: {
		new_worker(state, worker) {
			state.workers.push(worker);
		},

		workers(state, workers = []) {
			state.workers.splice(0, state.workers.length, ...workers);
		},

		delete_worker(state, id) {
			const index = state.workers.findIndex(worker => worker._id === id);

			if (index !== -1) {
				state.workers.splice(index, 1);
			}
		},

		update_worker(state, payload) {
			const [id, worker] = payload;
			const index = state.workers.findIndex(worker => worker._id === id);

			if (index !== -1) {
				state.workers.splice(index, 1, worker);
			}
		},
	},
});
