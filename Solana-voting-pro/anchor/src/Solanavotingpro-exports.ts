// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import SolanavotingproIDL from '../target/idl/Solanavotingpro.json'
import type { Solanavotingpro } from '../target/types/Solanavotingpro'

// Re-export the generated IDL and type
export { Solanavotingpro, SolanavotingproIDL }

// The programId is imported from the program IDL.
export const SOLANAVOTINGPRO_PROGRAM_ID = new PublicKey(SolanavotingproIDL.address)

// This is a helper function to get the Solanavotingpro Anchor program.
export function getSolanavotingproProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...SolanavotingproIDL, address: address ? address.toBase58() : SolanavotingproIDL.address } as Solanavotingpro, provider)
}

// This is a helper function to get the program ID for the Solanavotingpro program depending on the cluster.
export function getSolanavotingproProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Solanavotingpro program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return SOLANAVOTINGPRO_PROGRAM_ID
  }
}
