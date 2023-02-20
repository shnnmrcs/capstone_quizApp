/* eslint-disable react/prop-types */
import React from 'react';
import clsx from 'clsx';

function Input({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  meta, // watch docs (altough this is not used here. it is used like '(meta.touched && meta.error && ...)')
  className,
  ...props
}) {
  
  return (
    <div className="-space-y-px rounded-md">
      <div>
        <label htmlFor={props.id} className="sr-only">
          {props.placeholder}
        </label>
        <input
          id={props.id}
          type="text"
          className={clsx(
            'relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
            {
              [className || '']: !!className,
            },
          )}
          {...field}
          {...props}
        />
        {touched[field.name] && errors[field.name] && (
          <p className="text-red-500 text-sm font-medium">
            {errors[field.name]}
          </p>
        )}
      </div>
    </div>
  );
}

export default Input;