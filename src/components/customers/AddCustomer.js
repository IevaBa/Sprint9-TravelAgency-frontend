import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddCustomer(props) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hotel_id, setHotel] = useState("");
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({});

  // Fetch hotels
  useEffect(() => {
    fetch("http://localhost:8000/api/hotels")
      .then((res) => res.json())
      .then((result) => {
        //  console.log(result);
        setHotels(result);
      });
  }, []);

  const addCustomer = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("hotel_id", hotel_id);

    await axios
      .post(`http://localhost:8000/api/customers`, formData)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/customers");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        } else {
          Swal.fire({
            text: response.data.message,
            icon: "error",
          });
        }
      });
  };

  return (
    <div>
      <h1 className="my-4 text-center">Add Customer</h1>
      <div className="col-sm-6 offset-sm-3">
        {Object.keys(validationError).length > 0 && (
          <div className="mb-0 alert alert-danger">
            {Object.entries(validationError).map(([key, value]) => (
              <div key={key}>{value}</div>
            ))}
          </div>
        )}
        <form onSubmit={addCustomer}>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className="form-control my-3"
          />
          <input
            type="text"
            placeholder="Surname"
            onChange={(e) => setSurname(e.target.value)}
            className="form-control my-3"
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control my-3"
          />
          <input
            type="tel"
            placeholder="Phone number"
            onChange={(e) => setPhone(e.target.value)}
            className="form-control my-3"
          />
          <select
            className="form-select my-3"
            onChange={(e) => setHotel(e.target.value)}
          >
            <option defaultValue disabled>
              Choose hotel
            </option>
            {hotels.map((hotel, index) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.title}
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn-success">
            Add Customer
          </button>
          <button
            className="btn btn-secondary mx-2"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCustomer;
