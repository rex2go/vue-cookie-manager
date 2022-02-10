import CookieManager from "./src/CookieManager";
import {createStore} from "vuex";
import store from "./src/store";

const install = app => {
    const vstore = app._context?.provides?.store;

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