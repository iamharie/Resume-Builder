import "./App.css";
import ResumeForm from "./components/ResumeForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ResumeForm />} />
      </Routes>
    </Router>
  );
}

export default App;
