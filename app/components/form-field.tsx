import { useState, useEffect } from "react";

interface FormFieldProps {
  htmlFor: string;
  label: string;
  type?: string;
  value: any;
  onChange?: (...args: any) => any;
  error?: string;
}

export default function FormField({
  htmlFor,
  label,
  type = "text",
  value,
  onChange = () => {},
  error = "",
}: FormFieldProps) {
  const [errorText, setErrorText] = useState(error);

  useEffect(() => {
    setErrorText(error);
  }, [error]);

  return (
    <>
      <label htmlFor={htmlFor} className='font-semibold text-blue-700'>
        {label}
      </label>
      <input
        type={type}
        name={htmlFor}
        id={htmlFor}
        value={value}
        onChange={(e) => {
          onChange(e);
          setErrorText("");
        }}
        className='w-full p-2 my-2 rounded-xl'
      />
      <div className='w-full text-xs font-semibold tracking-wide text-center text-red-500'>
        {errorText || ""}
      </div>
    </>
  );
}
