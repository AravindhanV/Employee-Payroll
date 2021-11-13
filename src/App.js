import './App.css';
import PayrollForm from './components/payroll-form/payroll-form';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PayrollForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
