/* eslint-disable react/prop-types */
import React from 'react';

function Radio({
  field: { name, value },
  form: { touched, errors, setFieldValue, setFieldTouched },
  label,
  className,
  options,
  ...props
}) {
  return (
    <fieldset>
      <legend>{label}</legend>
      {options.map(x => (
        <div className="flex items-center" key={x.id}>
          <input
            type="radio"
            name={name}
            id={x.id}
            checked={value === x.id}
            onChange={() => {
              setFieldValue(name, x.id);
              setFieldTouched(name, true);
            }}
            className="mr-2"
          />
          <label htmlFor={x.id}>{x.label}</label>
        </div>
      ))}
      {touched[name] && errors[name] && (
        <p className="text-red-500 text-sm font-medium">{errors[name]}</p>
      )}
    </fieldset>
  );
}

export default Radio;