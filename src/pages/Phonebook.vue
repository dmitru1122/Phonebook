<template>
  <div class="phonebook container">
    <h1 class="header">Phonebook</h1>
    <div></div>
    <div class="phonebook__list" v-if="!get_isFetchContactsLoading">
      <div class="phonebook__add">
        <MyButton
          actionTitle="add"
          my-style="green"
          @click="$router.push('/add')"
        />
      </div>
      <Contact
        v-for="contact in get_contacts"
        :key="contact.id"
        :contact="contact"
        @update="update"
      />
    </div>
    <div v-else>Идет загрузка...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Contact from "../components/Contact.vue"; // @ is an alias to /src
import { IContanct } from "../interfaces/appInterfaces";
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
      // listContacts: [] as [IContanct],
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
      get_isFetchContactsLoading: "get_isFetchContactsLoading",
    }),
  },

  watch: {
    get_contacts(newVal) {
      //   this.fetchContacts();
    },
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
}
</style>
