import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import PrivateRoute from "./privateRoute/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/updateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import Footer from "./components/Footer";
import AdminRoute from "./privateRoute/AdminRoute";
import NotFound from "./pages/NotFound";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/listing/:id" element={<Listing />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route element={<AdminRoute />}>
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/update-listing/:id" element={<UpdateListing />} />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
