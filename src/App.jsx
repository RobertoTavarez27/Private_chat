import logo from './logo.svg';
import './App.css';
import {Formulario} from './Components/Formulario';
import {Formulario2} from './Components/Formulario2';
import Home from './Components/Home';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const {currentUser} = useContext(AuthContext);
  const ProtectedRoute = ({children}) =>{
if(!currentUser){
  return <Navigate to ="/Formulario2"/>;
}
return children
  };
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/">
        <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="Formulario" element={<Formulario/>}/>
        <Route path="Formulario2" element={<Formulario2/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
