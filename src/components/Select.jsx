import React, { forwardRef, useId } from "react";

const Select = forwardRef(
  ({ options = [], label, className = "", ...props }, ref) => {
    const id = useId();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block mb-1 pl-1 text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <select
          {...props}
          id={id}
          ref={ref}
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none 
        focus:bg-gray-50 focus:ring-2 focus:ring-indigo-500 duration-200 border border-gray-300 w-full ${className}`}
        >
          <option value="" disabled selected hidden>
            -- Select --
          </option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Select;
