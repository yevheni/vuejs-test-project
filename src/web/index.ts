import "./index.scss";
import Vue from 'vue'
import {App} from "./app/app";

const app = new Vue({
	el: '#root',
	components: {
		App: App,
	}
});
