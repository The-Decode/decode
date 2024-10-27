import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AllSubmissions({ contract, claimer, loader }) {
  const [codes, setCodes] = useState([]);
  useEffect(() => {
    loader(true);
    //fetching the codes...via the contract...
    contract
      .allCodes()
      .call()
      .then((res) => {
        console.log(res);
        //sort here...
        res.sort(
          (a, b) =>
            parseInt(a.submitTime._hex, 16) - parseInt(b.submitTime._hex, 16),
        );
        setCodes(res);
        loader(false);
      })
      .catch((error) => {
        console.error(error);
        loader(false);
      });
  }, []);
  return (
    <div className="h-[calc(100vh-94px)] w-full overflow-y-hidden px-0 py-4">
      <div className="px-5">
        <div className="flex w-full flex-col gap-4">
          <div className="flex space-x-4">
            <div className="mr-2 flex text-xl font-medium text-white">
              All Submissions Here:
            </div>
          </div>
        </div>
        {codes && codes.length > 0 ? (
          <Accordion
            type="single"
            collapsible
            className="flex w-full flex-col gap-3 p-4"
          >
            {codes.map((code, index) => (
              <Code key={index} index={index} item={code} />
            ))}
          </Accordion>
        ) : (
          <div className="">
            <div className="text-xl text-gray-500">
              No Code submitted Yet....
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const fetchTHeData = async (url, fxn) => {
  if (url == "") {
    //default case baby man...
    url = "bafkreib4sbyv6qwkrdpukntyv34c2qb6qqqwjr53rp4dezm4i56q4m4vsi";
    console.error("Im showing a default code cause my code was blure....");
  }
  const URL = import.meta.env.VITE_PINATA_URL + url;

  var myHeaders = new Headers();
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const data = await (await fetch(URL, requestOptions)).text();
  fxn(JSON.parse(data).code);
};

function Code({ item, index }) {
  console.log(item);
  const [code, setCode] = useState("Loading...");
  useEffect(() => {
    fetchTHeData(item[1], setCode);
  }, []);
  return (
    <AccordionItem className="flex-col rounded-[10px]" value={index.toString()}>
      <AccordionTrigger
        className="px-4 
            text-[0.86rem] hover:text-[0.9rem]
            hover:text-primary xl:text-[1.4rem] xl:hover:text-[1.5rem]"
      >
        <div className="flex w-full items-center justify-between">
          <p>
            {"Claimer: " + item[0].slice(0, 4) + "....." + item[0].slice(-6)}
          </p>
          <p>t#_{parseInt(item.submitTime._hex, 16)}</p>
        </div>
      </AccordionTrigger>
      <AccordionContent className="whitespace-pre-wrap rounded-t-[10px] bg-black/20 px-6 py-3">
        {code}
      </AccordionContent>
    </AccordionItem>
  );
}
