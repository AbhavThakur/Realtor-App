function FormButton({ title, icon, ...rest }) {
  return (
    <button
      {...rest}
      type="submit"
      className={`w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 mt-7 ${
        icon && 'flex justify-center items-center'
      }`}
    >
      {icon && icon}
      {title}
    </button>
  );
}

export default FormButton;
