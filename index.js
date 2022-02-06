import CookieManager from "./src/CookieManager";
import i18n from './src/i18n'
import {createStore} from "vuex";
import store from "./src/store";

const install = app => {
    const vi18n = app.__VUE_I18N__;
    const vstore = app._context?.provides?.store;

    if (!vi18n) {
        app.use(i18n);
    } else {
        for (const locale of i18n.global.availableLocales) {
            vi18n.global.messages[locale] = {
                ...(vi18n.global.messages[locale] ?? {}),
                ...i18n.global.messages,
            };
        }
    }

    if (!vstore) {
        app.use(createStore({
            modules: {
                vcm: store,
            },
        }));
    } else {
        if(!vstore.hasModule('vcm')) {
            vstore.registerModule('vcm', store);
        }
    }

    app.component(CookieManager.name, CookieManager);
};

export default {
    install,
}

const inBrowser = typeof window !== "undefined";
if (inBrowser && window.Vue) {
    window.Vue.use({ install });
}