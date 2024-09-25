import { StrictMode } from 'react'
import App from './App.jsx'
import './index.css'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './redux/store.js'

const rootElement = document.getElementById('root')
const root= ReactDOM.createRoot(rootElement)

root.render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>
)
