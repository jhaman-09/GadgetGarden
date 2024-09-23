import React from "react";

const HorizontalProductCardLoading = () => {
  return (
    <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
      <div className="bg-orange-500 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse flex justify-center items-center"></div>

      <div className="p-4 grid gap-3">
        <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-all bg-slate-200"></h2>
        <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2"></p>
        <div className="flex gap-3">
          <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
          <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
        </div>
        <button className="text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse"></button>
      </div>
    </div>
  );
};

export default HorizontalProductCardLoading;
