import {createI18n} from 'vue-i18n';

import localeDE from './locales/de.json';
import localeEN from './locales/en.json';

export default createI18n({
    locale: 'en',
    silentTranslationWarn: true,
    messages: {
        de: localeDE,
        en: localeEN,
    },
});