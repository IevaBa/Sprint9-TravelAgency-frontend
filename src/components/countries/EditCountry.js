import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditCountry() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState({});
  const [season, setSeason] = useState({});
  const [validationError, setValidationError] = useState({});
  const [token, _] = useState(localStorage.getItem("token"));

  useEffect(() => {
    fetchCountry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCountry = async () => {
    await axios
      .get(`http://localhost:8000/api/countries/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        const { title, season } = data;
        setTitle(title);
        setSeason(season);
      });
  };

  const updateCountry = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("title", title);
    formData.append("season", season);

    await axios
      .post(`http://localhost:8000/api/countries/${id}`, formData, {
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
        navigate("/countries");
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
      <h1 className="my-4 text-center">Edit Country</h1>
      <div className="col-sm-6 offset-sm-3">
        <form className="form-control p-5 pt-4 shadow" onSubmit={updateCountry}>
          {Object.keys(validationError).length > 0 && (
            <div className="mb-0 alert alert-danger">
              {Object.entries(validationError).map(([key, value]) => (
                <div key={key}>{value}</div>
              ))}
            </div>
          )}
          <div className="mt-3">
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
          <div className="">
            <label className="" htmlFor="title">
              Edit season:
            </label>
            <input
              type="text"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="form-control my-2"
            />
          </div>
          <div className="mt-3">
            <button type="submit" className="btn btn-warning">
              Update Country
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
