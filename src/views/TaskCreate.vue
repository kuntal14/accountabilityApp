<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '../stores/taskStore'
import { useWalletStore } from '../stores/walletStore'

const router = useRouter()
const taskStore = useTaskStore()
const walletStore = useWalletStore()

const description = ref('')
const stake = ref(5.00)
const deadline = ref('')
const error = ref('')

const submitContract = () => {
  if (!description.value || !deadline.value || stake.value <= 0) {
    error.value = "Please fill all fields with valid data."
    return
  }
  
  const success = taskStore.createTask(description.value, parseFloat(stake.value), deadline.value)
  if (success) {
    router.push('/')
  } else {
    error.value = "Insufficient funds in Available Balance. Please top up."
  }
}
</script>

<template>
  <div class="create-view">
    <div class="glass-card form-container">
      <h2>Create New Contract</h2>
      <p class="subtitle">Lock your stake to guarantee your success.</p>

      <form @submit.prevent="submitContract" class="create-form">
        <div class="form-group">
          <label for="desc">Task Description</label>
          <input id="desc" type="text" v-model="description" placeholder="e.g. Finish the PRD draft" required />
        </div>
        
        <div class="form-group row-group">
          <div class="half-width">
            <label for="stake">Stake Amount (₹)</label>
            <input id="stake" type="number" step="0.5" min="1" v-model="stake" required />
            <small class="hint">Available: ₹{{ walletStore.totalBalance.toFixed(2) }}</small>
          </div>
          <div class="half-width">
            <label for="deadline">Deadline</label>
            <input id="deadline" type="datetime-local" v-model="deadline" required />
          </div>
        </div>

        <div v-if="error" class="error-msg">{{ error }}</div>

        <button type="submit" class="submit-btn">Lock Stake & Commit</button>
      </form>
    </div>
  </div>
</template>
