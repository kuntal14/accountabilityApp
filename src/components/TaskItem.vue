<script setup>
import { computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const taskStore = useTaskStore()

const markDone = () => {
  taskStore.completeTask(props.task.id)
}

const giveUp = () => {
  if (confirm("Are you sure? Your stake will be burned!")) {
    taskStore.failTask(props.task.id)
  }
}

const formattedDeadline = computed(() => {
  return new Date(props.task.deadline).toLocaleString()
})

const statusClass = computed(() => {
  if (props.task.status === 'completed') return 'status-success'
  if (props.task.status === 'failed') return 'status-fail'
  return 'status-active'
})
</script>

<template>
  <div class="task-card glass-card" :class="statusClass">
    <div class="card-header">
      <h3 class="task-title">{{ task.description }}</h3>
      <span class="stake-badge">₹{{ task.stake.toFixed(2) }}</span>
    </div>
    
    <div class="card-body">
      <p class="deadline">Deadline: <span>{{ formattedDeadline }}</span></p>
      <div class="status-indicator">
        Status: <span class="badge">{{ task.status.toUpperCase() }}</span>
      </div>
    </div>

    <div class="card-actions" v-if="task.status === 'active'">
      <button class="action-btn success-btn" @click="markDone">
        ✓ Mark Done
      </button>
      <button class="action-btn fail-btn" @click="giveUp">
        ✗ Give Up
      </button>
    </div>
  </div>
</template>
