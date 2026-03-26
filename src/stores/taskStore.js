import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useWalletStore } from './walletStore'

export const useTaskStore = defineStore('tasks', () => {
  const walletStore = useWalletStore()
  
  const storedTasks = localStorage.getItem('tasks_list')
  const tasks = ref(storedTasks ? JSON.parse(storedTasks) : [])

  watch(tasks, () => {
    localStorage.setItem('tasks_list', JSON.stringify(tasks.value))
  }, { deep: true })

  function createTask(description, stake, deadline) {
    if (walletStore.lockStake(stake)) {
      tasks.value.push({
        id: Date.now(),
        description,
        stake,
        deadline,
        status: 'active'
      })
      return true
    }
    return false // Could not lock stake (insufficient funds)
  }

  function completeTask(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task && task.status === 'active') {
      walletStore.releaseStake(task.stake)
      task.status = 'completed'
    }
  }

  function failTask(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task && task.status === 'active') {
      walletStore.burnStake(task.stake)
      task.status = 'failed'
    }
  }

  return { tasks, createTask, completeTask, failTask }
})
