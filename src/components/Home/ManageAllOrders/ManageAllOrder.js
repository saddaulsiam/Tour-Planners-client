import React from "react";
import { Link } from "react-router-dom";

const ManageAllOrder = ({ order }) => {
  const { name, email, address, phone, city, _id } = order;
  const orders = order?.order;
  console.log(orders);

  const handleDelete = (id) => {
    console.log(id);
    const proceed = window.confirm(
      "Are you sure you want to delete your orders?"
    );
    if (proceed) {
      fetch(`https://tour-planners.herokuapp.com/deleteOrders/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.deletedCount > 0) {
            alert("Deleted successfully");
            window.location.reload();
          }
          console.log(result);
        });
    }
  };
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-4">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Orders Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{name}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{email}</td>
              </tr>
              <tr>
                <td>Address:</td>
                <td>{address}</td>
              </tr>
              <tr>
                <td>City:</td>
                <td>{city}</td>
              </tr>
              <tr>
                <td>Phone:</td>
                <td>{phone}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-6">
          <div className="d-flex flex-column">
            {orders.map((od) => (
              <div className="d-flex pb-5 justify-content-between align-items-center">
                <div className="inner">
                  <img width="150px" height="200px" src={od.img} alt="" />
                </div>
                <h4>
                  {od.name} {od.location}
                </h4>
                <p>{od.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={() => handleDelete(_id)} className="btn btn-danger">
        Delete Booking <i className="bi bi-scissors"></i>
      </button>
      <Link to={`/updateStatus/${_id}`}>
        <button className="btn btn-success ms-3">Approved</button>
      </Link>
      <hr />
    </div>
  );
};

export default ManageAllOrder;