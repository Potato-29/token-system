import "./App.css";
import Navbar from "./components/Navbar/Navbar";

// NOT BEING USED ANYWHERE
function App({ children }) {
  return (
    <div className="h-screen">
      <Navbar />
      {children}
    </div>
  );
}

export default App;
