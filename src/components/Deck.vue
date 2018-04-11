<template>
  <li>{{ id }}: {{ deckName }} - {{ code }}</li>
</template>

<script>
export default {
  name: "Deck",
  props: ["id", "deckName", "code"]
};
</script>

<style lang="scss" scoped>
// eslint-disable-next-line
</style>
