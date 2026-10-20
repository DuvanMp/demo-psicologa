import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import { site } from './config.js'

const root = document.documentElement.style
root.setProperty('--ink', site.theme.ink)
root.setProperty('--accent', site.theme.accent)
root.setProperty('--soft', site.theme.soft)

createRoot(document.getElementById('root')).render(<App />)
