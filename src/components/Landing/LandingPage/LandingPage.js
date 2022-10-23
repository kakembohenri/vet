import { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import About from "../About/About";
import Features from "../Features/Features";
import Contact from "../Contact/Contact";
import Vets from "../Vets/Vets"
import { useSelector, useDispatch } from "react-redux";
import { fetchvets } from "../../../actions/auth";

const LandingPage = () => {
  const dispatch = useDispatch();
  const {vets} = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(fetchvets())
  }, [dispatch])
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Vets vets={vets} />
      <Features />
      <Contact />
    </>
  );
};

export default LandingPage;
