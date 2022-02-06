import localeDE from './locales/de.json';
import localeEN from './locales/en.json';

export const tData = {
    locale: 'en',

    messages: {
        de: localeDE,
        en: localeEN,
    },
};

export function translate (key) {
    let translation = tData.messages[tData.locale] ?? key;

    for(const part of key.split('.')) {
        translation = translation[part];
    }

    return translation ?? key;
}

