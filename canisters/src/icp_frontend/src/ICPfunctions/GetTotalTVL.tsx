import React, { useEffect, useState } from "react";
import { createActor } from "../utils/CanisterConfig";

type Result_2 = { Ok: bigint | number } | { Err: string };

const GetTotalTVL = () => {
  const [statusMessage, setStatusMessage] = useState("Checking connection...");

  useEffect(() => {
    const testConnection = async () => {
      try {
        const actor = await createActor();

        if (!actor || typeof actor.getTotalTVL !== "function") {
          throw new Error("The method 'getTotalTVL' does not exist on the canister actor.");
        }

        const result = await actor.getTotalTVL() as Result_2;

        if ("Ok" in result) {
          const tvlValue = typeof result.Ok === 'bigint' 
            ? Number(result.Ok) / 1e8 
            : result.Ok;
          setStatusMessage(`${tvlValue.toLocaleString()}`);
        } else {
          setStatusMessage(`Error: ${result.Err}`);
        }
      } catch (error) {
        console.error("Error in useEffect:", error);
        setStatusMessage("Failed to connect to the canister. Please check your configuration.");
      }
    };

    testConnection();
  }, []);

  return (
    <div className="flex justify-center items-center mt-28">
      <div className="flex flex-row items-center gap-3">
        <span className="font-semibold text-xl bg-gradient-to-r from-teal-200 to-teal-500 bg-clip-text text-transparent">
          Total Value Locked: 
        </span>
        <span className="font-bold text-2xl text-white ml-2">
          {statusMessage}
        </span>
      </div>
    </div>
  );
};

export default GetTotalTVL;