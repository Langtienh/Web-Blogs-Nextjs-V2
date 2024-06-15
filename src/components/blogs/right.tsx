/* eslint-disable @next/next/no-img-element */
"use client";

const LikeShareList = () => {
  return (
    <>
      <div className="p-4">
        <div className="flex flex-col gap-5 items-center">
          <img src="./images/hero.png" alt="auth" />
          <h2 className="font-bold text-3xl text-[#ff2200]">Welcome to</h2>
          <img className="w-1/2" src="./images/logo/hust.png" alt="hust" />
          <img className="w-1/2" src="./images/logo/sun.png" alt="sun" />
        </div>
      </div>
    </>
  );
};
export default LikeShareList;
