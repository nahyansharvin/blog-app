import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { RecoilRoot } from 'recoil'
import App from './App'
import RecoilNexus from 'recoil-nexus'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <RecoilNexus />
      <Toaster />
      <App />
    </RecoilRoot>
  </React.StrictMode>,
)