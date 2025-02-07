export default function Input({ name, type, label, ...props }) {
  return (
    <p className="control">
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} name={name} {...props} />
    </p>
  );
}
