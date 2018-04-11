<template>
  <div class="main">
    <h1 class="main__heading">{{ title }}</h1>
    <p class="main__intro">{{ intro }}</p>
    <input type="text" :placeholder="placeholder" v-model="inputName">
    <button @click="addDeck">+</button>
    <ul class="main__decklist">
      <deck v-for="deck in decks" :key="deck.id" :id="deck.id" :deckName="deck.name"/>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue';
import Deck from './Deck';

Vue.component('deck', Deck);

export default {
  name: 'Main',
  data() {
    return {
      title: 'Hearthstone Deck Vault',
      intro: 'Simple app to store your Hearthstone decks.',
      placeholder: 'Give your deck a name',
      inputName: '',
      decks: [
        {
          id: 1,
          name: 'My first deck',
        },
        {
          id: 2,
          name: 'Tempo Rogue',
        },
        {
          id: 3,
          name: 'Demon Warlock',
        },
      ],
    };
  },
  methods: {
    addDeck() {
      const lastId = this.decks.slice(-1)[0].id;
      const newDeck = {
        id: lastId + 1,
        name: this.inputName,
      };
      this.decks = [...this.decks, newDeck];
      this.inputName = '';
    },
  },
};
</script>

<style lang="scss" scoped>
  .main {
    &__decklist {
        margin-left: 2rem;
        text-align: left;
    }
  }
</style>
