import React, { useState } from "react";
import { createActor } from "../utils/CanisterConfig";
import { Principal } from "@dfinity/principal";

const SetOwner = () => {
  const [statusMessage, setStatusMessage] = useState("Click the button to set a new owner for the network.");
  const [isLoading, setIsLoading] = useState(false);
  const [newOwner, setNewOwner] = useState("bkyz2-fmaaa-aaaaa-qaaaq-cai");

  const handleSetOwner = async () => {
    if (!newOwner) {
      setStatusMessage("Please provide a valid principal.");
      return;
    }

    setIsLoading(true);
    setStatusMessage("Setting new owner...");

    try {
      console.log("Creating actor...");
      const actor = await createActor();
      console.log("Actor created:", actor);

      // Ensure valid Principal conversion
      const principalOwner = Principal.fromText(newOwner);
      console.log("Formatted Principal:", principalOwner.toText());

      // Call the backend method `setOwner`
      const result = (await actor.setOwner(principalOwner)) as { Ok?: any; Err?: any };
      console.log("Result from setOwner:", result);

      if ("Ok" in result) {
        setStatusMessage(`New owner set successfully: ${principalOwner.toText()}`);
      } else {
        setStatusMessage(`Error: ${result.Err}`);
      }
    } catch (error) {
      console.error("Error in handleSetOwner:", error);
      setStatusMessage("Failed to connect to the canister.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-28">
      <div>
        <span className="font-semibold text-xl bg-gradient-to-r from-teal-200 to-teal-500 bg-clip-text text-transparent">
          Set Network Owner Status:
        </span>
        <span className="font-bold text-2xl text-white">{statusMessage}</span>
      </div>
      <input
        type="text"
        value={newOwner}
        onChange={(e) => setNewOwner(e.target.value)}
        placeholder="Enter new owner principal"
        className="mt-4 px-4 py-2 border rounded-lg text-black"
      />
      <button
        onClick={handleSetOwner}
        disabled={isLoading}
        className={`mt-4 px-6 py-2 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Setting..." : "Set Owner"}
      </button>
    </div>
  );
};

export default SetOwner;
