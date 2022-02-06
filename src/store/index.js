import config from '../assets/consentmanager.json';

const consentPreferencesJSON = window.localStorage.getItem('cm_consent');
const consentPreferences = JSON.parse(consentPreferencesJSON ?? '{}');
const services = updateServices((config.services));

export default {
    state: {
        categories: config.categories,
        services: services,
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
        setConfig(state, config) {
            state.categories = config.categories;
            state.services = updateServices(config.services);
            state.privacyPolicy = config.privacyPolicy;
            state.imprint = config.imprint;
        },
        setViewId(state, viewId) {
            state.viewId = viewId;
        },
        setShowConsentManager(state, showConsentManager) {
            state.showConsentManager = showConsentManager;
        },
    },
    actions: {},
}

function updateServices(services) {
    return services.map(service => {
        if (consentPreferences && consentPreferences.services) {
            service.active = consentPreferences.services[service.name];
        }

        return service;
    });
}