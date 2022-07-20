import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";

function Countries(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [countries, setCountries] = useState([]);

  const navigate = useNavigate();

  // LIST COUNTRIES
  useEffect(() => {
    fetch("http://localhost:8000/api/countries")
      .then((res) => res.json())
      .then(
        (result) => {
          //console.log(result);
          setCountries(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, []);

  // DELETE
  const fetchCountries = async () => {
    await axios.get(`http://localhost:8000/api/countries`).then(({ data }) => {
      setCountries(data);
    });
  };
  const deleteCountry = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    await axios
      .delete(`http://localhost:8000/api/countries/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        fetchCountries();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: "You can not delete the country if hotel has already been assigned",
          icon: "error",
        });
      });
  };

  if (!isLoaded) {
    return <div className="text-center fs-4 m-4">Loading...</div>;
  } else if (error) {
    return (
      <div className="text-center fs-4 m-4 text-danger">
        Error: {error.message}
      </div>
    );
  } else {
    return (
      <div>
        <div className="container d-flex flex-column align-items-center justify-content-center shadow px-3 py-3 bg-body rounded my-5">
          <table className="table table-bordered table-striped mt-2 align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>Season</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country) => (
                <tr key={country.id}>
                  <td>{country.title}</td>
                  <td>{country.season}</td>
                  <td>
                    <div className="text-center">
                      <Link to={"/countries/edit/" + country.id}>
                        <button className="btn btn-primary">Update</button>
                      </Link>
                      <button
                        className="btn btn-danger ms-3"
                        onClick={() => deleteCountry(country.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <div>
              <button
                className="btn btn-success"
                onClick={() => navigate("/countries/add")}
              >
                Add Country
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Countries;
