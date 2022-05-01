<template>
  <button type="button" :class="[`button elevation-1  button--${myStyle}`]">
    <span class="v-btn__content">
      {{ actionTitle }}
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    actionTitle: String,
    myStyle: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../theme/variables.scss";

.button {
  height: 36px;
  min-width: 92px;
  padding: 0 16px;
  margin: 10px;

  align-items: center;
  border-radius: 4px;
  letter-spacing: 0.0892857143em;
  text-transform: uppercase;

  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }

  &--green {
    background-color: $ui-green;
    border-color: $ui-green;
  }
  &--red {
    background-color: $ui-red;
    border-color: $ui-red;
  }
}
</style>
