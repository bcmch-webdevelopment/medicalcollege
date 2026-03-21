import React from "react";

const ViewProfileButton = ({ doctor, onViewProfile }) => {
  return (
    <button
      className="btn btn-dark btn-sm"
      onClick={() => onViewProfile(doctor)}
    >
      View Profile
    </button>
  );
};

export default ViewProfileButton;