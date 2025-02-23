import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Solanavotingpro} from '../target/types/Solanavotingpro'

describe('Solanavotingpro', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Solanavotingpro as Program<Solanavotingpro>

  const SolanavotingproKeypair = Keypair.generate()

  it('Initialize Solanavotingpro', async () => {
    await program.methods
      .initialize()
      .accounts({
        Solanavotingpro: SolanavotingproKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([SolanavotingproKeypair])
      .rpc()

    const currentCount = await program.account.Solanavotingpro.fetch(SolanavotingproKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Solanavotingpro', async () => {
    await program.methods.increment().accounts({ Solanavotingpro: SolanavotingproKeypair.publicKey }).rpc()

    const currentCount = await program.account.Solanavotingpro.fetch(SolanavotingproKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Solanavotingpro Again', async () => {
    await program.methods.increment().accounts({ Solanavotingpro: SolanavotingproKeypair.publicKey }).rpc()

    const currentCount = await program.account.Solanavotingpro.fetch(SolanavotingproKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Solanavotingpro', async () => {
    await program.methods.decrement().accounts({ Solanavotingpro: SolanavotingproKeypair.publicKey }).rpc()

    const currentCount = await program.account.Solanavotingpro.fetch(SolanavotingproKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set Solanavotingpro value', async () => {
    await program.methods.set(42).accounts({ Solanavotingpro: SolanavotingproKeypair.publicKey }).rpc()

    const currentCount = await program.account.Solanavotingpro.fetch(SolanavotingproKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the Solanavotingpro account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        Solanavotingpro: SolanavotingproKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.Solanavotingpro.fetchNullable(SolanavotingproKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
