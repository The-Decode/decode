import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <div className="w-full border-b border-secondary bg-black/10 py-16">
      <h1 className="pb-8 text-center text-2xl underline">FAQs</h1>
      <main className="mx-auto rounded-md p-4 py-6 md:max-w-[900px] xl:max-w-[1500px]">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-[1.2rem] hover:text-[1.3rem] hover:text-primary xl:text-[1.4rem] xl:hover:text-[1.5rem]">
              How does Code Hive empower developers?
            </AccordionTrigger>
            <AccordionContent>
              Code Hive provides a platform where developers can showcase their
              coding skills, solve real-world problems, and earn rewards for
              their solutions. It helps developers enhance their skills and gain
              recognition in the tech community.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-[1.2rem] hover:text-[1.3rem] hover:text-primary xl:text-[1.4rem] xl:hover:text-[1.5rem]">
              Which Language is Supported ?
            </AccordionTrigger>
            <AccordionContent>
              For Now, we have only Javascript as the only language on the
              Platform. but will be adding in more languages soon!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-[1.2rem] hover:text-[1.3rem] hover:text-primary xl:text-[1.4rem] xl:hover:text-[1.5rem]">
              Are there any fees to participate in challenges?
            </AccordionTrigger>
            <AccordionContent>
              Participation in challenges is generally free, but certain
              sponsored/individual challenges might offer bigger rewards and
              could require a registration fee to ensure serious participation.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-[1.2rem] hover:text-[1.3rem] hover:text-primary xl:text-[1.4rem] xl:hover:text-[1.5rem]">
              How are rewards distributed to participants?
            </AccordionTrigger>
            <AccordionContent>
              Rewards are distributed based on challenge rules set by the
              challenge creators. Typically, rewards are given for solutions
              that meet the challenge criteria.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-[1.2rem] hover:text-[1.3rem] hover:text-primary xl:text-[1.4rem] xl:hover:text-[1.5rem]">
              Can organizations use Code Hive for internal innovation?
            </AccordionTrigger>
            <AccordionContent>
              Yes, companies and educational institutions can use Code Hive to
              run
              internal competitions and challenges to foster innovation and
              team-building among their members. PS: will be rolling out this
              feature in future updates !
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  );
}
