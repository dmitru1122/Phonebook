import { createStore } from "vuex";
import axios from "axios";
import { IContanct } from "@/interfaces/appInterfaces";

export interface State {
  contacts: Array<IContanct>;
  choosenContact: IContanct;
  isFetchContactsLoading: boolean;
  statusAddContactLoading: string;
}

export default createStore<State>({
  state: {
    contacts: [],
    choosenContact: {} as IContanct,
    isFetchContactsLoading: false,
    statusAddContactLoading: "default",
  },
  getters: {
    get_contacts(state) {
      return state.contacts;
    },
    get_isFetchContactsLoading(state) {
      return state.isFetchContactsLoading;
    },
    get_statusAddContactLoading(state) {
      return state.statusAddContactLoading;
    },
  },
  mutations: {
    setContacts(state, contacts) {
      state.contacts = contacts;
    },
    addNewContact(state, contact) {
      state.contacts = [...state.contacts, contact];
    },
    setFetchLoading(state, bool) {
      state.isFetchContactsLoading = bool;
    },
    removeItem(state, id) {
      const i = state.contacts.map((item) => item.id).indexOf(id);
      state.contacts.splice(i, 1);
    },
    setAddLoading(state, bool) {
      state.statusAddContactLoading = bool;
      if (bool === "success" || bool === "error") {
        setTimeout(() => {
          state.statusAddContactLoading = "default";
        }, 2000);
      }
    },
  },
  actions: {
    async fetchContacts({ state, commit }): Promise<void> {
      try {
        commit("setFetchLoading", true);
        const { data } = await axios.get<IContanct[]>(
          "http://localhost:3000/posts"
        );
        commit("setContacts", data);
      } catch (e) {
        console.error(e);
      } finally {
        commit("setFetchLoading", false);
      }
    },

    async addContacts({ state, commit }, form): Promise<void> {
      try {
        commit("setAddLoading", "loading");

        const { data } = await axios.post<{ message: string; data: any }>(
          `http://localhost:3000/posts`,
          form
        );

        commit("addNewContact", data);
        commit("setAddLoading", "success");
      } catch (e) {
        console.error(e);
        commit("setAddLoading", "error");
      }
    },
    async deleteContact({ state, commit }, id): Promise<void> {
      try {
        await axios.delete<{ message: string; data: any }>(
          `http://localhost:3000/posts/${id}`
        );

        commit("removeItem", id);
      } catch (e) {
        console.error(e);
      }
    },
  },
  modules: {},
});
