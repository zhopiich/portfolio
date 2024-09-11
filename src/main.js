import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

// createApp(App).mount("#app");
app.use(pinia);
app.mount("#app");
