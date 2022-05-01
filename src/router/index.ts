import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Phonebook from "@/pages/Phonebook.vue";
import AddContact from "@/pages/AddContact.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "phonebook",
    component: Phonebook,
  },
  {
    path: "/add",
    name: "addContact",
    component: AddContact,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
