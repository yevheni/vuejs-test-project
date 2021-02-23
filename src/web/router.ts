import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";
import {Calendar} from "./app/calendar/calendar";
import {Workers} from "./app/workers/workers";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
	{
		path: "/",
		component: Calendar,
	},
	{
		path: "/workers",
		component: Workers,
	},
];

export const router = new VueRouter({
	mode: "history",
	routes: routes,
});
