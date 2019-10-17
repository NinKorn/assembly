import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import ImageViewer from 'vue2-viewer';
import VideoPlayer from 'vue-video-player'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VideoPlayer)
Vue.use(ImageViewer);
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
