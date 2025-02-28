import React, { useEffect, useState } from "react";
import { createActor } from "../utils/CanisterConfig";
import BigNumber from 'bignumber.js';

type Result_2 = { Ok: bigint | number } | { Err: string };

const GetTotalTVL = () => {
  const [loading, setLoading] = useState(true);
  const [tvlValue, setTvlValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const ETH_DECIMALS = 18; //(1 ether = 10^18 wei)

  useEffect(() => {
    const testConnection = async () => {
      try {
        const actor = await createActor();

        if (!actor || typeof actor.getTotalTVL !== "function") {
          throw new Error("The method 'getTotalTVL' does not exist on the canister actor.");
        }

        const result = await actor.getTotalTVL() as Result_2;
        console.log("total tvl", result);

        if ("Ok" in result) {
          const tvlBN = new BigNumber(result.Ok.toString());
          
          const etherValue = tvlBN.dividedBy(new BigNumber(10).pow(ETH_DECIMALS));
          
          const formattedEther = etherValue.toFormat(6);
          
          setTvlValue(`${formattedEther} BTC`);
          setLoading(false);
        } else {
          setError(`Error: ${result.Err}`);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error in useEffect:", error);
        setError("Failed to connect to the canister. Please check your configuration.");
        setLoading(false);
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
        {loading ? (
          <div className="ml-2">
            <div className="h-24 w-24 border-2 border-t-teal-400 border-r-teal-400 border-b-transparent border-l-transparent rounded-full animate-spin ml-4"></div>
          </div>
        ) : error ? (
          <span className="font-bold text-2xl text-red-500 ml-2">
            {error}
          </span>
        ) : (
          <span className="font-bold text-2xl text-white ml-2">
            {tvlValue}
          </span>
        )}
      </div>
    </div>
  );
};

export default GetTotalTVL;