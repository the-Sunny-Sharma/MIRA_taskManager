export default function Input({ details }) {
  return (
    <div className="form">
      <input
        type={details?.type}
        name={details?.name}
        value={details?.value}
        onChange={details?.onChange}
        autocomplete="off"
        required
      />
      <label htmlFor={details?.name} className="label-name">
        <span className="content-name">{details?.label}</span>
      </label>
    </div>
  );
}
