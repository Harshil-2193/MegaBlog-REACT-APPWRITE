import React from "react";

const Logo = ({ width = "100px" }) => {
  return (
    <div
      style={{ width: width }}
      className="flex items-center justify-center text-white text-3xl font-bold"
    >
      Blogify
    </div>
  );
};

export default Logo;
