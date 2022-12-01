import React from 'react'
// import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import ReactDOM from 'react-dom'; // react ~17
import reportWebVitals from './reportWebVitals';

// redux
import { Provider } from 'react-redux';
import store, {persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <React.StrictMode >
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();