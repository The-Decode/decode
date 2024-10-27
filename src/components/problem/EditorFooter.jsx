import { ChevronUp } from "lucide-react";
import React from "react";

const EditorFooter = ({ handleSubmit }) => {
  return (
    <div className="absolute bottom-0 z-10 flex w-full bg-third">
      <div className="mx-5 my-[1px] flex w-full justify-between">
        {/* <div className='mr-2 flex flex-1 flex-nowrap items-center space-x-4'>
					<button className='px-3 py-1.5 font-medium items-center transition-all inline-flex bg-dark-fill-3 text-sm hover:bg-dark-fill-2 text-dark-label-2 rounded-lg pl-3 pr-2'>
						Console
						<div className='ml-1 transform transition flex items-center'>
							<ChevronUp className='fill-gray-6 mx-1 fill-dark-gray-6' />
						</div>
					</button>
				</div> */}
        <div className="ml-auto flex items-center space-x-4">
          <button
            className="inline-flex items-center whitespace-nowrap rounded-lg bg-green-500 px-6 py-1 text-sm font-medium text-black transition-all hover:bg-green-600 focus:outline-none"
            onClick={handleSubmit}
          >
            Run
          </button>
          <button
            className="inline-flex items-center rounded-lg bg-red-500 px-5 py-1 text-sm font-medium text-black transition-all hover:bg-red-600 focus:outline-none"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditorFooter;
