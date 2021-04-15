import React from 'react';
import ReactDOM from 'react-dom';
import app, {App} from './modules/app';
import {BrowserRouter as Router} from 'react-router-dom';
import {IntlProvider} from 'react-intl';

import 'bootstrap/dist/css/bootstrap.min.css';
import { initReactIntl } from './i18n';
import backend, { NetworkError } from './backend';
import configureStore from './store';

const store = configureStore();

//backend proxy
backend.init(error => store.dispatch(app.actions.error(new NetworkError())));

// i18n
const {locale, messages} = initReactIntl();

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={messages}>
      <Router>
        <App />
      </Router>
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);