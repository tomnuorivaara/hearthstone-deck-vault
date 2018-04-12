<template>
  <div class="deck">
    <button class="deck__delete-button" @click="deleteDeck()">Delete</button>
    <p class="deck__id">{{ id }}</p>
    <h2 class="deck__name">
    {{ deckName }}
    </h2>
    <input type="text" readonly class="deck__code" :value="code" />
    <button class="deck__copy-button" @click="copyDeck()">Copy</button>
  </div>
</template>

<script>
export default {
  name: "Deck",
  props: ["id", "deckName", "code", "deleteDeck"],
  methods: {
    copyDeck() {
      // eslint-disable-next-line
      alert("copied!");
    }
  }
};
</script>

<style lang="scss" scoped>
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
}
</style>
