import config from '../config/vcm-config.json';

const cookiePreferencesJSON = window.localStorage.getItem('cm_consent');
const cookiePreferences = JSON.parse(cookiePreferencesJSON ?? '{}');
const services = updateServices((config.services));

export default {
    namespaced: true,
    state: {
        categories: config.categories,
        services: services,
        privacyPolicy: config.privacyPolicy,
        imprint: config.imprint,

        showCookieManager: !cookiePreferencesJSON,
        viewId: 0,
    },
    getters: {
        getServicesByCategoryId: (state) => (id) => {
            return state.services.filter(service => service.category === id);
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