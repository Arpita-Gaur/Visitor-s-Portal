import { createApp} from 'vue';
import App from './App.vue';
import router from './router';
//import 'ant-design-vue/dist/antd.css'; // Import Ant Design styles
import Antd from 'ant-design-vue';
//import * as icons from '@ant-design/icons-vue';

import '@fortawesome/fontawesome-free/css/all.css';
const app = createApp(App);
app.use(Antd);
app.use(router).mount('#app');

