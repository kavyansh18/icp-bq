import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../icp_backend';

const canisterId = 'bkyz2-fmaaa-aaaaa-qaaaq-cai';
// fe cid=bd3sg-teaaa-aaaaa-qaaba-cai
const canisterUrl = 'http://127.0.0.1:4943/?canisterId=bkyz2-fmaaa-aaaaa-qaaaq-cai'

export const createActor = async () => {
  try {
    console.log("Creating HTTP agent...");
    const agent = await HttpAgent.create({
      host: canisterUrl,
    });
    console.log("Agent created");

    // Uncomment only if running in a local dev environment
    if (process.env.VITE_NODE_ENV !== 'production') {
      try {
        await agent.fetchRootKey();
        console.log("Root key fetched successfully");
      } catch (err) {
        console.warn('Unable to fetch root key. Check to ensure that your local replica is running');
        console.error(err);
      }
    }

    const actor = Actor.createActor(idlFactory, {
      agent,
      canisterId,
    });

    console.log("Actor created successfully:", actor);

    return actor;
  } catch (err) {
    console.error("Error in createActor:", err);
    throw err; 
  }
};
