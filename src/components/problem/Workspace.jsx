import {
  activeSubmissionIdState,
  fetchSubmissionsLoadingState,
  outputAtom,
  submissionResultState,
} from "@/atoms/problemAtom";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import useWindowSize from "@/hooks/useWindowSize";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import axios from "axios";
import { useState } from "react";
import ReactConfetti from "react-confetti";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Toaster, toast } from "sonner";
import CodeEditor from "./CodeEditor";
import ProblemDescription from "./ProblemDescription";
import SubmitBox from "./SubmitBox";
import TestCasesandResult from "./TestCasesandResult";
import {
  alertAtom,
  submissionErrorAtom,
  tabsSelectorAtom,
  userState,
} from "@/atoms/userAtom";
import { ErrorAlert } from "../ErrorAlert";
import { signMessageWithTimeConstraint } from "@/hooks/SigMessage";

// import TestCasesandResult from "./TestCasesandResult";

const WorkSpace = ({ data, pid, contract }) => {
  const [alert, setAlert] = useRecoilState(alertAtom);
  const [, setSubmissionError] = useRecoilState(submissionErrorAtom);
  let [userCode, setUserCode] = useState();

  let testInput =
    typeof data?.testcases[0].input == "object"
      ? Object.values(data.testcases[0].input).toString()
      : data.testcases[0].input.toString();

  const { width, height } = useWindowSize();
  const [success, setSuccess] = useState(false);
  const { address } = useWallet();

  const [outputState, setOutputState] = useRecoilState(outputAtom);
  const user = useRecoilValue(userState);

  console.log("user : ", data);

  const [submissionProcessing, setSubmissionProcessing] = useState(false);
  const [executionProcessing, setExecutionProcessing] = useState(false);
  const [testcasePassed, setTestcasePassed] = useState(0);
  const setActiveSubmissionId = useSetRecoilState(activeSubmissionIdState);
  const [fetchSubmissionsLoading, setFetchSubmissionsLoading] = useRecoilState(
    fetchSubmissionsLoadingState,
  );
  const setSubmissionResult = useSetRecoilState(submissionResultState);

  const setSelector = useSetRecoilState(tabsSelectorAtom);

  const checkStatus = async (tokens, type) => {
    const token = tokens.map((item) => item.token).join(",");
    setTestcasePassed(0);

    const options = {
      method: "GET",
      url: "https://ce.judge0.com/submissions/" + "/batch?tokens=" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      console.log("res : ", response);

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setOutputState({
          type: type,
          data: response.data.submissions,
          expectedOutput: String(data?.examples[0]?.output).trim(),
        });
        response.data.submissions.map((output) => {
          if (output.status.description == "Accepted") {
            setTestcasePassed((t) => t + 1);
          }
        });

        toast.success(`Compiled Successfully!`, { position: "top-center" });
        return response.data;
      }
    } catch (err) {
      console.log("err", err);
      toast.error(err.message);
    } finally {
      setSubmissionProcessing(false);
      setExecutionProcessing(false);
    }
  };
  const [temp, setTemp] = useState(true); // make sures that the alert pop ups only once.

  const handleSubmit = async () => {
    if (temp) {
      setAlert({
        isOpen: true,
        title: "Verify Your Code Before Submitting",
        description:
          "Please ensure you test your code using the 'Run' button to confirm there are no runtime or syntax errors. This helps prevent unnecessary gas fees due to incorrect submissions.",
      });
      setTemp(false);

      return;
    }

    const txnData = await signMessageWithTimeConstraint();

    if (!txnData?.message) {
      throw new Error("Transaction failed !");
    }

    setSubmissionProcessing(true);
    const amountInSun = data.bounty * 1_000_000;

    // send trx to codehive wallet
    // try {
    //   const transaction =
    //     await window.tronLink.tronWeb.transactionBuilder.sendTrx(
    //       "TTJbVzrWBGfk82ChT61hR8cPdhAhS2FBvK",
    //       amountInSun,
    //       window.tronWeb.defaultAddress.base58,
    //     );

    //   console.log("transactoin : ", transaction);
    // } catch (err) {
    //   console.log("err : ", err);
    //   toast.error("unknown error occured !");
    //   return;
    // }

    const formData = {
      userId: user.id,
      userCode: userCode,
      problemId: pid,
    };
    const options = {
      method: "POST",
      url: import.meta.env.VITE_BACKEND_URL + "/code/submit",
      headers: {
        "Content-Type": "application/json",
        tron_message: txnData.message,
        tron_signature: txnData.signature,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(async function (response) {
        if (response.status === 200) {
          setActiveSubmissionId(response.data.submissionId);

          try {
            const res = await axios.get(
              import.meta.env.VITE_BACKEND_URL +
                `/code/submission/${response.data.submissionId}`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              },
            );
            const data = res.data;

            console.log("data : ", data);

            setSubmissionResult((prev) => ({
              ...prev,
              [response.data.submissionId]: data,
            }));

            if (data.statusDesc == "Accepted") {
              setSuccess(true);
            }
          } catch (err) {
            console.log("Error", err.message);
          }
        }
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setSubmissionProcessing(false);
        toast.error(err.message);
        console.log(error);
      })
      .finally(() => {
        setSubmissionProcessing(false);
        setFetchSubmissionsLoading(false);
        setSelector(2);
      });
  };

  const handleRun = async () => {
    // setProcessing(true);
    setExecutionProcessing(true);

    const getInputString = (args) => {
      let validateArgs = Array.isArray(args) ? args.join(",") : `"${args}"`;
      return `\n

    console.log(${data?.compileFunctionName}(${validateArgs}))
    `;
    };

    const submissions = data.testcases.map((testCase) => {
      let testCaseInput = testCase?.input.startsWith("[")
        ? [testCase.input]
        : String(testCase.input);

      return {
        source_code: btoa(userCode + getInputString(testCaseInput)),
        language_id: 63,
        expected_output: btoa(testCase.output),
      };
    });

    const options = {
      method: "POST",
      url: import.meta.env.VITE_RAPID_API_URL + "/batch",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      },
      data: JSON.stringify({
        submissions,
      }),
    };

    axios
      .request(options)
      .then(function (response) {
        const tokens = response.data;
        checkStatus(tokens, "run");
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        console.log(error);
      });
  };

  //console.log("data : ", data);
  if (success) {
    setTimeout(() => {
      setSuccess(false);
    }, 7000);
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-full rounded-lg border-none"
    >
      <ErrorAlert />
      <Toaster richColors />
      <ResizablePanel defaultSize={50}>
        {/* Problem Description */}
        <ProblemDescription problem={data} pid={pid} contract={contract} />
      </ResizablePanel>
      <ResizableHandle withHandle className="w-[5px] bg-gray-600" />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50}>
            {/* Code Editor */}
            <CodeEditor
              setUserCode={setUserCode}
              userCode={userCode}
              starterCode={data?.defaultCode}
            />
          </ResizablePanel>
          <ResizableHandle withHandle className="w-[5px] bg-gray-600" />
          <ResizablePanel defaultSize={50}>
            {/* Test Cases */}
            <TestCasesandResult
              testcasePassed={testcasePassed}
              problem={data}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <SubmitBox
        handleSubmit={handleSubmit}
        executionLoading={executionProcessing}
        submissionloading={submissionProcessing}
        handleRun={handleRun}
        problem={data}
      />
      {success && (
        <ReactConfetti
          gravity={0.3}
          tweenDuration={4000}
          width={width - 1}
          height={height - 1}
        />
      )}
    </ResizablePanelGroup>
  );
};

export default WorkSpace;
