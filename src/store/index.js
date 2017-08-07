import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/home';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        app
    },
    strict: __DEV__,
    plugins: __DEV__ ? [createLogger()] : []
});
