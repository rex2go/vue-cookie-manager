import config from '../config/vcm-config.json';

const cookiePreferencesJSON = window.localStorage.getItem('cm_consent');
const cookiePreferences = JSON.parse(cookiePreferencesJSON ?? '{}');
const services = updateServices((config.services));

import localeDE from '../locales/de.json';
import localeEN from '../locales/en.json';


export default {
    namespaced: true,
    state: {
        categories: config.categories,
        services: services,
        privacyPolicy: config.privacyPolicy,
        imprint: config.imprint,

        showCookieManager: !cookiePreferencesJSON,
        viewId: 0,

        locale: 'en',

        messages: {
            de: localeDE,
            en: localeEN,
        },
    },
    getters: {
        getServicesByCategoryId: (state) => (id) => {
            return state.services.filter(service => service.category === id);
        },
        translate: (state) => (key) => {
            let translation = state.messages[state.locale] ?? key;

            for(const part of key.split('.')) {
                translation = translation[part];
            }

            if(!translation && state.locale !== 'en') {
                return this.translate(key);
            }

            return translation ?? key;
        }
    },
    mutations: {
        setConfig(state, config) {
            state.categories = config.categories;
            state.services = updateServices(config.services);
            state.privacyPolicy = config.privacyPolicy;
            state.imprint = config.imprint;
        },
        setViewId(state, viewId) {
            state.viewId = viewId;
        },
        setShowCookieManager(state, showCookieManager) {
            state.showCookieManager = showCookieManager;
        },
        setLocale(state, locale) {
            state.locale = locale;
        },
        setMessages(state, messages) {
            state.messages = messages;
        },
    },
    actions: {},
}

function updateServices(services) {
    return services.map(service => {
        if (cookiePreferences && cookiePreferences.services) {
            service.active = cookiePreferences.services[service.name];
        }

        return service;
    });
}