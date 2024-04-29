import { Link } from "react-router-dom";

const Notfound: React.FC = () => {
  return (
    <div className="flex min-h-[100dvh] flex-1 flex-col items-center justify-center gap-2">
      <h2>The page you are looking for is not available!</h2>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default Notfound;
