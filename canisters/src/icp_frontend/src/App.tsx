import { useEffect, useState } from "react";
import { createActor } from './utils/Canister-config';

const App = () => {
  const [statusMessage, setStatusMessage] = useState("Checking connection...");

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log("Starting to create actor...");
        const actor = await createActor();
        console.log("Actor created:", actor);

        // Call the backend method `getTotalTVL`
        const result = await actor.getTotalTVL() as { Ok?: number; Err?: string };
        console.log("Result from getTotalTVL:", result);

        if ("Ok" in result) {
          setStatusMessage(`Connected successfully! Total TVL: ${result.Ok}`);
        } else {
          setStatusMessage(`Error from backend: ${result.Err}`);
        }
      } catch (error) {
        console.error("Error in useEffect:", error);
        setStatusMessage("Failed to connect to the canister.");
      }
    };

    testConnection();
  }, []);

  return (
    <div>
      <h1 className="text-blue-500">ICP Canister Connection Test</h1>
      <p>{statusMessage}</p>
    </div>
  );
};

export default App;
