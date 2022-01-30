import { createStore } from 'vuex'

import config from '../assets/consentmanager.json';

export default createStore({
    state: {
        language: config.language,
        categories: config.categories,
        services: config.services,
        privacyPolicy: config.privaryPolicy,
        imprint: config.imprint,

        viewId: 0,
    },
    getters: {
        getServicesByCategoryId: (state) => (id) => {
            return state.services.filter(service => service.category === id);
        }
    },
    mutations: {
        setLanguage(state, language) {
            state.language = language;
        },
        setViewId(state, viewId) {
            state.viewId = viewId;
        }
    },
    actions: {
    },
    modules: {
    }
});