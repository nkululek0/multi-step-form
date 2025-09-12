import './App.css';

import { GlobalContext, globalState } from './provider';

import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { SideBar } from '../components/side-bar/Side-Bar';

function App() {

  return (
    <>
      <SideBar/>
      <GlobalContext.Provider value={ globalState }>
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </>
  )
};

export default App;
