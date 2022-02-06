import ConsentManager from "@/ConsentManager";
import i18n from './i18n'
import {createStore} from "vuex";
import store from "@/store";

const install = (app, options) => {
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
                pcm: store,
            },
        }));
    } else {
        vstore.registerModule('pcm', store);
    }

    app.component(ConsentManager.name, ConsentManager);
};

export default {
    install,
};