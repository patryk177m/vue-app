<script>
import { patchTask } from "@/http-client";

export default {
  name: "TodoItem",
  props: {
    task: Object,
  },
  data() {
    return {
      editing: false,
      newTitle: "",
      isCompleted: this.task.completed,
    };
  },
  watch: {
    isCompleted(newValue) {
      patchTask({
        id: this.task.id,
        title: this.task.title,
        completed: newValue,
      })
    }
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
  methods: {
    edit() {
      this.editing = true;
      this.newTitle = this.task.title;

      this.$nextTick(() => {
        this.$refs["title-field"].focus();
      });
    },
    cancel() {
      this.editing = false;
    },
    rename() {
      patchTask({
        id: this.task.id,
        title: this.newTitle,
        completed: this.task.completed,
      }).then(() => {
        if (!this.editing) return;
        this.task.title = this.newTitle;
        this.editing = false;
      });
    },
  },
};
</script>

<template>
  <div data-cy="Todo" class="todo" :class="{ completed: isCompleted }">
    <label class="todo__status-label"
      ><input
        data-cy="TodoStatus"
        type="checkbox"
        class="todo__status"
        checked=""
        v-model="isCompleted"
    /></label>

    <form v-if="editing" @submit.prevent="rename">
      <input
        ref="title-field"
        type="text"
        class="todo__title-field"
        placeholder="Empty todo will be deleted"
        value="Todo is being edited now"
        @keyup.esc="cancel"
        @blur="rename"
        v-model="newTitle"
      />
    </form>

    <template v-else>
      <span data-cy="TodoTitle" class="todo__title" @dblclick="edit">{{
        task.title
      }}</span
      ><button
        type="button"
        class="todo__remove"
        data-cy="TodoDelete"
        @click="$emit('remove', { id: task.id })"
      >
        ×
      </button>
    </template>

    <div data-cy="TodoLoader" class="modal overlay">
      <div class="modal-background has-background-white-ter"></div>
      <div class="loader"></div>
    </div>
  </div>
</template>

<style></style>
