import React from 'react';

const FormField = ({
  labelName,
  placeholder,
  inputType = 'text',
  isTextArea = false,
  value,
  handleChange,
  children,
}) => {
  const baseStyles =
    'w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400';

  return (
    <label className="w-full flex flex-col gap-2 mb-5">
      {labelName && (
        <span className="font-medium text-gray-700 text-sm">{labelName}</span>
      )}

      {isTextArea ? (
        <textarea
          required
          rows={6}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`${baseStyles} resize-none`}
        />
      ) : inputType === 'select' ? (
        <select
          required
          value={value}
          onChange={handleChange}
          className={`${baseStyles} bg-white`}
        >
          {children}
        </select>
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step={inputType === 'number' ? '0.1' : undefined}
          placeholder={placeholder}
          className={baseStyles}
        />
      )}
    </label>
  );
};

export default FormField;
