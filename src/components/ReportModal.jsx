import { X } from "lucide-react";
import { useState } from "react";
import Modal from "./ui/Modal";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Toaster, toast } from "sonner";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";

const ReportModal = () => {
  const [open, setOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const { pid } = useParams();

  const { address } = useWallet();

  const toggleModal = () => setOpen(!open);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("custom : ", customReason);
    try {
      const docRef = await addDoc(collection(db, "Reports"), {
        reason: reportReason === "custom" ? customReason : reportReason,
        userAddress: address,
        problemId: pid || "not provided!",
      });
      toast.success("Report submitted with Id : " + docRef.id);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    toggleModal(); // Close the modal on submit
  };

  return (
    <div className="min-h-screen  text-gray-100">
      <Toaster />
      <Button
        variant="destructive"
        className="absolute xl:bottom-10 bottom-6 z-50 h-[35px] cursor-pointer border border-gray-700 px-5 text-white"
        onClick={toggleModal}
      >
        Report
      </Button>
      <Modal open={open} onClose={toggleModal}>
        <div className="flex w-[400px] flex-col space-y-4 p-5">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-lg font-semibold">
              Select a reason for reporting:
            </h2>
            <X
              className="h-[25px] w-[25px] cursor-pointer rounded-full text-primary hover:text-white"
              onClick={() => toggleModal()}
            />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <select
              id="reportReason"
              className="form-select mt-1 block w-full rounded-md bg-[#242424] p-1 pl-4 shadow-sm outline-none"
              onChange={(e) => setReportReason(e.target.value)}
            >
              <option value="">Select a reason...</option>
              <option value="invalid-io">Input/output is invalid</option>
              <option value="irrelevant-description">
                Description is irrelevant to the question
              </option>
              <option value="invalid-test-cases">Test cases are invalid</option>
              <option value="custom">Other (Please Specify)</option>
            </select>

            {reportReason === "custom" && (
              <div>
                <label htmlFor="customReason">Please provide details:</label>
                <textarea
                  id="customReason"
                  className="form-textarea mt-1 block w-full rounded-md border-gray-600 bg-[#242424] px-4 py-1 shadow-sm"
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="Type your report details here..."
                />
              </div>
            )}

            <button
              type="submit"
              className="mt-4 rounded bg-primary px-4 py-1 text-white"
            >
              Submit Report
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ReportModal;
