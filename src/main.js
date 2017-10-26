import 'babel-polyfill';
import Vue from 'vue';
import routes from './views/routes';
import App from './views/app.vue';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import 'css/app.scss';
import store from './store/index';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import 'components';

// 注册vue组件
Vue.use(Mint);
Vue.use(VueAxios, axios);
Vue.use(VueRouter);

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});

// eslint-disable-next-line no-new
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
