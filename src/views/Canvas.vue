<template>
  <div class="canvas">
    <h2>图片添加水印</h2>
    <img-canvas :text="'更变水印'" :color="'#000'" :fontSize="'12px'" :url="url"></img-canvas>
  </div>
</template>
<script>
import ImgCanvas from "../components/ImgCanvas";
export default {
  data() {
    return {
      url:"https://jsonplaceholder.typicode.com/posts/"
    };
  },
  components: {
    "img-canvas": ImgCanvas
  }
};
</script>