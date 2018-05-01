<template>
  <div class="deck">
    <button class="deck__delete-button" @click="deleteDeck(id)">Delete</button>
    <h2 class="deck__name">
    {{ deckName }}
    </h2>
    <div class="deck__code-area">
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
    <div class="deck__versions-area">
      <button class="deck__show-versions"
              @click="toggleVersions"
              >
                {{ showHideVersionsText }}
      </button>
      <div v-if="showVersions">
        <div class="deck__add-version">
          <input type="text" :placeholder="placeholder.code" v-model="input.code">
          <input type="text" :placeholder="placeholder.comment" v-model="input.comment">
          <button @click="addVersion">+ Add</button>
        </div>
        <version v-for="version in versions"
                 :key="version.id"
                 :id="version.id"
                 :code="version.code"
                 :comment="version.comment"
                 :deleteVersion="deleteVersion"
                 />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import wait from "waait";
import { uuid } from "vue-uuid";
import Version from "./Version";

Vue.component("version", Version);

export default {
  name: "Deck",
  props: ["id", "deckName", "code", "deleteDeck"],
  data() {
    return {
      copyStatus: null,
      messageDisplayTime: 2000,
      showVersions: false,
      placeholder: {
        code: "Paste version deck code here",
        comment: "Add comment to version"
      },
      input: {
        code: "",
        comment: ""
      },
      error: {
        emptyVersion: "Please give your version a deck code!"
      },
      versions: []
    };
  },
  computed: {
    showHideVersionsText() {
      const showHide = this.showVersions ? "Hide" : "Show";
      return `${showHide} versions`;
    }
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
    },
    toggleVersions() {
      this.showVersions = !this.showVersions;
    },
    addVersion() {
      const newVersion = {
        id: uuid.v4(),
        code: this.input.code,
        comment: this.input.comment
      };
      if (this.validateVersion(newVersion)) {
        this.versions = [...this.versions, newVersion];
        this.input.code = "";
        this.input.comment = "";
      }
    },
    validateVersion(version) {
      if (!version.code) {
        // eslint-disable-next-line
        alert(this.error.emptyVersion);
        return false;
      }
      return true;
    },
    deleteVersion(id) {
      this.versions = this.versions.filter(version => version.id !== id);
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
  &__name {
    margin-top: 0;
  }
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
  &__versions-area {
    margin: 1rem 0 0;
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
