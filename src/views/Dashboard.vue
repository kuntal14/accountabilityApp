<script setup>
import { computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import TaskItem from '../components/TaskItem.vue'

const taskStore = useTaskStore()

const activeTasks = computed(() => {
  return taskStore.tasks.filter(t => t.status === 'active')
})

const completedTasks = computed(() => {
  return taskStore.tasks.filter(t => t.status !== 'active')
})
</script>

<template>
  <div class="dashboard">
    <section class="task-section">
      <h2 class="section-title">Active Contracts</h2>
      <div v-if="activeTasks.length === 0" class="empty-state">
        <p>No active contracts.</p>
        <RouterLink to="/create" class="btn primary mt-4">Start a Contract</RouterLink>
      </div>
      <div class="task-grid" v-else>
        <TaskItem 
          v-for="task in activeTasks" 
          :key="task.id" 
          :task="task" 
        />
      </div>
    </section>

    <section class="task-section mt-10">
      <h2 class="section-title">Past Contracts</h2>
      <div v-if="completedTasks.length === 0" class="empty-state">
        <p>No past contracts found.</p>
      </div>
      <div class="task-grid" v-else>
        <TaskItem 
          v-for="task in completedTasks" 
          :key="task.id" 
          :task="task" 
        />
      </div>
    </section>
  </div>
</template>
