/* eslint-disable react/prop-types */
import React from 'react';

function CheckBox({
  field: { name, value },
  form: { touched, errors, setFieldValue },
  meta,
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
            type="checkbox"
            name={name}
            id={x.id}
            checked={value.some(val => val === x.id)}
            onChange={() => {
              const index = value.findIndex(val => val === x.id);
              if(index === -1){
                setFieldValue(name, [...value, x.id]);
              } else {
                setFieldValue(name, [
                  ...value.slice(0, index),
                  ...value.slice(index + 1)
                ]);
              }
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

export default CheckBox;
