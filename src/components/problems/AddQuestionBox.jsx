import React from "react";
import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";

const AddQuestionBox = () => {
  return (
    <section className="sm:max-w-[467px] max-sm:w-full px-4 py-3 bg-third  rounded-xl">
      <div className="flex flex-col space-y-6 items-start p-2">
        <h1 className="text-gray-300  font-semibold">
          Are you confident enough to frame the question from your own and
          challenge others ?{" "}
        </h1>
        <Link
          to='/addQuestion'
          className={buttonVariants({
            className: "w-full px-4 py-1 xl:text-lg text-black"
          })}
        >
          Hell Yes ! I want to add a question.
        </Link>
        <p>
          no ? <span className="text-yellow-800">try your luck solving some questions</span>
        </p>
      </div>
    </section>
  );
};

export default AddQuestionBox;
