import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import { baseUrl } from "../helper/baseUrl";

const Search = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const [showMore,setShowMore] = useState(false)
  const [listings,setListings] = useState([])
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sell"
    ) {
      setSidebarData({ ...sidebarData, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSidebarData({
        ...sidebarData,
        searchTerm: e.target.value,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebarData({ ...sidebarData, sort, order });
    }
  };


console.log(listings)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

     const fetchListings = async () => {
       setLoading(true);
       setShowMore(false);
       const searchQuery = urlParams.toString();
       console.log(searchQuery)
       const res = await fetch(`${baseUrl}/listing/search?${searchQuery}`);
       const data = await res.json();
       if (data.length > 8) {
         setShowMore(true);
        } else {
         setShowMore(false);
       }
       setListings(data);
       setLoading(false);
     };

     fetchListings();

    // eslint-disable-next-line
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

    const onShowMoreClick = async () => {
      const numberOfListings = listings.length;
      const startIndex = numberOfListings;
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("startIndex", startIndex);
      const searchQuery = urlParams.toString();
      const res = await fetch(`${baseUrl}/listing/search?${searchQuery}`);
      const data = await res.json();
      if (data.length < 9) {
        setShowMore(false);
      }
      setListings([...listings, ...data]);
    };

  return (
    <div className="mt-[70px]  max-w-6xl mx-auto  grid grid-cols-12  px-4 ">
      <form
        onSubmit={handleSubmit}
        className="md:col-span-4 col-span-12  md:border-r border-b border-gray-300 pr-1 md:min-h-screen py-5"
      >
        <div className="flex items-center gap-1">
          <label className="text-xl font-semibold text-gray-800 whitespace-nowrap">
            {" "}
            Search Term:{" "}
          </label>
          <input
            type="text"
            id="searchTerm"
            placeholder="Search..."
            value={sidebarData.searchTerm}
            onChange={handleChange}
            className="focus:outline-none bg-transparent border border-gray-300 px-2 py-1 rounded w-full"
          />
        </div>
        <div className="flex items-center gap-2 py-5">
          <span className="text-lg font-medium text-gray-800">Type:</span>
          <div>
            <label htmlFor="all" className=" font-medium text-gray-500">
              {" "}
              Rent & Sell{" "}
            </label>
            <input
              type="checkbox"
              id="all"
              checked={sidebarData.type === "all"}
              onChange={handleChange}
              className="cursor-pointer"
            />
          </div>
          <div>
            <label htmlFor="rent" className=" font-medium text-gray-500">
              Rent{" "}
            </label>
            <input
              type="checkbox"
              id="rent"
              className="cursor-pointer"
              checked={sidebarData.type === "rent"}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="sell" className=" font-medium text-gray-500">
              Sell{" "}
            </label>
            <input
              type="checkbox"
              id="sell"
              className="cursor-pointer"
              checked={sidebarData.type === "sell"}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 ">
          <span className="text-lg font-medium text-gray-800">Amenities:</span>

          <div>
            <label htmlFor="parking" className="font-medium text-gray-500">
              Parking{" "}
            </label>
            <input
              type="checkbox"
              id="parking"
              className="cursor-pointer"
              checked={sidebarData.parking}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="furnished" className=" font-medium text-gray-500">
              Furnished{" "}
            </label>
            <input
              type="checkbox"
              id="furnished"
              className="cursor-pointer"
              checked={sidebarData.furnished}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="offer" className=" font-medium text-gray-500">
              Offer{" "}
            </label>
            <input
              type="checkbox"
              id="offer"
              className="cursor-pointer"
              checked={sidebarData.offer}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex items-center gap-3 pt-5">
          <label className="text-lg font-semibold text-gray-800">Sort:</label>
          <select
            id="sort_order"
            className="border border-gray-300 px-2 py-1 rounded  font-semibold text-gray-600"
            defaultValue={"created_at_desc"}
            onChange={handleChange}
          >
            <option
              value="regularPrice_desc"
              className=" font-semibold text-gray-500"
            >
              Price High to Low
            </option>
            <option
              value="regularPrice_asc"
              className=" font-semibold text-gray-500"
            >
              Price Low to High
            </option>
            <option
              value="createdAt_desc"
              className=" font-semibold text-gray-500"
            >
              Newest
            </option>
            <option
              value="createdAt_asc"
              className=" font-semibold text-gray-500"
            >
              Oldest
            </option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-gray-800 px-5 py-1 rounded text-white w-full mt-5"
        >
          Search
        </button>
      </form>

      <div className="md:col-span-8 col-span-12 pb-5">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results:
        </h1>
        <div className="px-5 flex flex-wrap items-center justify-center w-full gap-5">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listing found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
