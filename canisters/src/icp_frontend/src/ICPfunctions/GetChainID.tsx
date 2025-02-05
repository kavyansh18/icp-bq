import React, { useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';

const GetCgainID: React.FC = () => {
  const [chainId, setChainId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchChainId = async () => {
    try {
      // Check if Ethereum provider is available (e.g., MetaMask)
      if (window.ethereum) {
        // Create a BrowserProvider instance (updated for v6)
        const provider = new BrowserProvider(window.ethereum);

        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get the network (which includes the chainId)
        const network = await provider.getNetwork();

        // Set the chainId state
        setChainId(Number(network.chainId)); // Convert BigInt to number
      } else {
        setError('Ethereum wallet not detected. Please install MetaMask or another Ethereum wallet.');
      }
    } catch (err) {
      setError('Failed to fetch chainId: ' + (err as Error).message);
    }
  };

  useEffect(() => {
    fetchChainId();
  }, []);

  return (
    <div className='flex justify-center items-center '>
      {chainId !== null ? (
        <p>Connected Chain ID: {chainId}</p>
      ) : (
        <p>Loading chain ID...</p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default GetCgainID;