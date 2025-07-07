import { text } from "@/lib/translator";

interface LoadingProps {
  message?: string;
}
const Loading = ({ message = text.common.loading }: LoadingProps) => {
  return <p className="text-center">{message}</p>;
};

export { Loading };
