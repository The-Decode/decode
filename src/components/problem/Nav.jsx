import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoginButton from "../LoginButton";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky inset-x-0 bg-background px-6 py-2">
      <main className="flex items-center justify-between py-1">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          src="/assets/logo1.png"
          alt="Code Duel"
          className="w-[140px] cursor-pointer object-contain"
        />
        <div className="flex h-full w-full items-center space-x-4">
          {/* prev and next problem buttons */}
          <div className="flex items-center space-x-2 pl-4 text-lg text-foreground">
            <ChevronLeft
              className="cursor-pointer"
              size={28}
              onClick={() => navigate(-1)}
            />
            <span className="text-sm text-second">{"Problem"}</span>
            {/* <ChevronRight className="cursor-pointer" size={28} /> */}
          </div>
        </div>
        {/* right side */}
        <div className="flex items-center space-x-4">
          <LoginButton />
        </div>
      </main>
    </nav>
  );
};

export default Nav;
