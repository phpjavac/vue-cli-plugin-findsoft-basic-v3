<template lang="pug">
svg.icon(aria-hidden="true")
  use(:xlink:href="`#${type}`")
</template>
<script lang="ts">
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="stylus" scoped>
.icon
  width 1em
  height 1em
  vertical-align -0.15em
  fill currentColor
  overflow hidden
</style>
