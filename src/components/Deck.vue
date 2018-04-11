<template>
  <li>{{ id }}: {{ deckName }}</li>
</template>

<script>
export default {
  name: 'Deck',
  props: [
    'deckName',
    'id',
  ],
};
</script>

<style lang="scss" scoped>

</style>
