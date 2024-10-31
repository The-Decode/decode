import { AlertCircle } from "lucide-react";

import { submissionErrorAtom } from "@/atoms/userAtom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { Button } from "@tronweb3/tronwallet-adapter-react-ui";
import { useRecoilState } from "recoil";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";

export function ErrorAlert({ title, description }) {
  const [submissionError, setSubmissionError] =
    useRecoilState(submissionErrorAtom);

  return (
    <main
      className={cn(
        "absolute z-50 flex h-full w-full justify-center bg-black/20",
        !submissionError?.isError && "hidden",
      )}
    >
      <Alert
        variant="destructive"
        className={cn(
          `mt-20 h-[160px] w-[560px] border-primary bg-black shadow-md shadow-gray-800`,
        )}
      >
        <button
          onClick={() => {
            setSubmissionError({
              isError: false,
            });
          }}
          className="absolute bottom-5 left-[40%] rounded-md border px-5 text-center text-primary hover:bg-primary hover:text-white"
        >
          Ok
        </button>
        <AlertCircle className="h-10 w-8" />
        <AlertTitle className="ml-4 text-[1.4rem] font-semibold text-primary/80">
          {"Error"}
        </AlertTitle>
        <AlertDescription className="text-[1.1rem] text-white">
          {submissionError?.message}
        </AlertDescription>
      </Alert>
    </main>
  );
}
