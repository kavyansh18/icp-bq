import React, { useEffect, useState } from "react";
import { createActor } from "../utils/CanisterConfig";

const GetCanisterAddress = () => {
  const [statusMessage, setStatusMessage] = useState("Checking connection...");

  useEffect(() => {
    const fetchCanisterAddress = async () => {
      try {
        console.log("Starting to create actor...");

        const actor = await createActor();
        if (!actor || typeof actor.getCanisterAddress !== "function") {
          throw new Error("The method 'getCanisterAddress' does not exist on the canister actor.");
        }

        console.log("Actor created successfully.");

        // Call the backend method `getCanisterAddress`
        const result = await actor.getCanisterAddress();
        console.log("Result from getCanisterAddress:", result);

        if (result && typeof result === "object" && "Ok" in result) {
          setStatusMessage(result.Ok as string);
        } else if (result && typeof result === "object" && "Err" in result) {
          setStatusMessage(`Error from backend: ${result.Err}`);
        } else {
          setStatusMessage("Unexpected response from the canister.");
        }
      } catch (error) {
        console.error("Error in useEffect:", error);
        setStatusMessage("Failed to connect to the canister. Please check your configuration.");
      }
    };

    fetchCanisterAddress();
  }, []);

  return (
    <div className="flex justify-center items-center mt-16">
      <div>
        <span className="font-semibold text-lg bg-gradient-to-r from-teal-200 to-teal-500 bg-clip-text text-transparent">
          Canister Address:
        </span>
        <span className="font-bold text-lg text-white ml-2">
          {statusMessage}
        </span>
      </div>
    </div>
  );
};

export default GetCanisterAddress;