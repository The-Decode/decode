import { BugPlay, DollarSign, Play, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const BannerGrids = () => {
  const Navigate = useNavigate();
  return (
    <main className="flex w-full flex-col items-center justify-center border-b border-secondary p-5 py-20">
      <div className="mx-auto flex flex-col items-center pb-20">
        <h1 className="text-[3rem] font-semibold">
          For Challengers and Hackers !
        </h1>
      </div>
      <div
        className="mx-auto
            grid max-w-[1500px] grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-2"
      >
        <div className="col-span-1 space-y-4 rounded-md bg-black/30 p-8 sm:col-span-2 lg:col-span-1">
          <div className="flex items-start border-b border-gray-800 py-2">
            <BugPlay size={50} className="mr-3 rounded-full  text-primary " />
            <h2 className="mb-2 text-2xl font-bold">Innovative Challenges</h2>
          </div>
          <p className="mb-4">
            Code Hive is the pioneering platform on the Tron blockchain,
            offering developers unique challenges to showcase and enhance their
            skills, while solving coding problems that integrate blockchain
            technology.
          </p>
          <Button
            variant="outline"
            className="rounded-md px-4 py-2 "
            onClick={() => Navigate("/problems")}
          >
            Explore Challenges
          </Button>
        </div>
        <div className="col-span-1 space-y-4 rounded-md bg-black/30 p-8 sm:col-span-2 lg:col-span-1">
          <div className="flex items-start border-b border-gray-800 py-2">
            <Users size={50} className="mr-3 rounded-full  text-primary " />
            <h2 className="mb-2 text-2xl font-bold">Community Collaboration</h2>
          </div>
          <p className="mb-4">
            Join a thriving community of developers, businesses, and tech
            enthusiasts. Collaborate, share knowledge, and push the boundaries
            of what’s possible with blockchain technology and coding.
          </p>
          <Button
            variant="outline"
            className="rounded-md px-4 py-2 "
            onClick={() => {
              window.open(
                "https://forum.trondao.org/t/codehive-crack-the-code-reap-the-rewards/23646",
                "_blank",
              );
            }}
          >
            Join Our Community
          </Button>
        </div>
        <div className="col-span-1 space-y-4 rounded-md bg-black/30 p-8 sm:col-span-2 lg:col-span-1">
          <div className="flex items-start border-b border-gray-800 py-2">
            <Play size={50} className="mr-3 rounded-full  text-primary " />
            <h2 className="mb-2 text-2xl font-bold">Engage in Contests</h2>
          </div>
          <p className="mb-4">
            Dive into regular contests and hackathons that challenge your skills
            and offer substantial rewards. Stay tuned for updates and upcoming
            events that keep the coding excitement alive.
          </p>
          <Button
            variant="outline"
            className="rounded-md px-4 py-2 "
            onClick={() => {
              window.open("https://twitter.com/Codehive01", "_blank");
            }}
            disabled={true}
          >
            Upcoming Events
          </Button>
        </div>
        <div className="col-span-1 space-y-4 rounded-md bg-black/30 p-8 sm:col-span-2 lg:col-span-1">
          <div className="flex items-start border-b border-gray-800 py-2">
            <DollarSign
              size={50}
              className="mr-3 rounded-full  text-primary "
            />
            <h2 className="mb-2 text-2xl font-bold">Earn Rewards</h2>
          </div>
          <p className="mb-4">
            Earn rewards in TRX for your achievements on the platform. The
            harder the challenges, the greater the rewards—fuel your coding
            journey with tangible incentives.
          </p>
          <Button
            variant="outline"
            className="rounded-md px-4 py-2 "
            onClick={() => {
              window.open(
                "https://forum.trondao.org/t/codehive-crack-the-code-reap-the-rewards/23646",
                "_blank",
              );
            }}
          >
            Learn More About Rewards
          </Button>
        </div>
      </div>
    </main>
  );
};

export default BannerGrids;
