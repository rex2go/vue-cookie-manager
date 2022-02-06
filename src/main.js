import {createApp} from 'vue';
import i18n from './i18n';
import store from './store';
import CookieManager from "@/CookieManager";
import install from '../index';

createApp(CookieManager)
    .use(store)
    .use(i18n)
    .use(install)
    .mount('#cookie-manager');