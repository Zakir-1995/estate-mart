import Breadcrumb from "../components/Breadcrumb";
import { Helmet } from "react-helmet";
const About = () => {
  return (
    <div className="mt-20 max-w-6xl mx-auto xl:px-0 px-3">
      <div>
        <Breadcrumb title="About" />
      </div>
      <Helmet>
        <title>Estate Mart - About Us</title>
      </Helmet>
      <div className=" py-10 flex md:flex-row flex-col-reverse items-center gap-5">
        <div className="w-full">
          <h3 className="text-4xl font-semibold text-megenta">
            <span className="text-gray-800 border-b-2 border-gray-800">
              About
            </span>{" "}
            Estate Mart
          </h3>
          <p className="text-sm font-medium text-gray-500 mt-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
            fugiat eius sit unde nam. Soluta distinctio voluptate impedit? Ea,
            tempore? Asperiores optio inventore provident ad enim atque aliquid
            sed praesentium quas consequatur nostrum nam consectetur
            perspiciatis, incidunt, tenetur dicta. Ex, optio perspiciatis quod
            minus odit, laboriosam ipsum recusandae pariatur ratione minima qui
            dignissimos a explicabo, et alias at facere excepturi veritatis
            laborum quam sint corporis impedit nobis aliquid! Eum sapiente eos
            suscipit corrupti,
          </p>
          <p className="text-sm font-medium text-gray-500 mt-2">
            {" "}
            mollitia possimus quo error necessitatibus, ab temporibus corporis.
            Ipsum rerum fuga cumque esse aperiam quos necessitatibus accusantium
            veniam fugit itaque, animi pariatur accusamus, nisi cupiditate
            quaerat earum eius. Amet consectetur aliquid, incidunt sit esse
            soluta? Expedita maxime hic rem perspiciatis eaque corrupti quaerat,
            voluptatem quasi voluptatum sunt unde dolorum voluptas ducimus dolor
            quis. Natus odit perferendis cum molestiae tempore tempora cumque
            magnam architecto, porro soluta ipsum explicabo, recusandae quas ut
            at. Similique nesciunt exercitationem nihil necessitatibus eveniet?
          </p>
          <div className="w-full mt-5 flex justify-end pr-14">
            <img
              src="/signature.png"
              alt="sign"
              className="w-[150px] opacity-40 "
            />
          </div>
        </div>
        <div className="w-full h-full">
          <img
            src="https://images.pexels.com/photos/157811/pexels-photo-157811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="about_image"
            className="w-full h-full object-cover "
          />
        </div>
      </div>
    </div>
  );
};

export default About;
