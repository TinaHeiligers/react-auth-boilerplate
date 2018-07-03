import React from 'react';
import ReactDOM from 'react-dom';
import MainApp from './App';

xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
