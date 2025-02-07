import React, { useEffect, useState } from "react";
import { createActor } from "../utils/CanisterConfig";

const GetTotalTVL = () => {
  const [statusMessage, setStatusMessage] = useState("Checking connection...");

  useEffect(() => {
    const testConnection = async () => {
      try {
        const actor = await createActor();

        if (!actor || typeof actor.getTotalTVL !== "function") {
          throw new Error("The method 'getTotalTVL' does not exist on the canister actor.");
        }

        // Modify the call to use update method instead of query
        const result = await actor.getTotalTVL({
          updateCall: true  // Add this if your actor configuration supports it
        });

        if (result && typeof result === 'object' && "Ok" in result) {
          setStatusMessage(`${result.Ok}`);
        } else if (result && typeof result === 'object' && "Err" in result) {
          setStatusMessage(`Error from backend: ${result.Err}`);
        } else {
          setStatusMessage("Unexpected response from the canister.");
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
      <div>
        <span className="font-semibold text-xl bg-gradient-to-r from-teal-200 to-teal-500 bg-clip-text text-transparent">
          Total TVL locked in the pools:
        </span>
        <span className="font-bold text-2xl text-white ml-2">
          {statusMessage}
        </span>
      </div>
    </div>
  );
};

export default GetTotalTVL;