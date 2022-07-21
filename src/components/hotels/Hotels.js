import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Hotels(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [token, _] = useState(localStorage.getItem("token"));

  const navigate = useNavigate();

  // LIST HOTELS
  useEffect(() => {
    if (!token) return navigate("/login");
    let h = { Accept: "application/json", Authorization: `Bearer ${token}` };
    fetch("http://localhost:8000/api/hotels", { headers: h })
      .then((res) => {
        if (!res.ok) {
          // 401
          setError(res);
          setIsLoaded(true);
        } else {
          return res.json();
        }
      })
      .then(
        (result) => {
          //  console.log(result);
          setHotels(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, []);

  // DELETE
  const fetchHotels = async () => {
    let h = { Accept: "application/json", Authorization: `Bearer ${token}` };
    await axios
      .get(`http://localhost:8000/api/hotels`, {
        headers: h,
      })
      .then(({ data }) => {
        setHotels(data);
      });
  };
  const deleteHotel = async (id) => {
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
      .delete(`http://localhost:8000/api/hotels/${id}`, {
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
        fetchHotels();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: "You can not delete hotel if the customer has already been assigned",
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
        <button
          className="btn btn-success col-md-4 offset-md-4 py-2 mt-4 my-2"
          onClick={() => navigate("/hotels/add")}
        >
          Add Hotel
        </button>
        <div className="container">
          <div className="row">
            <div className="col-sm d-flex align-items-center justify-content-center flex-wrap p-3 ">
              {hotels.map((hotel, index) => (
                <div
                  className="card-body flex-fill mb-5 mx-4 mt-3 bg-light p-4 rounded"
                  key={hotel.id}
                >
                  <img
                    className="card-img-top rounded mx-auto d-block"
                    variant="top"
                    alt="hotel_image"
                    src={"http://localhost:8000/" + hotel.image}
                    style={{ width: "25rem", height: "15rem" }}
                  />
                  <div className="d-flex justify-content-between mt-3 text-align">
                    <h4 className="card-title mx-3">{hotel.title}</h4>
                    <h4 className="card-title  mx-3">{hotel.price} EUR</h4>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="card-text fst-italic text-secondary mx-3 fs-5">
                      {hotel.days} days, {hotel.country.title}
                    </p>
                    <p className="card-text text-secondary mx-3 fs-5">
                      Available in:{" "}
                      <span className="fw-bold">{hotel.country.season}</span>
                    </p>
                  </div>
                  <div className="d-flex justify-content-center mt-2">
                    <Link to={"/hotels/edit/" + hotel.id}>
                      <button className="btn btn-primary">Update</button>
                    </Link>
                    <button
                      className="btn btn-danger ms-3"
                      onClick={() => deleteHotel(hotel.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hotels;
