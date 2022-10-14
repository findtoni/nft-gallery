import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './assets/styles/tailwind.css';
import './assets/global.scss';
import 'ant-design-vue/dist/antd.css';

createApp(App)
  .use(createPinia())
  .mount('#app');