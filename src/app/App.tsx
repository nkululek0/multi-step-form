import './App.css';

import { GlobalProvider } from './provider';

import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { SideBar } from '../components/side-bar/Side-Bar';

function App() {

  return (
    <>
      <div className="app-component-wrapper">
        <SideBar/>
        <GlobalProvider>
          <div className="content-wrapper">
            <RouterProvider router={router} />
          </div>
        </GlobalProvider>
      </div>
    </>
  )
};

export default App;
