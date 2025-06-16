import React, { useId, forwardRef } from "react";

const Input = forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block mb-2 pl-1 font-semibold text-sm text-gray-300"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={id}
          ref={ref}
          className={`w-full px-4 py-3 rounded-lg bg-white/10 text-gray placeholder-gray-400 
                border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                focus:border-transparent backdrop-blur-sm shadow-md transition duration-200 ${className}`}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
