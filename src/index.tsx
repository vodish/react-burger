import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
// import reportWebVitals from './reportWebVitals';
import { Provider as Redux } from 'react-redux'
import store from './services/redux';
import { DndProvider as Dnd } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


ReactDOM
  .createRoot( document.getElementById('root') as HTMLElement )
  .render(
  <StrictMode>
    <Redux store={store}>
      <Dnd backend={HTML5Backend}>
          <App />
      </Dnd>
    </Redux>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
