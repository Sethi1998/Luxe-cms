export interface ButtonProp {
  label: string;
  type?: ButtonType;
  handleClick?: (value: any) => void;
}

enum ButtonType {
  button = "button",
  submit = "submit",
}

export const PrimaryButton = ({ label, type, handleClick }: ButtonProp) => {
  return (
    <button
      className="bg-black text-white p-2 rounded"
      type={type}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};
