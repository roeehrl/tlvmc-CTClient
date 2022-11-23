import store from './store/index';

export default function (key, defaultValue = null) {
	const bucket = process.env || {};
	key = (key || '').toUpperCase();
	let value = bucket[`VUE_APP_${key}`];

	if(store.getters.world.route) {
		let override = (store.getters.world.meta || {}).overrideSettings || {};

		if(typeof override[key] !== 'undefined') {
			return override[key];
		}
	}

	switch (value) {
		case "true":
			value = true;
			break;
		case "false":
			value = false;
	}

	return value === undefined ? defaultValue : value;
}