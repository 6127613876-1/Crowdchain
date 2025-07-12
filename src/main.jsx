import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import { Sepolia } from "@thirdweb-dev/chains";

import { StateContextProvider } from './context';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const ActiveChainId = ChainId.Sepolia;

root.render(
  <ThirdwebProvider activeChain={Sepolia} clientId="8022e6ab63f8d1b23ad3be822eedf887">
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>   
    </Router>
  </ThirdwebProvider>
);
