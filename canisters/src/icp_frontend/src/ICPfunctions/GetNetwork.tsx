import React, { useState } from "react";
import { createActor } from "../utils/CanisterConfig";

const GetNetworks = () => {
  const [statusMessage, setStatusMessage] = useState("Click the button to get the network details.");
  const [isLoading, setIsLoading] = useState(false);

  const handleGetNetwork = async () => {
    setIsLoading(true);
    setStatusMessage("Fetching network details...");

    try {
      console.log("Creating actor...");
      const actor = await createActor();
      console.log("Actor created:", actor);

      // Call the backend method `getNetworks` with chain_id 97
      const chainId = 686868;
      const result = await actor.getNetworks(chainId);
      console.log("Result from getNetworks:", result);

      if (result && typeof result === 'object' && 'Ok' in result) {
        setStatusMessage(`Network details: ${JSON.stringify((result as any).Ok)}`);
      } else {
        setStatusMessage(`Error: ${(result as any)?.Err || "Network not found."}`);
      }
    } catch (error) {
      console.error("Error in handleGetNetwork:", error);
      setStatusMessage("Failed to connect to the canister.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-28">
      <div>
        <span className="font-semibold text-xl bg-gradient-to-r from-teal-200 to-teal-500 bg-clip-text text-transparent">
          Network Status:
        </span>
        <span className="font-bold text-2xl text-white">{statusMessage}</span>
      </div>
      <button
        onClick={handleGetNetwork}
        disabled={isLoading}
        className={`mt-4 px-6 py-2 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Fetching..." : "Get Network"}
      </button>
    </div>
  );
};

export default GetNetworks;
