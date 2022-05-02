import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Phonebook from "@/pages/Phonebook.vue";
import EditContact from "@/pages/EditContact.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "phonebook",
    component: Phonebook,
  },
  {
    path: "/edit",
    name: "editContact",
    component: EditContact,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
