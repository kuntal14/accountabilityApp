<script setup>
import { computed, ref } from 'vue'
import { useWalletStore } from './stores/walletStore'

const walletStore = useWalletStore()

const formattedBalance = computed(() => {
  return walletStore.totalBalance.toFixed(2)
})

const formattedLocked = computed(() => {
  return walletStore.lockedStakes.toFixed(2)
})

const showTopUpModal = ref(false)

const handleTopUpSuccess = () => {
  walletStore.topUp(100)
  showTopUpModal.value = false
}
</script>

<template>
  <div class="app-container">
    <header class="navbar">
      <div class="logo">
        <span class="logo-icon">🔒</span> Accountability Vault
      </div>
      <nav class="nav-links">
        <RouterLink to="/create" class="nav-btn primary">New Contract</RouterLink>
      </nav>
    </header>

    <div class="global-wallet-bar">
      <div class="wallet-item">
        <span class="wallet-label">Available Balance</span>
        <span class="wallet-value glow-text">₹{{ formattedBalance }}</span>
      </div>
      <div class="wallet-item">
        <span class="wallet-label">Locked Stakes</span>
        <span class="wallet-value text-warning">₹{{ formattedLocked }}</span>
      </div>
      <div class="wallet-item" title="UPI Top-up (+₹100)">
        <button class="topup-btn" @click="showTopUpModal = true">
          + Top Up ₹100
        </button>
      </div>
    </div>

    <main class="main-content">
      <RouterView />
    </main>

    <!-- Top Up Modal -->
    <div v-if="showTopUpModal" class="modal-overlay">
      <div class="modal-content glass-card">
        <h3>Top Up ₹100</h3>
        <p>Scan the QR code with any UPI app (Paytm, GPay, PhonePe) to complete your top-up.</p>
        <div class="qr-container" style="display: flex; justify-content: center; margin: 20px 0;">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=dummy@upi%26pn=Accountability%20Vault%26am=100%26cu=INR" alt="UPI QR Code" style="border-radius: 8px;" />
        </div>
        <div class="modal-actions" style="display: flex; gap: 10px; justify-content: flex-end;">
          <button class="nav-btn" @click="showTopUpModal = false">Cancel</button>
          <button class="nav-btn primary" @click="handleTopUpSuccess">Simulate Payment Success</button>
        </div>
      </div>
    </div>
  </div>
</template>
