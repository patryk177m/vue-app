<script>
export default {
  name: "TodoItem",
  props: {
    task: Object,
  },
  emits: {
    remove: (payload) => {
      if (payload.id) {
        return true;
      } else {
        console.warn("Missing task id in removr event.");
        return false;
      }
    },
  },
};
</script>

<template>
  <div data-cy="Todo" class="todo" :class="{ completed: task.completed }">
    <label class="todo__status-label"
      ><input
        data-cy="TodoStatus"
        type="checkbox"
        class="todo__status"
        checked=""
        v-model="task.completed" /></label
    ><span data-cy="TodoTitle" class="todo__title">{{ task.title }}</span
    ><button
      type="button"
      class="todo__remove"
      data-cy="TodoDelete"
      @click="$emit('remove', { id: task.id })"
    >
      ×
    </button>
    <div data-cy="TodoLoader" class="modal overlay">
      <div class="modal-background has-background-white-ter"></div>
      <div class="loader"></div>
    </div>
  </div>
</template>

<style></style>
