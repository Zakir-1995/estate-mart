
const Search = () => {
  return (
    <div className="mt-[70px]  max-w-6xl mx-auto  grid grid-cols-12 gap-5 px-4">
      <form className="md:col-span-4 col-span-12  md:border-r border-b border-gray-300 pr-1 md:min-h-screen py-5">
        <div className="flex items-center gap-1">
          <label className="text-xl font-semibold text-gray-800 whitespace-nowrap">
            {" "}
            Search Term:{" "}
          </label>
          <input
            type="text"
            placeholder="Search..."
            className="focus:outline-none bg-transparent border border-gray-300 px-2 py-1 rounded w-full"
          />
        </div>
        <div className="flex items-center gap-2 py-5">
          <span className="text-lg font-medium text-gray-800">Type:</span>
          <div>
            <label htmlFor="type" className=" font-medium text-gray-500">
              {" "}
              Rent & Sell{" "}
            </label>
            <input
              type="checkbox"
              id="type"
              defaultChecked
              className="cursor-pointer"
            />
          </div>
          <div>
            <label htmlFor="rent" className=" font-medium text-gray-500">
              Rent{" "}
            </label>
            <input type="checkbox" id="rent" className="cursor-pointer" />
          </div>
          <div>
            <label htmlFor="sell" className=" font-medium text-gray-500">
              Sell{" "}
            </label>
            <input type="checkbox" id="sell" className="cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center gap-2 ">
          <span className="text-lg font-medium text-gray-800">Amenities:</span>

          <div>
            <label htmlFor="parking" className="font-medium text-gray-500">
              Parking{" "}
            </label>
            <input type="checkbox" id="parking" className="cursor-pointer" />
          </div>
          <div>
            <label htmlFor="furnished" className=" font-medium text-gray-500">
              Furnished{" "}
            </label>
            <input type="checkbox" id="furnished" className="cursor-pointer" />
          </div>
          <div>
            <label htmlFor="offer" className=" font-medium text-gray-500">
              Offer{" "}
            </label>
            <input type="checkbox" id="offer" className="cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center gap-3 pt-5">
          <label className="text-lg font-semibold text-gray-800">Sort:</label>
          <select
            id="sort"
            className="border border-gray-300 px-2 py-1 rounded  font-semibold text-gray-600"
          >
            <option className=" font-semibold text-gray-500">
              Price High to Low
            </option>
            <option className=" font-semibold text-gray-500">
              Price Low to High
            </option>
            <option className=" font-semibold text-gray-500">Newest</option>
            <option className=" font-semibold text-gray-500">Oldest</option>
          </select>
        </div>
        <button className="bg-gray-800 px-5 py-1 rounded text-white w-full mt-5">
          Search
        </button>
      </form>

      <div className="md:col-span-8 col-span-12">2</div>
    </div>
  );
}

export default Search