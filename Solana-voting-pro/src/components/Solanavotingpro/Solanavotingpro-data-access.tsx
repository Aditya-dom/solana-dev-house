'use client'

import { getSolanavotingproProgram, getSolanavotingproProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useSolanavotingproProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getSolanavotingproProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getSolanavotingproProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['Solanavotingpro', 'all', { cluster }],
    queryFn: () => program.account.Solanavotingpro.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['Solanavotingpro', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ Solanavotingpro: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useSolanavotingproProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useSolanavotingproProgram()

  const accountQuery = useQuery({
    queryKey: ['Solanavotingpro', 'fetch', { cluster, account }],
    queryFn: () => program.account.Solanavotingpro.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['Solanavotingpro', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ Solanavotingpro: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['Solanavotingpro', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ Solanavotingpro: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['Solanavotingpro', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ Solanavotingpro: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['Solanavotingpro', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ Solanavotingpro: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
