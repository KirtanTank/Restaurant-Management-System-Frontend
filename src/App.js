import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/Register';
import Navbar from './components/Navbar';
import Error from './components/Error';

function App() {
  return (
    <>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Register' element={<Register />}></Route>
        <Route path='*' element={<Error />}></Route>

      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
