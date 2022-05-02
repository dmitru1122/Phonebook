<template>
  <div class="add-contact container">
    <div class="close-btn" @click="close">
      <img src="@/assets/close.png" class="close-btn__img" alt="close" />
    </div>
    <h1>{{ get_chosenContact?.id ? "EDIT" : "ADD" }} CONTACT</h1>
    <form
      :class="[
        `add-contact__form ${
          get_statusAddContactLoading === 'loading' &&
          'add-contact__form--opcity-08'
        }`,
      ]"
      @submit.prevent="addNewContact"
    >
      <div>
        <input
          v-model="contact.firstName"
          type="text"
          class="input-field elevation-1"
          placeholder="*FIRST NAME"
          oninvalid="setCustomValidity('PLEASE ENTER YOUR FIRST NAME')"
          onchange="setCustomValidity('')"
          ref="firstName"
          :key="contact.lastName"
          :required="!contact.lastName"
        />
      </div>
      <div>
        <input
          v-model="contact.lastName"
          type="text"
          class="input-field elevation-1"
          placeholder="*LAST NAME"
          oninvalid="setCustomValidity('PLEASE ENTER YOUR LAST NAME')"
          onchange="setCustomValidity('')"
          :key="contact.firstName"
          :required="!contact.firstName"
        />
      </div>
      <div>
        <input
          v-model="contact.email"
          pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<div>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
          type="text"
          class="input-field elevation-1"
          placeholder="*E-MAIL"
          oninvalid="setCustomValidity('PLEASE ENTER YOUR E-MAIL, FOR EXAMPLE: cb@zaptest.com')"
          onchange="setCustomValidity('')"
          required
        />
      </div>
      <div>
        <input
          v-model="contact.phoneNumber"
          type="text"
          class="input-field elevation-1"
          placeholder="*PHONE NUMBER"
          oninvalid="setCustomValidity('PLEASE ENTER YOUR PHONE NUMBER')"
          onchange="setCustomValidity('')"
          oninput="setCustomValidity('')"
          required
        />
      </div>

      <div>
        <MyButton
          :actionTitle="get_chosenContact?.id ? 'Edit' : 'Add'"
          myStyle="green"
          type="submit"
        />
        <MyButton actionTitle="clear" myStyle="red" @click="clear" />
      </div>
      <div
        v-if="get_statusAddContactLoading !== 'default'"
        class="loading-modal"
      >
        {{
          get_statusAddContactLoading[0].toUpperCase() +
          get_statusAddContactLoading.slice(1)
        }}
      </div>
    </form>
  </div>
</template>

// work with form withou spec libraries - it's bad idea
<script lang="ts">
import { defineComponent } from "vue";
import { IContanct } from "../interfaces/appInterfaces";
import MyButton from "@/components/MyButton.vue";
import { mapGetters, mapActions } from "vuex";

export default defineComponent({
  name: "AddContact",
  components: {
    MyButton,
  },
  // заменить на адекватный тип
  props: {
    type: String,
  },

  data() {
    return {
      contact: {} as IContanct,
    };
  },

  mounted() {
    if (this.get_chosenContact?.id) {
      console.log(this.get_chosenContact);
      this.contact = this.get_chosenContact;
    }
  },

  methods: {
    ...mapActions({
      addContacts: "addContacts",
      removeChosenContact: "removeChosenContact",
      updateContact: "updateContact",
    }),

    clear(): void {
      this.contact = {} as IContanct;
    },

    close(): void {
      this.clear();
      if (this.get_chosenContact) {
        this.removeChosenContact();
      }
      this.$router.push("/");
    },
    addNewContact(): void {
      if (this.get_chosenContact?.id) {
        this.updateContact(this.contact);
      } else {
        this.addContacts(this.contact);
      }
    },
  },
  computed: {
    ...mapGetters({
      get_statusAddContactLoading: "get_statusAddContactLoading",
      get_chosenContact: "get_chosenContact",
    }),
  },
  watch: {
    get_statusAddContactLoading(newVal) {
      if (newVal === "success") {
        this.contact = {} as IContanct;
      }
    },
    get_chosenContact(newVal) {
      if (newVal.id) {
        this.contact = newVal;
      }
    },
  },
});
</script>
<style scoped lang="scss">
@import "../theme/variables.scss";
.add-contact {
  margin-top: 30px;
  max-width: 600px;
  padding: 20px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 20px;

  .close-btn {
    width: 100%;
    text-align: right;

    &__img {
      width: 25px;

      &:hover {
        cursor: pointer;
      }
    }
  }
  &__form {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    &--opcity-08 {
      opacity: 0.8;
    }
  }
}
.input-field {
  margin-bottom: 2em;
  border-radius: 4px;
  padding: 10px 16px;
  font-size: 18px;
  letter-spacing: normal;

  &--error {
    border: 2px solid red;
  }
}
.loading-modal {
  position: fixed;

  top: 20%;
  opacity: 0.9;
  background: $ui-white;
  padding: 3 * $basic-margin;
  font-size: $ui-font-size-large-header;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3 * $basic-margin;
}
</style>
