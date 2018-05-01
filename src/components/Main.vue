<template>
  <div class="main">
    <div class="intro">
      <img src="../assets/logo.png">
      <h1 class="intro__heading">{{ title }}</h1>
      <p class="intro__tagline">{{ intro }}</p>
    </div>
    <div class="add-deck">
      <input type="text" :placeholder="placeholder.name" v-model="input.name">
      <input type="text" :placeholder="placeholder.code" v-model="input.code">
      <button @click="addDeck">+ Add</button>
    </div>
    <div class="decklist">
      <deck v-for="deck in decks"
            :key="deck.id"
            :id="deck.id"
            :deck-name="deck.name"
            :code="deck.code"
            :delete-deck="deleteDeck"
            />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { uuid } from "vue-uuid";
import Deck from "./Deck";

Vue.component("deck", Deck);

export default {
  name: "Main",
  data() {
    return {
      title: "Hearthstone Deck Vault",
      intro: "Simple app to store your Hearthstone decks.",
      placeholder: {
        name: "Give your deck a name",
        code: "Paste the deck code here"
      },
      input: {
        name: "",
        code: ""
      },
      decks: [
        {
          id: uuid.v4(),
          name: "My first deck",
          code: "first code"
        },
        {
          id: uuid.v4(),
          name: "Tempo Rogue",
          code: "second code"
        },
        {
          id: uuid.v4(),
          name: "Demon Warlock",
          code: "third code"
        }
      ],
      error: {
        emptyDeck: "Please give your deck a name and deck code!"
      }
    };
  },
  methods: {
    addDeck() {
      const newDeck = {
        id: uuid.v4(),
        name: this.input.name,
        code: this.input.code
      };
      if (this.validateDeck(newDeck)) {
        this.decks = [...this.decks, newDeck];
        this.input.name = "";
        this.input.code = "";
      }
    },
    validateDeck(deck) {
      if (!deck.name || !deck.code) {
        // eslint-disable-next-line
        alert(this.error.emptyDeck);
        return false;
      }
      return true;
    },
    deleteDeck(id) {
      this.decks = this.decks.filter(deck => deck.id !== id);
    }
  }
};
</script>

<style lang="scss" scoped>
.intro {
  text-align: center;
}
.add-deck {
  text-align: center;
  margin-bottom: 2rem;
}
.decklist {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 0 2rem;
  text-align: left;
}
</style>
