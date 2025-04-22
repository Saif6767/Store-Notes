// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        MyProductApp
      </Link>

      <div className="flex items-center gap-4">
        {/* Aap yahan aur nav links bhi daal sakte ho */}
        <Logout />
      </div>
    </nav>
  );
};

export default Navbar;
