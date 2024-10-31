import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ArrowLeft } from "lucide-react";
import AcceptedSubmissionResult from "./AcceptedSubmissionResult";
import WrongSubmissionResult from "./WrongSubmissionResult";
import ErrorSubmissionResult from "./ErrorSubmissionResult";
import { Editor } from "@monaco-editor/react";
import { Button } from "../ui/button";
import {
  activeSubmissionIdState,
  activeSubmissionResultSelector,
  fetchSubmissionsLoadingState,
  submissionResultState,
} from "@/atoms/problemAtom";
import { useEffect } from "react";

const renderSubmissionDetails = (submissionResult) => {
  switch (submissionResult.statusId) {
    case 3:
      return <AcceptedSubmissionResult />;
    case 4:
      return <WrongSubmissionResult />;
    default:
      return <ErrorSubmissionResult />;
  }
};

const SubmissionDetail = () => {
  const [activeSubmissionId, setActiveSubmissionId] = useRecoilState(
    activeSubmissionIdState,
  );
  
  const submissionDetails = useRecoilValue(activeSubmissionResultSelector);
  const submissionResult = useRecoilValue(fetchSubmissionsLoadingState);

  useEffect(() => {
    console.log("submission datia l: ", submissionDetails);
  }, [submissionDetails, submissionResult, activeSubmissionId]);

  if (submissionDetails && submissionDetails?.statusId) {
    const { code } = submissionDetails;
    return (
      <>
        <Button variant="ghost" onClick={() => setActiveSubmissionId(null)}>
          <ArrowLeft size={16} className="mr-2" /> All submissions{" "}
        </Button>

        {renderSubmissionDetails(submissionDetails)}

        <div className="p-4">
          <h3>Code | {"javascript"}</h3>
          <div className="my-4 h-[300px] overflow-hidden rounded-md bg-[#1E1E1E] py-4">
            <Editor
              height={"100%"}
              value={code}
              theme="vs-dark"
              options={{
                fontSize: 14,
                lineNumbers: "off",
                readOnly: true,
                scrollBeyondLastLine: false,
              }}
              language={63}
            />
          </div>
        </div>
      </>
    );
  } else
    return (
      <div className="items-left flex flex-col">
        <Button
          variant="ghost"
          className="w-max"
          onClick={() => setActiveSubmissionId(null)}
        >
          <ArrowLeft size={16} className="mr-2" /> All submissions{" "}
        </Button>
        <h2 className="w-full border-t border-gray-600 py-4 text-center text-[1.1rem] font-medium text-red-400">
          Something went wrong !
        </h2>
      </div>
    );
};

export default SubmissionDetail;
