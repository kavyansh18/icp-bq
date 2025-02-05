import React, { useState } from "react";
import { createActor } from "../utils/CanisterConfig";

const GetOwner = () => {
  const [statusMessage, setStatusMessage] = useState("Click the button to get the owner of the network.");
  const [isLoading, setIsLoading] = useState(false);

  const handleGetOwner = async () => {
    setIsLoading(true);
    setStatusMessage("Fetching owner...");

    try {
      console.log("Creating actor...");
      const actor = await createActor();
      console.log("Actor created:", actor);

      // Call the backend method `getOwner`
      const result = await actor.getOwner();
      console.log("Result from getOwner:", result);

      if (result) {
        setStatusMessage(`Owner principal: ${result}`);
      } else {
        setStatusMessage("Owner not found.");
      }
    } catch (error) {
      console.error("Error in handleGetOwner:", error);
      setStatusMessage("Failed to connect to the canister.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-28">
      <div>
        <span className="font-semibold text-xl bg-gradient-to-r from-teal-200 to-teal-500 bg-clip-text text-transparent">
          Network Owner Status:
        </span>
        <span className="font-bold text-2xl text-white">{statusMessage}</span>
      </div>
      <button
        onClick={handleGetOwner}
        disabled={isLoading}
        className={`mt-4 px-6 py-2 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Fetching..." : "Get Owner"}
      </button>
    </div>
  );
};

export default GetOwner;
