import {
  activeSubmissionIdState,
  activeSubmissionResultSelector,
  fetchSubmissionsLoadingState,
  submissionResultState,
} from "@/atoms/problemAtom";
import { CircleDollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ReportModal from "../ReportModal";
import SubmissionDetail from "../submission/SubmissionDetail";
import { SubSkeletonPage } from "../SubSkeletonPage";
import AllSubmissions from "./AllSubmissions";
import MySubmissions from "./MySubmissions";
import { tabsSelectorAtom, userState } from "@/atoms/userAtom";
import axios from "axios";

const ProblemDescription = ({ problem, pid, contract }) => {
  const [loading, setLoading] = useState(false);
  //const { tronWeb } = useTheContext();
  const location = useLocation();
  const [claimer, setClaimer] = useState();
  const [isClaimed, setIsClaimed] = useState(false);

  const [selector, setSelector] = useRecoilState(tabsSelectorAtom);
  const activeSubmissionId = useRecoilValue(activeSubmissionIdState);
  const setActiveSubmissionId = useSetRecoilState(activeSubmissionIdState);
  const [submisionResult, setSubmissionResult] = useRecoilState(
    submissionResultState,
  );
  const activeSubmissionResult = useRecoilValue(activeSubmissionResultSelector);
  const [fetchSubmissionsLoading, setFetchSubmissionsLoading] = useRecoilState(
    fetchSubmissionsLoadingState,
  );
  useEffect(() => {
    (async () => {
      if (fetchSubmissionsLoading && activeSubmissionId) {
        if (!activeSubmissionResult) {
          try {
            const res = await axios.get(
              import.meta.env.VITE_BACKEND_URL +
                `/code/submission/${activeSubmissionId}`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              },
            );
            const data = res.data;

            setSubmissionResult((prev) => ({
              ...prev,
              [activeSubmissionId]: data,
            }));

            console.log("updatin g? ?????");
          } catch (err) {
            console.log("Error", err.message);
          } finally {
            setFetchSubmissionsLoading(false);
          }
        } else {
          setFetchSubmissionsLoading(false);
        }
      }
    })();
  }, [fetchSubmissionsLoading, activeSubmissionId, activeSubmissionResult]);

  return (
    <main className="relative h-full bg-third ">
      <div className="h-full overflow-y-scroll bg-third scrollbar-none">
        {/* TAB */}
        <div className="flex h-11 w-full items-center gap-2 overflow-x-hidden border-b border-gray-500 bg-secondary pt-2 text-white">
          <div
            className={`cursor-pointer rounded-t-[5px] ${selector == 0 ? "bg-gray-700" : ""} px-5 py-[10px] text-xs`}
            onClick={() => setSelector(0)}
          >
            Description
          </div>
          {/* <div
            className={`cursor-pointer rounded-t-[5px] ${selector == 1 ? "bg-gray-700" : ""} px-5 py-[10px] text-xs`}
            onClick={() => setSelector(1)}
          >
            All Codes
          </div> */}
          <div
            className={`cursor-pointer rounded-t-[5px] ${selector == 2 ? "bg-gray-700" : ""} px-5 py-[10px] text-xs`}
            onClick={() => setSelector(2)}
          >
            My Submissions
          </div>
        </div>
        {loading && <SubSkeletonPage />}
        {selector == 0 && !loading && (
          <div className="relative flex  h-[calc(100vh-94px)] overflow-y-hidden px-0 py-4">
            <div className="px-5">
              <div className="flex w-full flex-col gap-4">
                <div className="flex flex-col space-y-2">
                  <div className="mr-2 flex-1 text-xl font-medium text-white">
                    {problem?.name.split("|")[0]}
                    {/* <span className="text-gray-400 text-[0.5rem]"> {pid}</span>{" "} */}
                  </div>
                  {/* tags */}
                  <div className="flex items-center space-x-4">
                    <p className=" rounded-md bg-gray-700 px-4 py-1 text-[0.8rem] font-medium text-orange-400 drop-shadow-lg">
                      {problem.difficulty}
                    </p>
                    {problem.status === "Funded" ? (
                      <p className="flex rounded-md bg-gray-700 px-4 py-1 text-[0.8rem] font-medium text-white drop-shadow-lg">
                        <CircleDollarSign
                          size={18}
                          className="mr-2 text-green-600"
                        />

                        {problem.status}
                      </p>
                    ) : (
                      <p className=" rounded-md bg-gray-700 px-4 py-1 text-[0.8rem] font-medium text-white drop-shadow-lg">
                        {problem.status}
                      </p>
                    )}
                  </div>
                </div>

                {/* Problem Statement(paragraphs) */}
                <div className="text-[0.9rem] text-gray-300">
                  <div
                    dangerouslySetInnerHTML={{ __html: problem.description }}
                  />
                </div>

                {/* Examples */}
                <div className="mt-4 rounded-md border border-black bg-black/20 p-4">
                  {problem.examples.map((example, index) => (
                    <div key={index}>
                      <p className="font-medium text-white ">
                        Example {index + 1}:{""}
                      </p>
                      {example.img && (
                        <img src={example.img} alt="" className="mt-3" />
                      )}
                      <div className="example-card">
                        <pre>
                          <strong className="text-white">Input: </strong>{" "}
                          {example.input.toString()}
                          <br />
                          <strong>Output: </strong>
                          {example.output.toString()} <br />
                          {example.explanation && (
                            <>
                              <strong>Explanation:</strong>{" "}
                              {example.explanation}
                            </>
                          )}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="my-4 pb-4">
                  <div className="text-sm font-medium text-white">
                    Constraints:
                  </div>
                  <ul className="ml-5 list-disc text-white ">
                    {problem.constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                </div>

                {/* more info regarding problem  */}
                <div className="flex max-w-max flex-col space-y-4">
                  <div className="flex rounded-md border border-dotted border-gray-400 bg-black/40 p-2 px-4 font-semibold text-white">
                    <h1 className="mr-2 font-medium">
                      Bounty Status :
                      <span>
                        {" "}
                        {problem?.status != "Funded"
                          ? "Not yet Set"
                          : problem?.bountyStatus == "CLAIMED"
                            ? "Already Claimed"
                            : "Is yet to be Claimed."}
                      </span>
                    </h1>
                  </div>
                  {problem?.bounty && (
                    <div className="flex rounded-md bg-orange-400 p-2 px-4 font-semibold text-red-700">
                      <h1 className="mr-2 font-medium text-black">
                        Reward if you solve this : {problem?.bounty} TRX
                      </h1>
                    </div>
                  )}
                </div>

                {/* report button section */}
                <ReportModal />
                {/* <section className='absolute bottom-5 mb-1'>
                      <Button variant='destructive' className='text-white relative px-5 h-[35px]'>Report</Button>
                </section> */}
              </div>
            </div>
          </div>
        )}
        {/* {selector == 1 && !loading && (
          <AllSubmissions
            contract={contract}
            claimer={claimer}
            loader={setLoading}
          />
        )} */}
        {selector == 2 &&
          !loading &&
          (activeSubmissionId ? (
            <SubmissionDetail />
          ) : (
            <MySubmissions pid={problem.id} />
          ))}
      </div>
    </main>
  );
};

export default ProblemDescription;
