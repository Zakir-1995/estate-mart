import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

const NotFound = () => {
  return (
      <div className="w-full min-h-[400px]  mt-20 max-w-6xl mx-auto px-3 ">
         <Breadcrumb title="404 Not-found"/>
      <div className="w-full flex items-center justify-center pt-10 h-full">
        <img src="/404.png" alt="404 Image" />
          </div>
          <div className="w-full flex justify-end">
              <Link to="/" className="bg-megenta text-xl font-medium text-white px-4 py-1 rounded shadow hover:bg-megenta/80">Back</Link>
          </div>
    </div>
  );
}

export default NotFound