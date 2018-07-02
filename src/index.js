import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import moment from 'moment-timezone';
import registerServiceWorker from './registerServiceWorker';
import { store, history } from  './redux/store';
import MainApp from './App';
import './index.css';

moment.tz.setDefault("America/Phoenix");

ReactDOM.render(
    <Provider store={ store }>
      <MainApp />
    </Provider>,
  document.getElementById('root'));
registerServiceWorker();

