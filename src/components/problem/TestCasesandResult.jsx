import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { outputAtom } from "../../atoms/problemAtom";

const TestCasesandResult = ({ problem, testcasePassed }) => {
  const [, setLoading] = useState(true);

  const [activeTestCaseId, setActiveTestCaseId] = useState(0); // indexing for testcases from the problem;
  const [innerNavs, setInnerNavs] = useState(["TestCases"]);
  const [activeBar, setActiveBar] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [statusId, setStatusId] = useState(null);

  const output = useRecoilValue(outputAtom);
  const outputState = output?.data;

  const openTestCases = problem.testcases.filter((el, index) => {
    if (!el.hidden) {
      return el;
    }
  });
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (
      innerNavs.length < 2 &&
      outputState.length > 0 &&
      !innerNavs.includes("Console")
    ) {
      setInnerNavs((prev) => [...prev, "Console"]);
    }
  }, [output, statusId]);

  const getOutputs = () => {
    // setStatusId(outputState[0]?.status?.id);

    return outputState.map((output, index) => {
      let statusId = output?.status?.id;

      if (statusId == 2) {
        return <h1 key={index}>Loading....</h1>;
      }

      if (statusId === 6) {
        // compilation error
        return (
          <pre
            key={index}
            className="bg-[#06090f] px-2 py-1 text-[1.1rem] font-normal text-red-500"
          >
            {atob(output?.compile_output)}
          </pre>
        );
      } else if (statusId === 3 || statusId === 4) {
        return (
          <main key={index} className="w-full max-w-[500px] bg-[#06090f] px-2">
            <section className="border-t border-gray-700">
              <div className="flex flex-col gap-6 px-2 py-4">
                <div className="flex flex-col gap-3">
                  <span className="font-medium text-gray-300">Input</span>
                  {/* {problem.testcases.map((data, index) => {
                            return ( */}
                  <div
                    className="flex flex-col gap-1 rounded-lg bg-[#3D3F41] px-3 py-2 text-white"
                    key={index}
                  >
                    {/* <span className="text-gray-300 text-xs">{argumentNames[index]} = </span> */}
                    <span className="text-sm font-medium">
                      {problem.testcases[index].input}
                    </span>
                  </div>
                  {/* })} */}
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-gray-300">Output</span>
                  <div className="flex flex-col gap-1 rounded-lg bg-[#3D3F41] px-3 py-2 text-white">
                    <span className="text-sm font-medium">
                      {atob(output.stdout)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-gray-300">Expected</span>
                  <div className="flex flex-col gap-1 rounded-lg bg-[#3D3F41] px-3 py-2 text-white">
                    <span className="text-sm font-medium">
                      {problem.testcases[index]?.output}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </main>
        );
      } else {
        return (
          <pre
            key={index}
            className="flex w-full flex-col space-y-2 bg-[#06090f] px-2 py-1 font-normal"
          >
            {output?.stderr.length > 0 ? (
              <div className="flex space-x-2">
                <h2 className="text-red-400">ERROR : </h2>
                <p>{atob(output?.stderr)}</p>
              </div>
            ) : (
              <div>{atob(output?.message)}</div>
            )}
          </pre>
        );
      }
    });
  };

  return (
    <div className="h-full overflow-auto bg-third px-5 py-2">
      {/* testcase heading */}

      <div className="flex h-10 items-center space-x-6">
        <div
          className={`relative flex h-full cursor-pointer items-center justify-center space-x-4`}
        >
          <div
            onClick={() => setActiveBar(0)}
            className={`pb-2  text-[1rem] font-semibold leading-5
          ${activeBar === 0 ? "border-b text-primary" : "text-gray-500"}
              `}
          >
            {innerNavs[0]}
          </div>
          <div
            onClick={() => setActiveBar(1)}
            className={`pb-2  text-[1rem] font-semibold leading-5
          ${activeBar === 1 ? "border-b text-primary" : "text-gray-500"}
              `}
          >
            {innerNavs[1]}
          </div>
        </div>
      </div>

      {activeBar === 0 ? (
        <section>
          <div className="mt-4 flex rounded-md bg-black">
            {openTestCases.map((example, index) => (
              <div
                className="mr-2 mt-2 items-start "
                key={index}
                onClick={() => setActiveTestCaseId(index)}
              >
                <div className="flex flex-wrap items-center gap-y-4">
                  <div
                    className={`bg-dark-fill-3 hover:bg-dark-fill-2 relative inline-flex cursor-pointer items-center whitespace-nowrap rounded-lg px-4 py-1 font-medium transition-all focus:outline-none
										${activeTestCaseId === index ? "text-white" : "text-gray-500"}
									`}
                  >
                    Case {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Output Section */}
          <div className="my-4 font-semibold">
            <p className="mt-4 text-sm font-medium text-white">Input:</p>
            <div className="mt-2 w-full cursor-text rounded-lg border border-transparent bg-gray-400/20 px-3 py-[10px] text-white">
              {typeof problem.testcases[activeTestCaseId].input === "object"
                ? // login here to manage multiple object with
                  typeof Object.values(
                    problem.testcases[activeTestCaseId]?.input,
                  )[0] == "string"
                  ? Object.values(
                      problem.testcases[activeTestCaseId]?.input,
                    )[0].toString()
                  : "[" +
                    Object.values(
                      problem.testcases[activeTestCaseId]?.input,
                    )[0].toString() +
                    "]"
                : problem.testcases[activeTestCaseId].input.toString()}
            </div>
            <p className="mt-4 text-sm font-medium text-white">Output:</p>
            <div className="mt-2 w-full cursor-text rounded-lg border border-transparent bg-gray-400/20 px-3 py-[10px] text-white">
              {problem.testcases[activeTestCaseId].output.toString()}
            </div>
          </div>
        </section>
      ) : (
        <div className="h-[90%] rounded-md border border-gray-700 bg-[rgb(30,30,30)] text-white">
          <div className="flex h-[90%] flex-col space-x-1 p-5">
            <h1 className="text-gray-200">Output : </h1>
            {outputState[0]?.status?.id === 3 ||
            outputState[0]?.status?.id === 4 ? (
              <p className="text-green-400">
                {problem.testcases.length}/{testcasePassed} TestCases Passed
              </p>
            ) : null}
            <div className="mt-4 max-h-full w-full overflow-y-auto rounded-md text-sm font-normal text-white">
              {outputState ? (
                <div className="flex w-full flex-col space-y-2">
                  <section className="">{getOutputs()}</section>
                  {/* temp */}
                </div>
              ) : null}
            </div>
          </div>

          {/* output details :  */}
          <div
            className="ml-5 mt-4 flex items-center space-x-3 text-gray-300 hover:text-white"
            onClick={() => setShowDetails((prev) => !prev)}
          >
            <h3>Output Details</h3>
            {showDetails ? <ChevronUp /> : <ChevronDown />}
          </div>

          {showDetails ? (
            <div className="metrics-container ml-10 mt-4 flex flex-col space-y-3">
              {output?.type == "run" && (
                <>
                  <p className="text-sm">
                    ExpectedOutput:{" "}
                    <span className="ml-1 rounded-md bg-black/30 px-2 py-1 font-semibold">
                      {output?.expectedOutput}
                    </span>
                  </p>
                  {/* <p className="text-sm">
                    Status:{" "}
                    <span className="ml-1 rounded-md bg-black/30 px-2 py-1 font-semibold">
                      {outputState?.status?.description}
                    </span>
                  </p> */}
                </>
              )}

              <p className="text-sm">
                Memory:{" "}
                <span className="ml-1 rounded-md bg-black/30 px-2 py-1 font-semibold">
                  {outputState?.memory}
                </span>
              </p>
              <p className="text-sm">
                Time:{" "}
                <span className="ml-1 rounded-md bg-black/30 px-2 py-1 font-semibold">
                  {outputState?.time}
                </span>
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default TestCasesandResult;
