import { createStore } from 'vuex'

import config from '../assets/consentmanager.json';

const consentPreferencesJSON = window.localStorage.getItem('cm_consent');
const consentPreferences = JSON.parse(consentPreferencesJSON ?? '{}');
const services = config.services.map(service => {
    if(consentPreferences && consentPreferences.services) {
        service.active = consentPreferences.services[service.name];
    }

    return service;
});

export default createStore({
    state: {
        language: config.language,
        categories: config.categories,
        services,
        privacyPolicy: config.privaryPolicy,
        imprint: config.imprint,

        showConsentManager: !consentPreferencesJSON,
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
        },
        setShowConsentManager(state, showConsentManager) {
            state.showConsentManager = showConsentManager;
        },
    },
    actions: {
    },
    modules: {
    }
});