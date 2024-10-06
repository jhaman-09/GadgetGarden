import React from "react";

const HorizontalProductCardLoading = ({ design }) => {
  return (
    <div
      className={`w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow ${design}`}
    >
      <div
        className={
          design
            ? `bg-slate-400 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse`
            : `bg-slate-400 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse flex justify-center items-center`
        }
      ></div>

      <div className="p-4 grid gap-3">
        <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200">
          {" "}
        </h2>
        <p
          className={
            design
              ? `capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200`
              : `capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2`
          }
        ></p>
        <div className={design ? `flex gap-3 w-full` : `flex gap-3`}>
          <p
            className={
              design
                ? `text-primary font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full`
                : `text-primary font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2`
            }
          ></p>
          <p
            className={
              design
                ? `text-primary font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full`
                : `text-primary font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2`
            }
          ></p>
        </div>
        <button
          className={
            design
              ? `text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse`
              : `text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse`
          }
        ></button>
      </div>
    </div>
  );
};

export default HorizontalProductCardLoading;
