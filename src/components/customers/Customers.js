import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Customers() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const [token, _] = useState(localStorage.getItem("token"));

  // LIST CUSTOMERS
  useEffect(() => {
    if (!token) return navigate("/login");
    let h = { Accept: "application/json", Authorization: `Bearer ${token}` };
    fetch("/api/customers", {
      headers: h,
    })
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
          setCustomers(result);
          setIsLoaded(true);
          // console.log(token);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }, []);

  // DELETE
  const fetchCustomers = async () => {
    let h = { Accept: "application/json", Authorization: `Bearer ${token}` };
    await axios
      .get(`/api/customers`, {
        headers: h,
        credentials: "include",
      })
      .then(({ data }) => {
        setCustomers(data);
      });
  };
  const deleteCustomer = async (id) => {
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
      .delete(`/api/customers/${id}`, {
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
        fetchCustomers();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.error,
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
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Hotel</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.surname}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.hotel.title}</td>
                  <td>
                    <div className="text-center">
                      <Link to={"/customers/edit/" + customer.id}>
                        <button className="btn btn-primary">Update</button>
                      </Link>
                      <button
                        className="btn btn-danger ms-3"
                        onClick={() => deleteCustomer(customer.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="btn btn-success"
            onClick={() => navigate("/customers/add")}
          >
            Add Customer
          </button>
        </div>
      </div>
    );
  }
}

export default Customers;
