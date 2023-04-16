import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from "@material-tailwind/react";
const DOMAIN = import.meta.env.VITE_DOMAIN;
const CLIENTID = import.meta.env.VITE_CLIENTID;
const IDENTIFIER = import.meta.env.VITE_IDENTIFIER;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
    domain={DOMAIN}
    clientId={CLIENTID}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: IDENTIFIER,
      scope: "delete:post"
    }}
    >
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>,
)
