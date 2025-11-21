import React from "react";

const DashboardCard = ({ label, onClick }) => {
  return (
    <div className="dashboard-card" onClick={onClick}>
      {label}
    </div>
  );
};

export default DashboardCard;
