import './App.css';
import { Outlet } from 'react-router-dom';
import Approutes from './Approutes';
// import { useState } from 'react';
// import AxiosFetch from './Components/AxiosFetch/AxiosFetch';
// import ReUseCounter from './Components/ReUseCounter/ReUseCounter';
// import ToDoList from './Components/ToDoList/ToDoList';
// import SignIn from './Components/SignIn/SignIn';

function App() {

  // const [isModalOpen, setModalOpen] = useState(false)



  return (

    <>
      <Outlet />
      <Approutes />
      {/* <AxiosFetch/>
      <ReUseCounter/>
      <ToDoList/> */}

    </>

  );
}

export default App;
