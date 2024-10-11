import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import About from './pages/About';
import Header from './components/Header';
const App = () => {
  return <div >
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={ <Home/>} />
        <Route path="/signin" element={ <Signin/>} />
        <Route path="/signup" element={ <Signup/>} />
        <Route path="/about" element={ <About/>} />
      </Routes>
    </BrowserRouter>
  </div>;  
};

export default App;
