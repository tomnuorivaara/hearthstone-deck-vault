<template>
  <div class="version">
    <input type="text" readonly class="version__code" :value="code" />
    <button v-clipboard:copy="code"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            >
              Copy
    </button>
    <button @click="deleteVersion(id)">Remove</button>
    <span v-if="copyStatus === 'success'" class="version__copy-status version__copy-status--success">Copied!</span>
    <span v-if="copyStatus === 'error'" class="version__copy-status version__copy-status--error">Copy failed!</span>
    <p class="version__comment">{{ comment }}</p>
  </div>
</template>

<script>
import wait from "waait";

export default {
  name: "Version",
  props: ["id", "code", "comment", "deleteVersion"],
  data() {
    return {
      copyStatus: null,
      messageDisplayTime: 2000
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

.version {
  margin-top: 1rem;
  &__copy-status {
    font-size: map-get($font-size, "sm");
    margin: 0 0.5rem;
    opacity: 0;
    animation-name: fade-in-out;
    animation-duration: 2000ms;
    &--success {
      color: green;
    }
    &--error {
      color: red;
    }
  }
  &__comment {
    margin: 0.1rem 0 0;
    color: grey;
    font-size: map-get($font-size, "sm");
    font-style: italic;
    &::before {
      content: "// ";
    }
  }
}

// Animations
@keyframes fade-in-out {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
