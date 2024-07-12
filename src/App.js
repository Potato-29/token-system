import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

// NOT BEING USED ANYWHERE
function App({ children }) {
  return (
    <div className="h-screen">
      <ToastContainer />
      {/* <Navbar /> */}
      {children}
    </div>
  );
}

export default App;
