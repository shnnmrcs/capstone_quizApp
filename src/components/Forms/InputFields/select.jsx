/* eslint-disable react/prop-types */
import React from 'react';
import clsx from 'clsx';

function Select({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  meta, // watch docs (altough this is not used here. it is used like '(meta.touched && meta.error && ...)')
  className,
  options,
  ...props
}) {
  return (
    <div className="-space-y-px rounded-md">
      <div>
        <label
          htmlFor={props.id}
          className="sr-only"
        >
          {props.placeholder}
        </label>
        <select
          id={props.id}
          type="select"
          className={clsx(
            'relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
            {
              [className || '']: !!className,
            },
          )}
          {...field}
          {...props}
          required
        >
        <option defaultValue hidden>{props.placeholder}</option>
        {options.map(option => (<option key={option.value} value={option.value}>{option.label}</option>))}
        </select>
        {touched[field.name] &&
          errors[field.name] && (
            <p className="text-red-500 text-sm font-medium">
              {errors[field.name]}
            </p>
          )}
      </div>
    </div>
  );
}

export default Select;
