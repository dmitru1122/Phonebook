import { createStore } from "vuex";
import axios from "axios";
import { IContanct } from "@/interfaces/appInterfaces";

let status: "default" | "success" | "error" | "loading";

export interface State {
  contacts: Array<IContanct>;
  chosenContact: IContanct;
  statusFetchContactsLoading: typeof status;
  statusAddContactLoading: typeof status;
}

export default createStore<State>({
  state: {
    contacts: [],
    chosenContact: {} as IContanct,
    statusFetchContactsLoading: "default",
    statusAddContactLoading: "default",
  },
  getters: {
    get_contacts(state) {
      return state.contacts;
    },
    get_statusFetchContactsLoading(state): typeof status {
      return state.statusFetchContactsLoading;
    },
    get_statusAddContactLoading(state) {
      return state.statusAddContactLoading;
    },
    get_chosenContact(state) {
      return state.chosenContact;
    },
  },
  mutations: {
    setContacts(state, contacts) {
      state.contacts = contacts;
    },
    addNewContact(state, contact) {
      state.contacts = [...state.contacts, contact];
    },
    setFetchLoading(state, newStatus) {
      state.statusFetchContactsLoading = newStatus;
    },
    removeItem(state, id) {
      const i = state.contacts.map((item) => item.id).indexOf(id);
      state.contacts.splice(i, 1);
    },

    setAddLoading(state, newStatus) {
      state.statusAddContactLoading = newStatus;
      if (newStatus === "success" || newStatus === "error") {
        setTimeout(() => {
          state.statusAddContactLoading = "default";
        }, 2000);
      }
    },

    addChosenContact(state, chosenContact) {
      state.chosenContact = chosenContact;
    },
    resetChosenContact(state) {
      state.chosenContact = {} as IContanct;
    },
    updatedContactsDependsOnChosenContact(state, chosenContact) {
      state.contacts = state.contacts.map((item) => {
        console.log(item);
        console.log(chosenContact);
        if (item.id === chosenContact.id) {
          return chosenContact;
        }
        return item;
      });
    },
  },
  actions: {
    async fetchContacts({ commit }): Promise<void> {
      try {
        commit("setFetchLoading", "loading");
        const { data } = await axios.get<IContanct[]>(
          "http://localhost:3000/posts"
        );
        commit("setContacts", data);
        commit("setFetchLoading", "success");
      } catch (e) {
        console.error(e);
        commit("setFetchLoading", "error");
      }
    },

    async addContacts({ commit }, constact: IContanct): Promise<void> {
      try {
        commit("setAddLoading", "loading");

        const { data } = await axios.post<{ message: string; data: any }>(
          `http://localhost:3000/posts`,
          constact
        );

        commit("addNewContact", data);
        commit("setAddLoading", "success");
      } catch (e) {
        console.error(e);
        commit("setAddLoading", "error");
      }
    },
    async deleteContact({ commit }, id): Promise<void> {
      try {
        await axios.delete<{ message: string; data: any }>(
          `http://localhost:3000/posts/${id}`
        );

        commit("removeItem", id);
      } catch (e) {
        console.error(e);
      }
    },
    updatedChosenContact({ commit }, chosenContact: IContanct): void {
      commit("addChosenContact", chosenContact);
    },
    removeChosenContact({ commit }): void {
      commit("resetChosenContact");
    },

    async updateContact({ commit }, chosenContact: IContanct): Promise<void> {
      try {
        console.log(chosenContact);
        await axios.put<{ message: string; data: any }>(
          `http://localhost:3000/posts/${chosenContact.id}`,
          chosenContact
        );
        commit("updatedContactsDependsOnChosenContact", chosenContact);
      } catch (e) {
        console.error(e);
      }
    },
  },
  modules: {},
});
