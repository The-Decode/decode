import { Clock4, Cpu } from "lucide-react";
import SubmissionCreatedAt from "./SubmissionCreatedAt.jsx";
import { useRecoilValue } from "recoil";
import { activeSubmissionResultSelector } from "@/atoms/problemAtom";

const SubmissionStats = ({ icon, label, measurement, value }) => {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-md bg-gray-600 p-4">
      <div className="flex items-center gap-1">
        {icon}
        <span>{label}</span>
      </div>
      <div>
        <span className="text-lg font-bold">{value}</span>
        &nbsp;
        <span>{measurement}</span>
      </div>
    </div>
  );
};

const AcceptedSubmissionResult = () => {
  const submissionDetails = useRecoilValue(activeSubmissionResultSelector);
  const { statusDesc, createdAt, runtime, memoryUsage } = submissionDetails;

  const stats = [
    {
      icon: <Clock4 size={16} />,
      label: "Runtime",
      measurement: "ms",
      value: runtime,
    },
    {
      icon: <Cpu size={16} />,
      label: "Memory",
      measurement: "mb",
      value: Math.floor(memoryUsage / 1024),
    },
  ];

  return (
    <div className="p-4">
      <div className="text-xl font-bold text-[#0E902A]">{statusDesc}</div>
      <SubmissionCreatedAt createdAt={createdAt} />
      <div className="my-4 flex w-full items-center gap-4">
        {stats.map((stat) => (
          <SubmissionStats key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default AcceptedSubmissionResult;
