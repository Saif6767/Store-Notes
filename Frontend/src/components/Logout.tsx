import React from "react";
import { useNavigate } from "react-router-dom"; // For redirect
import toast from "react-hot-toast";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Token clear karo
    localStorage.removeItem("token");

    // Success message
    toast.success("Logout successful!");

    // Redirect to login page
    navigate("/");
  };

  return (
    <div>
      <button
        className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
