import Header from "./components/header/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Countries from "./components/countries/Countries";
import AddCountry from "./components/countries/AddCountry";
import AddHotel from "./components/hotels/AddHotel";
import Hotels from "./components/hotels/Hotels";
import Customers from "./components/customers/Customers";
import AddCustomer from "./components/customers/AddCustomer";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Hotels />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/add" element={<AddCountry />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/add" element={<AddHotel />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/add" element={<AddCustomer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
