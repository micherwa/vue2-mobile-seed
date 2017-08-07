import 'babel-polyfill';
import Vue from 'vue';
import routes from './views/routes';
import App from './views/app.vue';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import 'css/app.scss';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

// 注册vue组件
Vue.use(Mint);
Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});

// eslint-disable-next-line no-new
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
