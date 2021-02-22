import "./picker.scss";
import template from "./picker.html";
import {Base} from "../../../helpers/base";

export const Picker = Base.extend({
	template: template,

	props: {
		text: {
			type: String,
		}
	},
});
