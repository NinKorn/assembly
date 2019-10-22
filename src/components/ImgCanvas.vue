<template>
  <div class="img-canvas">
    <input type="file" @change="getFile" />
    <!-- list-type="picture-card" -->
    <el-upload
      :action="url"
      ref="upload"
      list-type="picture"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :on-change="onChange"
      :auto-upload="false"
      :on-success="onSuccess"
    >
      <!-- :accept="accept" -->
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    </el-upload>

    <el-dialog :visible.sync="dialogVisible">
      <div v-if="type ==='image/png'||type ==='image/gif'||type ==='image/jpeg'">
        <img width="100%" :src="dialogImageUrl" alt />
      </div>
      <div v-if="type ==='application/pdf'" class="pdf">
        <pdf :src="dialogImageUrl"></pdf>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import pdf from "vue-pdf";

export default {
  props: {
    url:{
      type:String
    },
    color: {
      type: String,
      default: "#dedede"
    },
    text: {
      type: String,
      default: "DTGD-WEB"
    },
    fontSize: {
      type: String,
      default: "25px"
    },
    rotate:{
      type: String,
      default: "-45"
    },
    leftX:{
      type: Number,
      default: 0
    },
    topY:{
      type: Number,
      default: 0
    },
    position:{
      type: String,
      default:"rightBottom" //rightBottom / leftTop /center
    }
  },
  data() {
    return {
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      accept: "image/png,image/gif,image/jpeg,application/pdf", //支持上传类型
      type: ""
    };
  },
  components: {
    pdf
  },
  methods: {
    getFile(e) {
      //原生选择文件改变图片
      let getImg = e => {
        // 获取图片得到内容高度
        return new Promise((resolve, reject) => {
          let imgSrc = window.URL.createObjectURL(e.target.files[0]);
          // console.log(imgSrc);
          let img = new Image();
          img.src = imgSrc;
          img.onload = function() {
            resolve({
              width: img.width,
              height: img.height,
              img: img
            });
          };
        });
      };
      getImg(e).then(res => {
        this.width = res.width;
        this.height = res.height;
        var canvas = document.createElement("canvas");
        canvas.width = res.width;
        canvas.height = res.height;
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, res.width, res.height);
        ctx.drawImage(res.img, 0, 0, res.width, res.height);
        // 将canvas的透明背景设置成白色
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < imageData.data.length; i += 4) {
          // 当该像素是透明的，则设置成白色
          if (imageData.data[i + 3] == 0) {
            imageData.data[i] = 255;
            imageData.data[i + 1] = 255;
            imageData.data[i + 2] = 255;
            imageData.data[i + 3] = 255;
          }
        }
        ctx.putImageData(imageData, 0, 0);
        ctx.globalCompositeOperation = "source-over";
        // ctx.fillStyle = "#fff";
        ctx.strokeStyle = this.color;
        // ctx.rotate(45 * Math.PI/180);
        ctx.font = `${this.fontSize} Adobe Ming Std`;
        for (var i = 0; i < res.height / 100; i++) {
          for (var j = 0; j < res.width / 150; j++) {
            ctx.fillText(this.text, j * 150, i * 100);
          }
        }
        ctx.stroke();
        let canvasImg = canvas.toDataURL("image/jpeg");
        // let canvasImg = canvas.toDataURL("image/png");
        this.canvasImgUrl = canvasImg;
      });
    },
    getImg(file) {
      // 获取图片得到内容高度
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = file.url;
        img.onload = function() {
          resolve({
            width: img.width,
            height: img.height,
            img: img
          });
        };
      });
    },
    changeImg(img) {
      //将图片添加水印
      return new Promise((resolve, reject) => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, img.width, img.height);
        ctx.drawImage(img.img, 0, 0, img.width, img.height);
        // 将canvas的透明背景设置成白色
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < imageData.data.length; i += 4) {
          // 当该像素是透明的，则设置成白色
          if (imageData.data[i + 3] == 0) {
            imageData.data[i] = 255;
            imageData.data[i + 1] = 255;
            imageData.data[i + 2] = 255;
            imageData.data[i + 3] = 255;
          }
        }
        ctx.putImageData(imageData, 0, 0);
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = this.color;
        ctx.font = `${this.fontSize} Adobe Ming Std`;
        ctx.textAlign="center"
        if(this.position == 'rightBottom'){
          ctx.translate(img.width-ctx.measureText(this.text).width/2-this.leftX, img.height-10-this.topY);
        }else if(this.position == 'center'){
          ctx.translate(img.width/2+this.leftX, img.height/2+this.topY);
        }else if(this.position == 'leftTop'){
          ctx.translate(this.leftX+ctx.measureText(this.text).width/2,this.topY+20);
        }
        
        ctx.rotate((this.rotate * Math.PI) / 180);
        ctx.fillText(this.text, 0, 0);
        ctx.stroke();
        let canvasImg = canvas.toDataURL("image/jpeg");
        // let canvasImg = canvas.toDataURL("image/png");
        resolve({
          canvasImg: canvasImg,
          height: img.height,
          width: img.width
        });
      });
    },
    handleRemove(file, fileList) {
      //文件列表删除
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file);
      this.type = file.raw.type;
      this.dialogImageUrl = file.url;
      console.log(this.type);
      this.dialogVisible = true;
    },
    beforeUpload(file) {
      //上传前
      console.log(file, "上传前");
    },
    onChange(file, fileList) {
      if (file.raw.type == "application/vnd.ms-excel") {
        this.$refs.upload.submit(); //手动传
      } else if (file.raw.type == "image/png" || "image/gif" || "image/jpeg") {
        this.getImg(file)
          .then(res => {
            return this.changeImg(res);
          })
          .then(res => {
            fileList.forEach(item => {
              if (item.uid == file.uid) {
                item.url = res.canvasImg;
              }
            });
            file.name = "被改变.jpg";
            file.url = res.canvasImg;
            console.log(file);
            console.log("执行上传");
            this.$refs.upload.submit(); //手动传
          });
      }
    },
    onSuccess(response, file, fileList) {
      console.log(response, file, fileList, "上传成功");
    }
  }
};
</script>