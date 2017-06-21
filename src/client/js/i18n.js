import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(XHR)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'en',
        ns: ['common'],
        defaultNS: 'common',
        debug: true,

        interpolation: {
            escapeValue: false, // reat handles escaping input
            formatSeparator: ',',
            format: function (value, format, lng) {
                if (format === 'uppercase') {
                    return value.toUpperCase();
                }

                return value;
            }
        }     
    });

    export default i18n;