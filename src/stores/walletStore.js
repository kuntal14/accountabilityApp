import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useWalletStore = defineStore('wallet', () => {
  // Load from localStorage if available
  const storedBalance = localStorage.getItem('wallet_totalBalance')
  const storedLocked = localStorage.getItem('wallet_lockedStakes')
  const storedBurn = localStorage.getItem('wallet_burnPool')

  const totalBalance = ref(storedBalance ? parseFloat(storedBalance) : 100.0) // initial $100 for testing
  const lockedStakes = ref(storedLocked ? parseFloat(storedLocked) : 0.0)
  const burnPool = ref(storedBurn ? parseFloat(storedBurn) : 0.0)

  // Persist state to localStorage
  watch([totalBalance, lockedStakes, burnPool], () => {
    localStorage.setItem('wallet_totalBalance', totalBalance.value.toString())
    localStorage.setItem('wallet_lockedStakes', lockedStakes.value.toString())
    localStorage.setItem('wallet_burnPool', burnPool.value.toString())
  }, { deep: true })

  // Actions
  function topUp(amount) {
    totalBalance.value += amount
  }

  function lockStake(amount) {
    if (totalBalance.value >= amount) {
      totalBalance.value -= amount
      lockedStakes.value += amount
      return true
    }
    return false // Insufficient funds
  }

  function releaseStake(amount) {
    if (lockedStakes.value >= amount) {
      lockedStakes.value -= amount
      totalBalance.value += amount
    }
  }

  function burnStake(amount) {
    if (lockedStakes.value >= amount) {
      lockedStakes.value -= amount
      burnPool.value += amount
    }
  }

  return { totalBalance, lockedStakes, burnPool, topUp, lockStake, releaseStake, burnStake }
})
