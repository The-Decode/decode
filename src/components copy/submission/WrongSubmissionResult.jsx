import { useRecoilValue } from "recoil";
import SubmissionCreatedAt from "./SubmissionCreatedAt";
import { activeSubmissionResultSelector } from "@/atoms/problemAtom";

const WrongSubmissionResult = () => {
  const submissionDetails = useRecoilValue(activeSubmissionResultSelector);
  const {
    statusDesc,
    createdAt,
    testCasesPassed,
    problem,
    lastTestCase,
    stdout,
  } = submissionDetails;
  return (
    <div className="p-4 text-[#CCC]">
      <span className="text-xl font-bold text-red-800">{statusDesc}</span>
      &nbsp; &nbsp;
      <span className="text-sm text-gray-500">
        | &nbsp; &nbsp;
        {testCasesPassed}/{problem.testcases.length} testcases passed
      </span>
      <SubmissionCreatedAt createdAt={createdAt} />
      <div className="my-8 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <span className="text-gray-300">Input</span>
          <div
            className="flex flex-col gap-1 rounded-lg  bg-gray-600 px-3 py-2"
          >
            <span className="text-sm font-medium">{lastTestCase.input}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-gray-300">Output</span>
          <div className="flex flex-col gap-1 rounded-lg  bg-gray-600 px-3 py-2">
            <span className="text-sm font-medium">{stdout}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-gray-300">Expected</span>
          <div className="flex flex-col gap-1 rounded-lg border  bg-gray-600 px-3 py-2">
            <span className="text-sm font-medium">
              {lastTestCase.output}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WrongSubmissionResult;
