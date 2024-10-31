import { cn } from "@/lib/utils";
import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ className }) => {
  return (
    <div className={cn("w-full bg-black/90 p-4 px-4 text-gray-400", className)}>
      <div className="flex items-center justify-between py-2">
        <div className='flex items-center space-x-4'>
          <img src="/assets/logo.png" alt="logo" className="w-[40px] " />
          {/* copyright */}
          <h2>Copyright &copy; 2024 codehive.online</h2>
        </div>

        {/* right Side */}
        <div className="flex items-center space-x-4">
          <Link
            target="_blank"
            to="https://forum.trondao.org/t/codehive-crack-the-code-reap-the-rewards/23646"
          >
            Help
          </Link>
          {/* <Link to="/discord">Discord</Link> */}
          <Link target="_blank" to="https://github.com/CodeHive-Org/CodeHive">
            Github
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
