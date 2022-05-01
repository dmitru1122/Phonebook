<template>
  <div class="card">
    <h3 class="card__title">
      {{ contact?.firstName && contact.firstName[0].toUpperCase()
      }}{{ contact?.firstName?.slice(1) }}
      {{ contact?.lastName && contact.lastName[0].toUpperCase()
      }}{{ contact?.lastName?.slice(1) }}
    </h3>
    <div class="card__text">{{ contact?.phoneNumber }}</div>
    <div class="card__text">{{ contact?.email }}</div>
    <div class="card__caption">{{ contact?.id }}</div>
    <div class="card__actions">
      <MyButton actionTitle="Update" my-style="green" @click="updatedContact" />
      <MyButton
        actionTitle="Delete"
        @click.once="handleDelete"
        my-style="red"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { IContanct } from "@/interfaces/appInterfaces";
import MyButton from "@/components/MyButton.vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "HelloWorld",
  components: {
    MyButton,
  },
  props: {
    contact: Object as PropType<IContanct>,
  },
  watch: {
    contact(newVal) {
      console.log(newVal);
    },
  },
  methods: {
    ...mapActions({
      deleteContact: "deleteContact",
      updatedChosenContact: "updatedChosenContact",
    }),
    handleDelete() {
      this.deleteContact(this.contact?.id);
      // try {
      //   const { data } = await axios.delete(
      //     `http://localhost:3000/posts/${this.contact?.id}`
      //   );
      // } catch (e) {
      //   console.error(e);
      // }
    },
    updatedContact() {
      console.log(this.contact);
      this.updatedChosenContact(this.contact);
      this.$router.push("/add");
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../theme/variables.scss";
.card {
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 2em;
  background-color: $ui-inactive;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 2em;

  &__title {
  }
  &__text {
    margin-bottom: 0.5em;
  }
  &__caption {
  }
  &__actions {
    padding-left: 1em;
  }
}
</style>
