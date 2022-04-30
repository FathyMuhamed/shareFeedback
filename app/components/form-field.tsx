interface FormFieldProps {
  htmlFor: string;
  label: string;
  type?: string;
  value: any;
  onChange?: (...args: any) => any;
}

export default function FormField({
  htmlFor,
  label,
  type = "text",
  value,
  onChange = () => {},
}: FormFieldProps) {
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
        onChange={onChange}
        className='w-full p-2 my-2 rounded-xl'
      />
    </>
  );
}
