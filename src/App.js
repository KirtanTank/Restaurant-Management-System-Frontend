import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/Register';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Register' element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
