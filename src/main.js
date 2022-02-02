import { createApp } from 'vue';
import ConsentManager from './ConsentManager.vue';
import store from './store';
import i18n from './i18n'

createApp(ConsentManager)
    .use(store)
    .use(i18n)
    .mount('#consentmanager');
