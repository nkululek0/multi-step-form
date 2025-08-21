import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { SideBar } from '../components/side-bar/Side-Bar';

function App() {

  return (
    <>
      <SideBar/>
      <RouterProvider router={router} />
    </>
  )
};

export default App;
