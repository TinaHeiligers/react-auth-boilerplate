import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import { Provider } from 'react-redux';
import enUS from 'antd/lib/locale-provider/en_US';
import moment from 'moment-timezone';
import registerServiceWorker from './registerServiceWorker';
import { store, history } from  './redux/store';
import PublicRoutes from './router';
import './index.css';

moment.tz.setDefault("America/Phoenix");

ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <Provider store={ store }>
      <PublicRoutes history={ history } />
    </Provider>
  </LocaleProvider>, 
  document.getElementById('root'));
registerServiceWorker();

export default DashApp;