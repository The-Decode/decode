import { buttonVariants } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ChevronDown, CircleDollarSign, Code } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Problem = ({
  index,
  id,
  title,
  address,
  difficulty,
  isOpen,
  handleOpen,
  bounty,
  status,
  submissions,
}) => {
  const navigate = useNavigate();

  const clickHandler = (e, id) => {
    e.preventDefault();
    navigate(`/problems/${address}`);
  };

  const isEven = id % 2 === 0;
  return (
    <>
      <TableRow
        className={cn("relative h-16 border-none text-white", {
          "border-none": isOpen,
          "bg-black/50": isEven,
        })}
      >
        <TableCell>
          {status === "Funded" ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CircleDollarSign size={22} className="text-green-600" />
                </TooltipTrigger>
                <TooltipContent className="border-none">
                  <p className="text-gray-300">Funded</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : status === "Unfunded" ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Code size={22} className="text-green-600" />
                </TooltipTrigger>
                <TooltipContent className="border-none">
                  <p className="text-gray-300">Problem is not yet funded</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <></>
          )}
        </TableCell>
        <TableCell className="">{index + 1}</TableCell>
        <TableCell className="hover:text-second">{title}</TableCell>
        <TableCell className="hover:text-second">{difficulty}</TableCell>
        <TableCell className="">
          <Link
            className={buttonVariants({
              variant: "link",
            })}
            to={`${id}`}
          >
            Participate
          </Link>
          <ChevronDown
            className={cn(
              "float-right h-7 w-7 cursor-pointer text-muted-foreground transition-all hover:text-white",
              {
                "-rotate-180": isOpen,
              },
            )}
            onClick={handleOpen}
          />
        </TableCell>
      </TableRow>
      <TableRow
        className={cn(
          "w-full border-b-0 border-t border-gray-600 bg-secondary text-gray-300",
          { hidden: !isOpen },
        )}
      >
        <TableCell className="border-t border-gray-600 bg-black" colSpan={5}>
          <span className="text-md text-second">Bounty Set :{bounty}TRX </span>
          <span className="text-md float-right text-second">
            Total Submissions : {submissions}{" "}
          </span>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Problem;
