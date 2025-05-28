import React from "react";
import { useNavigate } from "react-router-dom";

function Doctor({ doctor }) {
  const navigate = useNavigate();
  return (
    <div
      className="doctor-card cursor-pointer"
      onClick={() => navigate(`/book-appointment/${doctor._id}`)}
    >
      <h1 className="card-title">
        {doctor.firstName} {doctor.lastName}
      </h1>
      <div className="specialization">{doctor.specialization}</div> <hr />
      <p>
        <i className="fas fa-phone"></i> <b>Phone Number : </b>
        {doctor.phoneNumber}
      </p>
      <p>
        <i className="fas fa-map-marker-alt"></i> <b>Address : </b>
        {doctor.address}
      </p>
      <p>
        <i className="fas fa-money-bill-alt"></i> <b>Fee per Visit : </b>৳
        {doctor.feePerCunsultation}
      </p>
      <p>
        <i className="fas fa-clock"></i> <b>Timings : </b>
        {doctor.timings[0]} - {doctor.timings[1]}
      </p>
    </div>
  );
}

export default Doctor;
