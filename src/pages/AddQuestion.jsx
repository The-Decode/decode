
import ProblemForum from "@/components/AddProblemForm";
import Navbar from "@/components/Navbar";

const AddQuestion = () => {
  //hook to deploy...

  return (
    <main className="h-screen bg-black">
      <Navbar className={"wrapper"} dropdown={true} />

      {/* <MaxWidthWrapper className=" mt-[200px] flex items-center justify-center"> */}
      <ProblemForum />
      {/* <ComingSoon /> */}
      {/* </MaxWidthWrapper> */}
    </main>
  );
};

export default AddQuestion;
