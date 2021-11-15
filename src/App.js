import './App.css';
import PayrollForm from './components/payroll-form/payroll-form';
import Home from './components/home/home'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/payroll-form" element={<PayrollForm />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/payroll-form/:id" element={<PayrollForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
