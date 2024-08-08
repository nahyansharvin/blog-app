import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast'
import Loader from '@/components/ui/loader'
import { RecoilRoot } from 'recoil'
import App from './App'
import RecoilNexus from 'recoil-nexus'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <RecoilNexus />
      <Toaster />
      <Loader />
      <App />
    </RecoilRoot>
  </React.StrictMode>,
)