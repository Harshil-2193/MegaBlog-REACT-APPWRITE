import React, { useId, forwardRef } from "react";

const Input = forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block mb-2 pl-1 font-semibold text-sm text-gray-400"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={id}
          ref={ref}
          className={`w-full px-4 py-3 rounded-lg bg-zinc-700 text-white placeholder-gray-400 
                border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-transparent transition duration-200 ${className}`}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
