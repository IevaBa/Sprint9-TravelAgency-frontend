import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

function SearchHotel() {
  const [hotels, setHotels] = useState([]);

  async function search(key) {
    console.log(key);

    let result = await fetch("/api/search/" + key);
    result = await result.json();
    console.log(result);
    setHotels(result);
  }
  return (
    <div>
      <div className="col-sm-6 offset-sm-3">
        <h1 className="my-4 text-center">Search Hotel</h1>
        <input
          type="text"
          placeholder="Search Hotel"
          onChange={(e) => search(e.target.value)}
          className="form-control my-3"
        />
      </div>
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
              src={"/" + hotel.image}
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchHotel;
