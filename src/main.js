import { createApp } from 'vue';
import ConsentManager from './ConsentManager.vue';
import store from './store';

createApp(ConsentManager).use(store).mount('#consentmanager');
