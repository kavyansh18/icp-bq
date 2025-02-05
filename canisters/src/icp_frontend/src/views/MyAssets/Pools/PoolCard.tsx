import Button from "components/common/Button";
import { ICoverContract, InsurancePoolContract } from "constants/contracts";
import useCallContract from "hooks/contracts/useCallContract";
import { ChainType } from "lib/wagmi";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { IPoolInfo } from "types/common";
import { usePoolDeposit } from "hooks/contracts/usePoolDeposit";
import { bnToNumber, numberToBN } from "lib/number";
import { getPoolRiskTypeName } from "lib/utils";
import { createActor } from '../../../utils/CanisterConfig';

type Props = {
  poolDetail: IPoolInfo;
};

const PoolCard: React.FC<Props> = ({ poolDetail }) => {
  const { address, chain } = useAccount();
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWithdrawLoading, setIsWithdrawLoading] = useState<boolean>(false);
  const { callContractFunction } = useCallContract();

  // const handleWithdrawStake = async () => {
  //   setIsWithdrawLoading(true);
  //   setLoadingMessage("Withdrawing...");
  //   const params = [poolDetail.poolId];
  //   console.log("pool params",poolDetail);

  //   try {
  //     await callContractFunction(
  //       InsurancePoolContract.abi,
  //       InsurancePoolContract.addresses[
  //         (chain as ChainType)?.chainNickName
  //       ] as `0x${string}`,
  //       "poolWithdrawal",
  //       params,
  //       0n,
  //       () => {
  //         toast.success("Withdraw succeed");
  //         setLoadingMessage("");
  //         setIsWithdrawLoading(false);
  //       },
  //       () => {
  //         setLoadingMessage("");
  //         setIsWithdrawLoading(false);
  //         toast.success("Failed to withdraw");
  //       }
  //     );
  //   } catch (error) {
  //     setIsWithdrawLoading(false);
  //     console.log("error:", error);
  //   }
  // };

  const handleWithdrawStake = async () => {
    setIsWithdrawLoading(true);
    setLoadingMessage("Withdrawing...");

    try {
      console.log("Starting to create actor...");
      const actor = await createActor();
      console.log("Actor created:", actor);

      // Hardcoded test parameters
      const poolId = BigInt(1); // nat64
      const tokenId = "TOKEN123"; // text
      const decimals = 8; // nat8
      const amount = BigInt(1000000); // nat64

      // Call the backend method `Poolwithdraw`
      const result = await actor.Poolwithdraw(poolId, tokenId, decimals, amount) as { Ok?: any; Err?: string };
      console.log("Result from Poolwithdraw:", result);

      if ("Ok" in result) {
        toast.success("Withdraw succeeded");
        setLoadingMessage("");
      } else {
        toast.error(`Failed to withdraw: ${result.Err}`);
        setLoadingMessage("");
      }
    } catch (error) {
      console.error("Error in withdrawal:", error);
      toast.error("Failed to process withdrawal");
      setLoadingMessage("");
    } finally {
      setIsWithdrawLoading(false);
    }
  };

  const userPoolDeposit = usePoolDeposit(Number(poolDetail?.poolId));

  const handleClaimYeild = async () => {
    if (!poolDetail) return;

    const poolId = Number(poolDetail.poolId);
    console.log("poolDetail:", poolDetail, poolId);

    setIsLoading(true);
    setLoadingMessage("Claiming");
    const params = [poolId];

    try {
      await callContractFunction(
        ICoverContract.abi,
        ICoverContract.addresses[
          (chain as ChainType)?.chainNickName
        ] as `0x${string}`,
        "claimPayoutForLP",
        params,
        0n,
        () => {
          toast.success("Cover purchased!");
          setLoadingMessage("");
          setIsLoading(false);
        },
        () => {
          setLoadingMessage("");
          setIsLoading(false);
          toast.success("Failed purchase");
        }
      );

      // await writeContractAsync({
      //   abi: ICoverContract.abi,
      //   address: ICoverContract.addresses[
      //     (chain as ChainType)?.chainNickName
      //   ] as `0x${string}`,
      //   functionName: "claimPayoutForLP",
      //   args: params,
      // });
    } catch (error) {
      setIsLoading(false);
      console.log("error:", error);
    }
  };

  return (
    <div className="w-full flex items-center justify-between border border-[#6B7280] bg-[#6B72801A] py-24 px-27 rounded-10">
      <div className="bg-[#FFFFFF0D] border border-[#FFFFFF33] rounded-10 px-27 py-48 w-[70%]">
        <div className="grid grid-cols-3 gap-y-40">
          <div className="flex flex-col items-center justify-center gap-20">
            <div className="bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-10 w-210 h-40 flex items-center justify-center">
              Pool Name
            </div>
            <div className="">{poolDetail.poolName}</div>
          </div>
          <div className="flex flex-col items-center justify-center gap-20">
            <div className="bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-10 w-210 h-40 flex items-center justify-center">
              Staked Amount
            </div>
            <div className="">{bnToNumber(poolDetail.depositAmount)}</div>
          </div>
          <div className="flex flex-col items-center justify-center gap-20">
            <div className="bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-10 w-210 h-40 flex items-center justify-center">
              APY
            </div>
            <div className="">{Number(poolDetail.apy)}%</div>
          </div>
          <div className="flex flex-col items-center justify-center gap-20">
            <div className="bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-10 w-210 h-40 flex items-center justify-center">
              Rating
            </div>
            <div className="">{poolDetail.rating}</div>
          </div>
          <div className="flex flex-col items-center justify-center gap-20">
            <div className="bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-10 w-210 h-40 flex items-center justify-center">
              Risk
            </div>
            <div className="">{getPoolRiskTypeName(poolDetail.risk)}</div>
          </div>
          <div className="flex flex-col items-center justify-center gap-20">
            <div className="bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-10 w-210 h-40 flex items-center justify-center">
              Tenure Period
            </div>
            <div className="">{Number(poolDetail.minPeriod)}Days</div>
          </div>
        </div>
      </div>
      <div className="w-[27%] flex flex-col items-center justify-center gap-50">
        <Button
          isLoading={isWithdrawLoading}
          onClick={handleWithdrawStake}
          wrapperClassName="w-full"
          className="w-full rounded-8 py-18 bg-gradient-to-r from-[#00ECBC66] to-[#00ECBC80] border border-[#00ECBC]"
        >
          Withdraw Stake
        </Button>
        <Button
          isLoading={isLoading}
          onClick={handleClaimYeild}
          wrapperClassName="w-full"
          className="w-full rounded-8 py-18 bg-gradient-to-r from-[#007ADF66] to-[#007ADF80] border border-[#007ADF]"
        >
          {isLoading ? loadingMessage : "Claim Yield"}
        </Button>
      </div>
    </div>
  );
};

export default PoolCard;
