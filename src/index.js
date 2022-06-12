import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // importing the router component so that we can wrap our App component in it, giving our app access to routing features
import ProviderLayer from './ProviderLayer';
import { FirebaseAppProvider } from 'reactfire';

const firebaseConfig = {
  apiKey: "AIzaSyDn0dPUatpaN7Plj-Ux6CvYS1Pk_bhrhPo",
  authDomain: "bird-barter-react.firebaseapp.com",
  databaseURL: "https://bird-barter-react-default-rtdb.firebaseio.com",
  projectId: "bird-barter-react",
  storageBucket: "bird-barter-react.appspot.com",
  messagingSenderId: "214068119593",
  appId: "1:214068119593:web:d5f954a4704136c4b5b438",
  // measurementId: "G-JT5C58JY9N" not used in Sam's but in original documentation
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <BrowserRouter>
        <ProviderLayer/>
      </BrowserRouter>
    </FirebaseAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
