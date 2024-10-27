import { useEffect, useState } from "react";
import { useMemo } from "react";

export const useGetUser = () => {
  const [userDetails, setUserDetails] = useState();

  const user = useMemo(
    () => JSON.parse(localStorage.getItem("user")) || {},
    []
  );

  // useEffect(() => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  //   var urlencoded = new URLSearchParams();
  //   urlencoded.append("address", user);

  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     //   body: urlencoded,
  //     redirect: "follow"
  //   };

  //   fetch(
  //     `http://localhost:8000/api/get_user/${user.user.username}`,
  //     requestOptions
  //   )
  //     .then((response) => response.text())
  //     .then((result) => {
  //       console.log("result : ", JSON.parse(result));
  //       setUserDetails(JSON.parse(result));
  //     })
  //     .catch((error) => console.log("error", error));
  // }, [user]);

  return userDetails;
};
