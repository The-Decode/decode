import { activeSubmissionResultSelector } from "@/atoms/problemAtom";
import { useRecoilValue } from "recoil";
import SubmissionCreatedAt from "./SubmissionCreatedAt";

const ErrorSubmissionResult = () => {
  const submissionDetails = useRecoilValue(activeSubmissionResultSelector);
  const {
    statusDesc,
    createdAt,
    testCasesPassed,
    problem,
    lastTestCase,
    errorMessage,
  } = submissionDetails;

  return (
    <div className="p-4 text-[#CCC]">
      <span className="text-xl font-bold text-red-800">{statusDesc}</span>
      &nbsp; &nbsp;
      <span className="text-sm text-gray-500">
        | &nbsp; &nbsp;
        {testCasesPassed}/{problem?.testcases.length} testcases passed
      </span>
      <SubmissionCreatedAt createdAt={createdAt} />
      {errorMessage && (
        <div className="my-8 h-[300px] w-full overflow-auto rounded-lg bg-[#372B2B] p-4 text-[#F8604C]">
          <pre className="text-wrap">{errorMessage}</pre>
        </div>
      )}
      <div className="my-8 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <span className="text-gray-300">Last Executed Input</span>
          <div className="flex flex-col gap-1 rounded-lg  bg-gray-600 px-3 py-2">
            <span className="text-sm font-medium">{lastTestCase.input}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorSubmissionResult;
