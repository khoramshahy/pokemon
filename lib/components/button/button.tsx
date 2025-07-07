interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  extraClass?: string;
}

const Button = ({
  onClick,
  children,
  disabled,
  type,
  extraClass,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed ${extraClass}`}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export { Button };
