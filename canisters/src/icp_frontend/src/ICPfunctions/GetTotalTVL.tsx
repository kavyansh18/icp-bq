import React, { useEffect, useState } from "react";
import { createActor } from '../utils/CanisterConfig';

const GetTotalTVL = () => {
  const [statusMessage, setStatusMessage] = useState("Checking connection...");

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log("Starting to create actor...");
        const actor = await createActor();
        console.log("Actor created:", actor);

        // Call the backend method `getTotalTVL`
        const result = await actor.getTotalTVL() as { Ok?: number; Err?: string };
        console.log("Result from getTotalTVL:", result);

        if ("Ok" in result) {
          setStatusMessage(`${result.Ok}`);
        } else {
          setStatusMessage(`Error from backend: ${result.Err}`);
        }
      } catch (error) {
        console.error("Error in useEffect:", error);
        setStatusMessage("Failed to connect to the canister.");
      }
    };

    testConnection();
  }, []);

  return (
    <div className="flex justify-center items-center mt-28">
      <div><span className="font-semibold text-xl bg-gradient-to-r from-teal-200 to-teal-500 bg-clip-text text-transparent">Total TVL locked in the pools: </span><span className="font-bold text-2xl text-white">{statusMessage}</span></div>
    </div>
  );
};

export default GetTotalTVL;
