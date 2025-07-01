import Fault from "@/utils/error";

const Error = ({ code, name, message, dev }: Fault) => {
  return (
    <div className="fixed flex h-screen w-screen flex-col items-center justify-center bg-white">
      <p className="m-0 text-center text-6xl font-extrabold bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
        {code}
      </p>
      <p className="m-0 text-center text-lg font-bold text-red-600 md:text-2xl">
        {name}
      </p>
      <p className="m-0 text-center text-sm text-red-500 md:text-lg">
        {message}
      </p>
      {dev && (
        <p className="m-0 text-center text-sm text-red-400 md:text-lg">
          Developer Notes: {dev}
        </p>
      )}
    </div>
  );
};

export default Error;
