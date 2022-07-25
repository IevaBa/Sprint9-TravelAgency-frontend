import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditHotel() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState({});
  const [price, setPrice] = useState({});
  const [days, setDays] = useState({});
  const [country_id, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [image, setImage] = useState(null);
  const [validationError, setValidationError] = useState({});
  const [token, _] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) return navigate("/login");
    fetchHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch countries
  useEffect(() => {
    fetch("https://travelagency-laravel.herokuapp.com/api/countries", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //  console.log(result);
        setCountries(result);
      });
  }, []);

  const fetchHotels = async () => {
    await axios
      .get(`https://travelagency-laravel.herokuapp.com/api/hotels/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        const { title, price, days, country_id } = data;
        setTitle(title);
        setPrice(price);
        setDays(days);
        setCountry(country_id);
      });
  };

  const changeHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const updateHotel = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("title", title);
    formData.append("price", price);
    formData.append("days", days);
    formData.append("country_id", country_id);
    if (image !== null) {
      formData.append("image", image);
    }

    await axios
      .post(
        `https://travelagency-laravel.herokuapp.com/api/hotels/${id}`,
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/hotels");
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
      <h1 className="my-4 text-center">Edit Hotel</h1>
      <div className="col-sm-6 offset-sm-3">
        <form className="form-control px-5 py-4 shadow" onSubmit={updateHotel}>
          {Object.keys(validationError).length > 0 && (
            <div className="mb-0 alert alert-danger">
              {Object.entries(validationError).map(([key, value]) => (
                <div key={key}>{value}</div>
              ))}
            </div>
          )}
          <div className="mt-2">
            <label className="" htmlFor="title">
              Edit title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control my-2"
            />
          </div>
          <div className="mt-2">
            <label className="" htmlFor="price">
              Edit price:
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-control my-2"
            />
          </div>
          <div className="mt-2">
            <label className="" htmlFor="price">
              Edit image:
            </label>
            <input
              type="file"
              onChange={changeHandler}
              className="form-control my-2"
            />
          </div>
          <div className="mt-2">
            <label className="" htmlFor="price">
              Edit days of stay:
            </label>
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="form-control my-2"
            />
          </div>
          <div className="mt-2">
            <label className="" htmlFor="price">
              Edit country:
            </label>
            <select
              className="form-select my-2"
              value={country_id}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countries.map((country, index) => (
                <option key={country.id} value={country.id}>
                  {country.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-3">
            <button type="submit" className="btn btn-warning">
              Update Hotel
            </button>
            <button
              className="btn btn-secondary mx-3"
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
