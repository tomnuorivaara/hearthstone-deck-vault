<template>
  <div class="deck">
    <button class="deck__delete-button" @click="deleteDeck()">Delete</button>
    <p class="deck__id">{{ id }}</p>
    <h2 class="deck__name">
    {{ deckName }}
    </h2>
    <input type="text" readonly class="deck__code" :value="code" />
    <button class="deck__copy-button"
            v-clipboard:copy="code"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            >
              Copy
    </button>
    <span v-if="copyStatus === 'success'" class="deck__copy-status deck__copy-status--success">Copied!</span>
    <span v-if="copyStatus === 'error'" class="deck__copy-status deck__copy-status--error">Copy failed!</span>
  </div>
</template>

<script>
import wait from "waait";

export default {
  name: "Deck",
  props: ["id", "deckName", "code", "deleteDeck"],
  data() {
    return {
      copyStatus: null,
      messageDisplayTime: 1500
    };
  },
  methods: {
    async onCopy() {
      this.copyStatus = "success";
      await wait(this.messageDisplayTime);
      this.copyStatus = null;
    },
    async onError() {
      this.copyStatus = "error";
      await wait(this.messageDisplayTime);
      this.copyStatus = null;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../sass/variables";

.deck {
  position: relative;
  box-sizing: border-box;
  flex-grow: 1;
  width: 45%;
  border: 1px solid #e3e3e3;
  padding: 1.5rem;
  margin: 1rem;
  &__delete-button {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
  }
  &__id {
    margin-top: 0;
  }
  &__copy-status {
    font-size: map-get($font-size, "sm");
    margin: 0 0.5rem;
    &--success {
      color: green;
    }
    &--error {
      color: red;
    }
  }
}
</style>
