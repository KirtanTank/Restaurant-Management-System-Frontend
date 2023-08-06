import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/Register';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="bg-amber-500 h-screen">
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Register' element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
