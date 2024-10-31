import React from "react";
import twitter from "../assets/twitte.png";
import tron from "../assets/tron.png";

const ComingSoon = () => {
  return (
    <div className="flex h-[80%] w-[80%] flex-col items-center gap-[10px] rounded-[16px] border border-gray-500 bg-black p-[30px]">
      <div className="flex items-center gap-4">
        {/* <div className="w-[30px] h-[30px] rounded-full overflow-hidden animate-spin">
              <img className="object-cover" src={logo}/>
            </div> */}
        <p className="animate-pulse text-[42px] text-primary">Coming Soon!!</p>
      </div>
      <p>Follow us on Twitter for updates:</p>
      <div
        className="flex items-center justify-between gap-2
          "
      >
        <img
          onClick={() => {
            window.open("https://twitter.com/Codehive01", "_blank");
          }}
          src={twitter}
          className="cursor-pointer rounded-md hover:border 
              hover:border-primary"
          alt=""
        />
        <img
          onClick={() => {
            window.open(
              "https://forum.trondao.org/t/codehive-crack-the-code-reap-the-rewards/23646",
              "_blank",
            );
          }}
          src={tron}
          className="cursor-pointer rounded-md hover:border 
              hover:border-primary"
          alt=""
        />
      </div>
    </div>
  );
};

export default ComingSoon;
