const SubmissionCreatedAt = ({ createdAt }) => {
  return (
    <div className="mt-2 text-xs">
      submitted at{" "}
      {new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(createdAt))}
    </div>
  );
};

export default SubmissionCreatedAt;
