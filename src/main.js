import {createApp} from 'vue';
import store from './store';
import CookieManager from "./CookieManager";
import install from '../index';

createApp(CookieManager)
    .use(store)
    .use(install)
    .mount('#cookie-manager');