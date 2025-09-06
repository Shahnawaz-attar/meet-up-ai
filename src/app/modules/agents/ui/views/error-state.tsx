import { AlertCircleIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export const ErrorState = ({ title, description }: Props) => {
  return (
    <div className="flex items-center justify-center py-12 px-6 sm:px-8 lg:px-12">
      <div className="flex flex-col items-center gap-6 bg-white rounded-xl p-8 shadow-lg border border-gray-100 transition-transform transform hover:scale-105 motion-reduce:hover:scale-100 w-full max-w-md">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-500">
          <AlertCircleIcon className="w-6 h-6" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};