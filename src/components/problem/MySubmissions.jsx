import { Clock4, Cpu } from "lucide-react";
import { useSetRecoilState } from "recoil";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  activeSubmissionIdState,
  fetchSubmissionsLoadingState,
} from "@/atoms/problemAtom";
import { useGetMySubmissions } from "@/hooks/getSubmissions";

function getTimeFromDateTime(dateTime) {
  const now = new Date();
  const createdTime = new Date(dateTime);
  const diffInMs = now.getTime() - createdTime.getTime();

  // Handle edge cases for "just now" and "a minute ago"
  if (diffInMs < 60000) {
    // Less than a minute
    return "just now";
  } else if (diffInMs < 120000) {
    // Between 1 and 2 minutes
    return "a minute ago";
  }

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days === 1) {
    return "yesterday";
  } else if (days > 1) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(dateTime);
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  }
}

const SubmissionList = ({ pid }) => {
  const setActiveSubmissionId = useSetRecoilState(activeSubmissionIdState);
  const setFetchSubmissionsLoading = useSetRecoilState(
    fetchSubmissionsLoadingState,
  );

  const submissions = useGetMySubmissions(pid);

  if (submissions) {
    return (
      <div className="p-4 text-[#CCC]">
        {submissions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Status</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Runtime</TableHead>
                <TableHead>Memory</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map(
                ({
                  id,
                  statusDesc,
                  statusId,
                  memoryUsage,
                  runtime,
                  language,
                  createdAt,
                }) => {
                  return (
                    <TableRow
                      key={id}
                      className="cursor-pointer"
                      onClick={() => {
                        setActiveSubmissionId(id);
                        setFetchSubmissionsLoading(true);
                      }}
                    >
                      <TableCell className="font-medium">
                        <div
                          className={`font-bold ${statusId > 3 ? "text-red-800" : "text-[#0E902A]"}`}
                        >
                          {statusDesc}
                        </div>
                        <div className="mt-1 text-xs">
                          {getTimeFromDateTime(createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-min rounded-full bg-gray-600 px-2 py-1 text-xs">
                          Javascript
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock4 size={16} />
                          <span>{runtime} ms</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <div className="flex items-center gap-1">
                          <Cpu size={16} />
                          <span>{Math.floor(memoryUsage / 1024)} MB</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                },
              )}
            </TableBody>
          </Table>
        ) : (
          <>No Submission Yet!</>
        )}
      </div>
    );
  }
};

export default SubmissionList;
