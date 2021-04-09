import {
	createStore
}                               from 'redux';

import { 
	persistStore,
	persistCombineReducers 
}                               from 'redux-persist';

import storage 					from 'redux-persist/lib/storage'

import plugin					from './plugin/reducer';

const reducers = persistCombineReducers({
	key: 'intouch_plugin_name',
	storage: storage
}, {
	plugin,
});

export default function configureStore() {

	const store = createStore(reducers);
	const persistor = persistStore(store);

	return { store, persistor };
}
