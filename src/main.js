import 'babel-polyfill';
import Vue from 'vue';
import routes from './views/routes';
import App from './views/app.vue';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import 'css/app.scss';
import store from './store/index';
import VueRouter from 'vue-router';
import 'components';
import 'font-awesome/css/font-awesome.css';

var VConsole = require('vconsole/dist/vconsole.min.js');
var vConsole = new VConsole();
vConsole.show();
console.log('Hello world');

// 注册vue组件
Vue.use(Mint);
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
