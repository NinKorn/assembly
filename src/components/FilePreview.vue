<style lang="less">
.popover-img {
  display: inline-block;
  position: relative;
  span > img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
}
.video-js .vjs-big-play-button {
  width: 72px;
  height: 72px;
  border-radius: 100%;
  z-index: 100;
  background-color: #ffffff;
  border: solid 1px #979797;
}
.popover-box {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.9);
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 9;
  display: none;
  opacity: 0;
  // transform: translateY(100%);
  &.active {
    display: block;
    animation: boxshow 0.5s ease-in-out 0s forwards;
  }

  .video-player {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
  }
  .close {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-40%, 40%);
    // width: 30px;
    // height: 30px;
    // background-color: rgba(0, 0, 0, 0.8);
    // border-radius: 50%;
    cursor: pointer;
    font-size: 12px;
    color: #ffffff;
  }
  
}
.title {
  cursor: pointer;
}
.audio {
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  .close {
    position: absolute;
    z-index: 9;
    right: 0;
    font-size: 12px;
    cursor: pointer;
  }
  &.active {
    display: block;
    animation: boxshow 0.5s ease-in-out 0s forwards;
  }
}
@keyframes boxshow {
    from {
      opacity: 0;
      // transform: translateY(100%);
    }
    to {
      opacity: 1;
      // transform: translateY(0%);
    }
  }
</style>
<template>
  <div class="file-preview">
    <!-- 图片预览 -->
    <div class="popover-img" v-if="fileType=='img'">
      <!-- 默认小图 :thumb="url" -->
      <span class="title">{{titleView}}</span>
      <vue-viewer style="display: inline-block" :thumb="url" :full="url"></vue-viewer>
    </div>
    <!-- 文件预览 PPT PDF EXCEL WODRD-->
    <div class="popover-file" v-if="fileType=='file'">
      <span class="title" @click="open('showFile')"  >{{titleView}}</span>
      <!-- <a :href="addressUrl" target="_blank">{{ title }}在线预览</a> -->
    </div>    

    <!-- 视频预览 -->
    <div class="popover-video" v-if="fileType== 'video'">
      <span class="title" @click="open('showVideo')">{{titleView}}</span>
    </div>

    <!-- 其它视频格式 -->
    <div class="popover-file" v-if="fileType=='athorVideo'">
      <span class="title" @click="open('showAthorVideo')">{{titleView}}</span>
    </div>

    <!-- MP3格式 -->
    <div class="popover-file" v-if="fileType=='audio'">
      <span class="title" @click="open('showAudio')">{{titleView}}</span>
    </div>

    <!-- 视频弹出层 -->
    <div :class="showVideo?'popover-box active':'popover-box'" v-if="fileType== 'video'">
      <span class="close" @click.stop="close">关闭</span>
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        style="object-fit:fill"
        :options="playerOptions"
        :x5-video-player-fullscreen="true"
        @pause="onPlayerPause($event)"
        @play="onPlayerPlay($event)"
        @fullscreenchange="onFullscreenChange($event)"
        @click="fullScreen"
      ></video-player>
      <!-- <video-player class="video-player vjs-custom-skin"
                      ref="positiveVideoPlayer"
                      :playsinline="true"
                      :options="positivePlayerOptions"
      ></video-player>-->
    </div>

    <!-- 文档类型弹出层 -->

    <div :class="showFile?'popover-box active':'popover-box'" v-if="fileType== 'file'">
      <span class="close" @click.stop="close">关闭</span>
      <!-- <iframe :src="addressUrl" type="application/x-google-chrome-pdf" width="100%" height="100%" /> -->
      <embed :src="addressUrl" id="review" style="width:90%; height:100%;" />
      <!-- </embed> -->
    </div>

    <!-- 其它视频类型 avi、wmv、mov -->
    <div :class="showAthorVideo?'popover-box active':'popover-box'" v-if="fileType== 'athorVideo'">
      <span class="close" @click.stop="close">关闭</span>
      <object id="MediaPlayer" classid="clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95" width="800" height="600" standby="Loading Windows Media Player components…" type="application/x-oleobject" >
        <param name="FileName" :value="url">
        <param name="AutoStart" value="true">
        <param name="ShowControls" value="true">
        <param name="BufferingTime" value="2">
        <param name="ShowStatusBar" value="true">
        <param name="AutoSize" value="true">
        <param name="InvokeURLs" value="false">
        <param name="AnimationatStart" value="1">
        <param name="TransparentatStart" value="1">
        <param name="Loop" value="1">
        <embed type="application/x-mplayer2" :src="url" name="MediaPlayer" autostart="1" showstatusbar="1" showdisplay="1" showcontrols="1" loop="0" videoborder3d="0" pluginspage="http://www.microsoft.com/Windows/MediaPlayer/" width="800" height="600"></embed>
      </object>
    </div>

    <!-- mp3弹出层 -->
    <div :class="showAudio?'audio active':'audio'" v-if="fileType=='audio'">
      <span class="close" @click.stop="close">关闭</span>
        <audio :src="url" :preload="audio.preload" controls="controls"></audio>
    </div>
  </div>
