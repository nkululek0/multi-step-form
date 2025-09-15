import './App.css';

import { GlobalProvider } from './provider';

import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { SideBar } from '../components/side-bar/Side-Bar';

function App() {

  return (
    <>
      <SideBar/>
      <GlobalProvider>
        <RouterProvider router={router} />
      </GlobalProvider>
    </>
  )
};

export default App;
