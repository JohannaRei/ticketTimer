import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';

import fi from './fi.json';
import en from './en.json';

i18n.locale = RNLanguages.language;
i18n.fallbacks = true;
i18n.translations = { fi, en };

export default i18n;
