import React, { useEffect, useState } from "react";
import { createActor } from "../utils/CanisterConfig";

type Result_3 = { Ok: bigint | number } | { Err: string };

const GetTotalTVL = () => {
  const [networkTVL, setNetworkTVL] = useState("Checking network TVL...");

  useEffect(() => {
    const fetchNetworkTVL = async () => {
      try {
        const actor = await createActor();

        if (!actor || typeof actor.getNetworkTVL !== "function") {
          throw new Error("The method 'getNetworkTVL' does not exist on the canister actor.");
        }

        const rpcUrl = "https://testnet-rpc.merlinchain.io";
        const chainId = 686868;
        
        const result = await actor.getNetworkTVL(rpcUrl, chainId) as Result_3;
        console.log("Network TVL Result:", result);
        
        if ("Ok" in result) {
          const networkTvlValue = typeof result.Ok === 'bigint'
            ? Number(result.Ok) / 1e8
            : result.Ok;
          setNetworkTVL(`${networkTvlValue.toLocaleString()}`);
        } else {
          setNetworkTVL(`Error: ${result.Err}`);
        }

      } catch (error) {
        console.error("Error fetching network TVL:", error);
        setNetworkTVL("Failed to fetch network TVL. Please check your configuration.");
      }
    };

    fetchNetworkTVL();
  }, []);

  return (
    <div className="flex justify-center items-center mt-2">
      <div className="flex flex-row items-center gap-3">
        <span className="font-semibold text-xl bg-gradient-to-r from-teal-200 to-teal-500 bg-clip-text text-transparent">
          Network TVL: 
        </span>
        <span className="font-bold text-2xl text-white ml-2">
          {networkTVL}
        </span>
      </div>
    </div>
  );
};

export default GetTotalTVL;