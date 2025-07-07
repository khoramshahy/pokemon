interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <p className="text-red-500 pt-4">{message}</p>;
};

export { ErrorMessage };