</template>

<script>
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
export default {
  props: {
    url: {
      type: String
    },
    title: {
      type: String
    }
  },
  data() {
    return {
      value: "",
      titleUrl: "https://view.officeapps.live.com/op/embed.aspx?src=", // 微软 资源必须是公共可访问的
      addressUrl: "", //最后访问文件地址
      fileType: "",
      titleView: "",
      showVideo: false, // 视频预览弹出层
      showFile: false, //文件预览弹出层
      showAthorVideo:false,//其它视频类型
      showAudio:false,
      playerOptions: {
        //视频插件配置
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/ogg",
            type: "video/webm",
            type: "video/mp4",
            src: "" //视频地址
          }
        ],
        // poster:
        //   "https://img.zcool.cn/community/0115df5d9fd69ea8012060be5d9303.jpg@1280w_1l_2o_100sh.jpg", //封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          // timeDivider: true,
          // durationDisplay: true,
          // remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      },
      audio: {
        currentTime: 0,
        maxTime: 0,
        playing: false, //是否自动播放
        muted: false, //是否静音
        speed: 1,
        waiting: true,
        preload: "auto"
      },
    };
  },
  methods: {
    open(text){ //打开弹出层
      this[text] = true;
    },
    close() {//关闭弹出层
      this.showVideo = false;
      this.showAthorVideo = false;
      this.showFile = false;
      this.showAudio = false;
    },
    fullScreen() {
      const player = this.$refs.videoPlayer.player;
      player.requestFullscreen(); //调用全屏api方法
      player.isFullscreen(true);
      player.play();
    },
    onPlayerPlay(player) {
      player.play();
    },
    onPlayerPause() {
      // console.log(player);
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  watch: {
    url: {
      immediate: true, // 这句重要
      handler() {
        var word = RegExp(/.docx/);
        var pdf = RegExp(/.pdf/);
        var ppt = RegExp(/.pptx/);
        var excel = RegExp(/.xlsx/);
        var img = RegExp(/.img|.jpg|.gif/);
        // var tif = RegExp(/.tif/);
        var video = RegExp(/.mp4|.webm|.ogg/);
        var athorVideo = RegExp(/.avi|.wmv|.mov/)
        var file = RegExp(/.docx|.pdf|.pptx|.xlsx/);
        var audio = RegExp(/.mp3/);
        if (file.test(this.url)) {// 文本.docx|.pdf|.pptx|.xlsx
          this.fileType = "file";
            if (pdf.test(this.url)) {
              this.titleView = this.title ? this.title : "PDF";
              this.addressUrl = this.url;
            }else {
              this.titleView = this.title ? this.title : "文件预览";
              this.addressUrl = this.titleUrl + this.url;
            }
        } else if (img.test(this.url)) {  //图片.img|.jpg|.gif/
          this.fileType = "img";
          this.titleView = this.title ? this.title : "图片 ";
        } else if (video.test(this.url)) { // 视频
          this.fileType = "video";
          this.titleView = this.title ? this.title : "视频 ";
          this.playerOptions.sources[0].src = this.url;
        }else if(athorVideo.test(this.url)) { //其它视频
          this.fileType = "athorVideo";
          this.titleView = this.title ? this.title : "视频 ";
        }else if(audio.test(this.url)) {
          this.fileType = "audio";
          this.titleView = this.title ? this.title : "MP3 ";
        }

        
      }
    }
  }
};
</script>
// 文件预览 可支持PDF word Excel PPT JPG GIF MP4