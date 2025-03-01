import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../icp_backend';

const canisterId = 'cdbdu-2qaaa-aaaah-qp6ca-cai';
// const localHost = "http://127.0.0.1:4943";
const icHost = "https://ceafa-xiaaa-aaaah-qp6cq-cai.icp0.io/"; 

export const createActor = async () => {
  try {
    console.log("Creating HTTP agent...");
    // const host = process.env.VITE_NODE_ENV !== 'production' ? localHost : icHost;
    const host = icHost;
    
    const agent = await HttpAgent.create({
      host,
    });
    console.log("Agent created");

    // Only fetch root key in development
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

    console.log("Actor created successfully");
    return actor;
  } catch (err) {
    console.error("Error in createActor:", err);
    throw err;
  }
};