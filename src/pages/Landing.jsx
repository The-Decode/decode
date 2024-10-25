import BannerGrids from "@/components/BannerGrids";
import { Faq } from "@/components/Faq";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Logos from "@/components/Logos";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className=''>
      <Navbar /> {/* Container */}
      {/* hero section */}
      <MaxWidthWrapper
        className={clsx(`flex max-w-[] flex-col
      space-y-4 `)}
      >
        <Hero />
        {/* <section
          className="flex w-full items-center justify-center
     px-5 py-32"
        >
          <div className="flex max-w-full flex-row-reverse items-center justify-between gap-10 max-lg:flex-col">
            <div
              className="max-w-[760px] flex-1 shadow-xl shadow-[#2A2A2A]
        md:w-[600px] xl:w-[900px] "
            >
              <img
                src="/assets/home-ss.png"
                alt="homepage-screenshot"
                className="h-full w-full"
              />
            </div>
            <section
              className="flex flex-1 flex-col items-start space-y-4 
        max-lg:items-center "
            >
              <h1 className="flex  w-[370px] flex-col text-[2rem] font-extrabold text-white max-lg:w-full max-lg:text-center lg:text-[2.6rem] xl:w-[700px]">
                A New Way to
                <span className="">Solve Challenges and win rewards</span>{" "}
              </h1>
              <p className="w-[70%] text-foreground text-gray-300 max-lg:w-full max-lg:text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
                magnam inventore rerum nam id beatae!
              </p>
              <Button className="mt-10 px-8 py-4">
                <Link to="/problems">Enter App !</Link>
              </Button>
            </section>
          </div>
        </section> */}
        <Logos />
        {/* components */}
        <BannerGrids />
        {/* faq */}
        <Faq />
        <Footer />
      </MaxWidthWrapper>
    </div>
  );
};

export default Landing;
