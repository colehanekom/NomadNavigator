import React from 'react';

const TextInput = React.forwardRef(
  ({ type, placeholder, styles, label, labelStyles, register, name, error, tooltipText }, ref) => {
    return (
      <div className='w-full flex flex-col mt-2 relative'>
        {label && (
          <p className={`text-ascent-2 text-sm mb-2 ${labelStyles}`}>{label}</p>
        )}

        <div className="relative group">
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            className={`bg-white rounded border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] ${styles}`}
            {...register}
            aria-invalid={error ? "true" : "false"}
          />
          {tooltipText && (
            <div className="hidden group-hover:block absolute z-10 p-2 bg-black text-white rounded-md text-sm">
              {tooltipText}
            </div>
          )}
        </div>

        {error && (
          <span className='text-xs text-red-600 mt-0.5'>{error}</span>
        )}
      </div>
    );
  }
);

export default TextInput;
