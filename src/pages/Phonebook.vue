<template>
  <div class="phonebook container">
    <h1 class="header">Phonebook</h1>
    <div></div>
    <div
      class="phonebook__list"
      v-if="
        get_statusFetchContactsLoading === 'default' ||
        get_statusFetchContactsLoading === 'success'
      "
    >
      <div class="phonebook__add">
        <MyButton
          actionTitle="add"
          my-style="green"
          @click="$router.push('/edit')"
        />
      </div>
      <Contact
        v-for="contact in get_contacts"
        :key="contact.id"
        :contact="contact"
        @update="update"
      />
      <div v-if="get_contacts.length === 0" class="phonebook__status">
        Empty
      </div>
    </div>
    <div
      v-if="get_statusFetchContactsLoading === 'loading'"
      class="phonebook__status"
    >
      Loading...
    </div>

    <div
      v-if="get_statusFetchContactsLoading === 'error'"
      class="phonebook__status phonebook__status--error"
    >
      Error
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Contact from "../components/Contact.vue"; // @ is an alias to /src
import MyButton from "@/components/MyButton.vue";
import { mapGetters, mapActions } from "vuex";

export default defineComponent({
  name: "HomeView",
  components: {
    Contact,
    MyButton,
  },

  data() {
    return {
      typeEdition: String,
    };
  },
  methods: {
    ...mapActions({
      fetchContacts: "fetchContacts",
      isContactsLoading: "isContactsLoading",
    }),
  },
  computed: {
    ...mapGetters({
      get_contacts: "get_contacts",
      get_statusFetchContactsLoading: "get_statusFetchContactsLoading",
    }),
  },

  mounted() {
    this.fetchContacts();
  },
});
</script>

<style scoped lang="scss">
@import "../theme/variables.scss";
.phonebook {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  padding: 4 * $basic-margin;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 20px;

  &__add {
    display: flex;
    justify-content: flex-end;
  }
  &__list {
    width: 60%;
  }
  &__status {
    padding: 3 * $basic-margin;
    font-size: $ui-font-size-large-header;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 3 * $basic-margin;

    &--error {
      background-color: $ui-red;
      border-color: $ui-red;
      color: $ui-white;
    }
  }
}
</style>
