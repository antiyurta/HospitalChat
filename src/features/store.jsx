import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from "redux-thunk";
import authReducer from './authReducer';

const reducers = combineReducers({
    authReducer
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducers = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducers,
    devTools: true,
    middleware: [thunk]
})

const Persistor = persistStore(store);

export { Persistor };
export default store;