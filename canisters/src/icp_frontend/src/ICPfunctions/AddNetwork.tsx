import React, { useState } from "react";
import { createActor } from '../utils/CanisterConfig';

const AddNewNetwork = () => {
  const [statusMessage, setStatusMessage] = useState("Click the button to add a new network.");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddNetwork = async () => {
    setIsLoading(true);
    setStatusMessage("Creating network...");

    try {
      console.log("Starting to create actor...");
      const actor = await createActor();
      console.log("Actor created:", actor);

      // Prepare the data for the new network
      const newNetwork = {
        vault_contract: "0x00b7425D9de87D30bA47370dc56e8086f4c65FF7",
        name: "BQ BTC Merlin",
        gov_address: "0x0000000000000000000000000000000000000000",
        evm_pool_contract_address: "0x6742C558D61163D1Dc0eF3BbdF146164B4BE7B90",
        cover_address: "0x2e6f6080F7EaB18f67353BCcfA7f9248218Ba457",
        rpc_url: "https://testnet-rpc.merlinchain.io",
        supported_assets: [
          "0xD34E6191A859Dcd50842E3E6283C6Ca83828A073",
          "0x0000000000000000000000000000000000000000"
        ],
        chain_id: BigInt(686868)
      };

      // Call the backend method `addNewNetwork`
      const result = await actor.addNewNetwork(
        newNetwork.rpc_url,
        newNetwork.chain_id,
        newNetwork.name,
        newNetwork.supported_assets,
        newNetwork.evm_pool_contract_address,
        newNetwork.gov_address,
        newNetwork.cover_address,
        newNetwork.vault_contract
      ) as { Ok?: boolean; Err?: string };
      console.log("Result from addNewNetwork:", result);

      if ("Ok" in result) {
        setStatusMessage("Network added successfully!");
      } else {
        setStatusMessage(`Error from backend: ${result.Err}`);
      }
    } catch (error) {
      console.error("Error in handleAddNetwork:", error);
      setStatusMessage("Failed to connect to the canister.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-28">
      <div>
        <span className="font-semibold text-xl bg-gradient-to-r from-teal-200 to-teal-500 bg-clip-text text-transparent">
          Network Addition Status: 
        </span>
        <span className="font-bold text-2xl text-white">{statusMessage}</span>
      </div>
      <button
        onClick={handleAddNetwork}
        disabled={isLoading}
        className={`mt-4 px-6 py-2 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Creating..." : "Add New Network"}
      </button>
    </div>
  );
};

export default AddNewNetwork;