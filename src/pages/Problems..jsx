import React from "react";
import { cn } from "@/lib/utils";
import ProblemsContainer from "@/components/problems/ProblemsContainer";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
// import AddQuestionBox from "@/components/problems/AddQuestionBox";

const Problems = () => {
  return (
    <main className="dark relative min-h-screen w-full bg-gradient-to-br from-[#0f0f0f] to-background pb-4">
      <Navbar className={"wrapper"} dropdown={true} />
      <MaxWidthWrapper className="flex items-start justify-between gap-10 py-16 max-lg:flex-col">
        <ProblemsContainer />
        {/* <AddQuestionBox /> */}
      </MaxWidthWrapper>
      <Footer className={cn("absolute bottom-0")} />
      <Toaster />
    </main>
  );
};

export default Problems;
