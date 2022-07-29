import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditCustomer() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState({});
  const [surname, setSurname] = useState({});
  const [email, setEmail] = useState({});
  const [phone, setPhone] = useState({});
  const [hotel_id, setHotel] = useState("");
  const [hotels, setHotels] = useState([]);
  const [validationError, setValidationError] = useState({});
  const [token, _] = useState(localStorage.getItem("token"));

  useEffect(() => {
    fetchCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch hotels
  useEffect(() => {
    fetch("/api/hotels", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //  console.log(result);
        setHotels(result);
      });
  }, []);

  const fetchCustomer = async () => {
    await axios
      .get(`/api/customers/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        const { name, surname, email, phone, hotel_id } = data;
        setName(name);
        setSurname(surname);
        setEmail(email);
        setPhone(phone);
        setHotel(hotel_id);
      });
  };

  const updateCustomer = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("hotel_id", hotel_id);

    await axios
      .post(`/api/customers/${id}`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
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
            text: response.data.error,
            icon: "error",
          });
        }
      });
  };

  return (
    <div>
      <h1 className="my-4 text-center">Edit Customer</h1>
      <div className="col-sm-6 offset-sm-3">
        <form
          className="form-control px-5 py-4 shadow"
          onSubmit={updateCustomer}
        >
          {Object.keys(validationError).length > 0 && (
            <div className="mb-0 alert alert-danger">
              {Object.entries(validationError).map(([key, value]) => (
                <div key={key}>{value}</div>
              ))}
            </div>
          )}
          <div className="mt-2">
            <label className="" htmlFor="name">
              Edit name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control my-2"
            />
          </div>
          <div className="mt-2">
            <label className="" htmlFor="surname">
              Edit surname:
            </label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="form-control my-2"
            />
          </div>
          <div className="mt-2">
            <label className="" htmlFor="email">
              Edit email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control my-2"
            />
          </div>
          <div className="mt-2">
            <label className="" htmlFor="phone">
              Edit phone number:
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control my-2"
            />
          </div>
          <div className="mt-2">
            <label className="" htmlFor="hotel">
              Edit hotel:
            </label>
            <select
              className="form-select my-2"
              value={hotel_id}
              onChange={(e) => setHotel(e.target.value)}
            >
              {hotels.map((hotel, index) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2">
            <button type="submit" className="btn btn-warning">
              Update Customer
            </button>
            <button
              className="btn btn-secondary mx-2"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
