import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { authTokenState } from "@/atoms/userAtom";

const Navbar = ({ className, dropdown = false }) => {
  const navigate = useNavigate();

  const [position, setPosition] = useState("bottom");

  return (
    <div className={cn("xl:px-18 w-full px-14 py-4", className)}>
      <main className="flex items-center justify-between text-white">
        {/* Logo */}
        <div className="h-full w-full">
          <img
            onClick={() => navigate("/")}
            src="/assets/logo1.png"
            alt="CodeHive" // set this true to appear the alertBox
            className="w-[160px] cursor-pointer object-fill"
          />
          {/* <h1 className="text-2xl font-semibold">CodeHive</h1> */}
        </div>
        <div className="flex items-center space-x-4">
          <LoginButton />

          {dropdown && window.tronLink.tronWeb.defaultAddress?.base58 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <User size={28} className="text-gray-100 hover:text-primary" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-max border-gray-300 bg-third text-accent ">
                {/* <DropdownMenuLabel>Panel Position</DropdownMe
                nuLabel> */}
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={setPosition}
                >
                  <DropdownMenuItem>
                    <Link to="/myquestion">My Questions</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/addquestion">Add Question</Link>
                  </DropdownMenuItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </main>
    </div>
  );
};

export default Navbar;
