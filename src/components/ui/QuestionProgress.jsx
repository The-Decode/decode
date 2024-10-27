import { questionAddStatus } from "@/atoms/problemAtom";
import useDeployQuestion from "@/hooks/useDeployQuestion";
import React, { useEffect, useRef, useState } from "react";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

const QuestionProgress = () => {
  const { deployAddress } = useDeployQuestion();
  const [stateOfTransaction, setStateOfTransaction] =
    useRecoilState(questionAddStatus);

  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({ marginLeft: 0, marginRight: 0 });
  const navigate = useNavigate();

  const steps = [
    {
      name: "Question Deployment",
      Component: () => <div>Please sign the question deploy contract</div>,
    },
    {
      name: "Signin to the bank address",
      Component: () => <div>Please sign in to the bank address</div>,
    },
    {
      name: "Question Deployed Successfully",
      Component: () => <div>Deployed Succesfully ✅</div>,
    },
  ];

  const stepRef = useRef([]);

  useEffect(() => {
    if (stateOfTransaction >= 3) {
      setIsComplete(true);
      setTimeout(() => {
        navigate("/problems");
        setStateOfTransaction(-1);
      }, 2000);
    }
  }, [stateOfTransaction, navigate]);

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0]?.offsetWidth / 2 || 0,
      marginRight: stepRef.current[steps.length - 1]?.offsetWidth / 2 || 0,
    });
  }, [stateOfTransaction, steps.length]);

  if (!steps.length) {
    return null;
  }

  const calculateProgressBarHeight = () => {
    if (stateOfTransaction >= 3) {
      return 100;
    }

    return (stateOfTransaction / (steps.length - 1)) * 100;
  };

  const ActiveComponent = steps[stateOfTransaction - 1]?.Component;

  if (stateOfTransaction < 0) {
    return;
  }

  return (
    <main className="absolute inset-x-0 z-10 flex h-full justify-center bg-white/10 py-8 backdrop-blur-lg">
      <section className="relative z-30 m-10 mt-24 flex h-max">
        <div className="relative flex flex-col justify-start space-y-20">
          {steps.map((step, index) => (
            <div
              key={step.name}
              ref={(el) => (stepRef.current[index] = el)}
              className={`z-30 flex items-center justify-start space-x-8 ${
                stateOfTransaction > index || isComplete ? "complete" : ""
              } ${stateOfTransaction === index + 1 ? "active" : ""}`}
            >
              <div className="step-number text-2xl">
                {stateOfTransaction > index + 1 || isComplete ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="font-sans text-[1.8rem] font-semibold">
                {step.name}
              </div>
            </div>
          ))}
        </div>

        <div
          className="absolute left-6 z-20 mt-2 w-[4px] bg-gray-500"
          style={{
            width: "2px",
            height: `calc(100% - 20px)`,
          }}
        >
          <div
            className="progress"
            style={{ height: `${calculateProgressBarHeight()}%` }}
          ></div>
        </div>
      </section>

      {ActiveComponent && (
        <div className="absolute bottom-20 z-20 flex w-full animate-pulse justify-center py-5 text-gray-100">
          <ActiveComponent />
        </div>
      )}
    </main>
  );
};

export default QuestionProgress;
