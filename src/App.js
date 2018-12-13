import React, { Component } from 'react';
import RNLanguages from 'react-native-languages';
import i18n from './locales';
import Root from './Root';

export default class App extends Component {
  componentWillMount() {
    RNLanguages.addEventListener('change', this._onLanguageChage);
  }

  componentWillUnmount() {
    RNLanguages.removeEventListener('change', this._onLanguageChage);
  }

  _onLanguageChage = ({ language }) => {
    i18n.locale = language;
  };

  render() {
    return <Root />;
  }
}
