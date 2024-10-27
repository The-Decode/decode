import { userState } from "@/atoms/userAtom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";

export const useGetMySubmissions = (problemid) => {
  const [submissions, setSubmission] = useState([]);
  const { id: userId } = useRecoilValue(userState);

  useEffect(() => {
    (async () => {
      await axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/code/submissions?userid=${userId}&problemid=${problemid}`,
        )
        .then((res) => {
          setSubmission(res.data);
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.message);
        });
    })();
  }, []);

  return submissions;
};

export const useGetAllSubmissions = () => {
  const [submission, setSubmission] = useState([]);
  const { id: userId } = useRecoilValue(userState);

  useEffect(() => {
    (async () => {
      await axios
        .get(import.meta.env.VITE_BACKEND_URL + "/code/submission/", {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            userid: userId,
          },
        })
        .then((res) => {
          setSubmission(res.data);
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.message);
        });
    })();
  }, []);

  return submission;
};
