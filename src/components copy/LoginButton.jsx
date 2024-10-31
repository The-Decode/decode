import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { authTokenState, usernameState, userState } from "@/atoms/userAtom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { jwtDecode } from "jwt-decode";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";

const LoginButton = () => {
  const [authToken, setAuthToken] = useRecoilState(authTokenState);
  const [username, setUsername] = useRecoilState(usernameState);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  const { disconnect } = useWallet();

  const handleLogin = async () => {
    try {
      if (window.tronWeb && !window.tronWeb.defaultAddress.base58) {
        alert("Please install TronLink to connect your wallet.");
      }
    } catch (error) {
      console.error("Error connecting TronLink:", error);
    }

    if (window.tronWeb && window.tronLink) {
      await window.tronLink.request({ method: "tron_requestAccounts" });

      const sigValidTill = BigInt(Date.now() + 30000).toString();
      const message = `${window.tronLink.tronWeb.defaultAddress?.base58}:${sigValidTill}`;
      const signature =
        await window.tronLink.tronWeb?.trx?.signMessageV2(message);

      try {
        const { data } = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/auth/login",
          {
            message,
            signature,
          },
        );

        console.log("data : ", data);

        if (data.isNewUser) {
          setModalOpen(true);
        } else {
          setAuthToken(data.token);
          localStorage.setItem("auth-token", data.token);
          const decoded = jwtDecode(data.token);
          console.log("user : ", decoded?.user);
          setUser(decoded?.user);
        }
      } catch (error) {
        console.error("Login failed", error);
      }
    } else {
      console.error("TronLink not found");
    }
  };

  const handleRegister = async () => {
    console.log("in the handleRegister sir !!!!!!");
    console.log("username in register : ", username);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/auth/register",
        {
          username,
          message: window.tronLink.tronWeb.defaultAddress?.base58,
        },
      );
      setAuthToken(response.data.token);
      localStorage.setItem("auth-token", response.data.token);

      const decoded = jwtDecode(response.data.token);
      setUser(decoded?.user);
    } catch (err) {
      console.error("Registration failed", err);
    } finally {
      setModalOpen(false);
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    setUser({});
    disconnect();
    localStorage.removeItem("auth-token");
  };

  useEffect(() => {}, [modalOpen, authToken]);

  return (
    <div>
      {modalOpen && (
        <UsernameModal handleRegister={handleRegister} open={modalOpen} />
      )}
      {user && authToken && window.tronLink.tronWeb.defaultAddress?.base58 ? (
        <div className="flex items-center justify-center space-x-4">
          <h2 className="text-gray-300">{user.username}</h2>
          <button onClick={handleLogout}>LogOut</button>
        </div>
      ) : (
        <button
          className=" border-gray-400 px-4 py-1 hover:border-b"
          onClick={handleLogin}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default LoginButton;

const UsernameModal = ({ open, handleRegister }) => {
  const [username, setUsername] = useRecoilState(usernameState);

  useEffect(() => {}, [open]);

  if (!open) {
    return;
  }

  const validate = () => {
    if (username && typeof username !== "undefined" && username.length >= 4) {
      toast.error("Username must be at least 4 characters long");
      return false;
    }

    return true;
  };

  return (
    <main className="absolute inset-0 z-20 flex items-center bg-black/10 backdrop-blur-md">
      <div className="relative bottom-40 z-50 m-auto flex h-max w-auto flex-col items-center space-y-5 rounded-md bg-[#171717] p-1 max-sm:w-[90%]">
        <h1 className="p-4 font-semibold">
          Welcome to the platform, please register with a unique Username !
        </h1>
        <Input
          className="w-[45vw] max-w-[500px] bg-black max-sm:w-full"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Button
          className={cn(`my-2 ml-4 mr-auto !py-1 px-6`)}
          onClick={() => {
            if (validate) {
              handleRegister();
            }
            return;
          }}
        >
          Submit
        </Button>
      </div>
    </main>
  );
};
