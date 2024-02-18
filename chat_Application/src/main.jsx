import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import HomePage from './All_Pages/HomePage.jsx'
import configureStore from './redux/store.js';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={configureStore}>
  <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
      // <HomePage/>  
      // </React.StrictMode>, 
)
