<template>
  <div class="file">
    <h2>文件预览</h2>
    <div class="pdf">
      <file-preview :url="ppturl"
                    :title="`PPT`"></file-preview>
      <file-preview :url="img"></file-preview>
      <file-preview :url="wordurl"></file-preview>
      <file-preview :url="pdfurl"></file-preview>
      <file-preview :url="excel"></file-preview>
      <file-preview :url="videourl"></file-preview>
      <file-preview :url="gifurl"
                    :title="`gif图`"></file-preview>
      <file-preview :url="`../assets/logo.avi`"
                    :title="`avi`"></file-preview>
      <file-preview :url="mp3"
                    :title="`MP3`"></file-preview>
    </div>
  </div>
</template>
<script>
import FilePreview from "../components/FilePreview";
export default {
  data () {
    return {
      mp3: `https://webfs.yun.kugou.com/201910171527/574f7c1a69aec5818e74940b04ff0849/G164/M07/18/00/5A0DAF1JLquAR_SBAD4H2NEVSKk072.mp3`,
      url: ``,
      pdfurl: ``,
      wordurl: ``,
      ppturl: ``,
      excel: ``,
      img: ``,
      videourl: ``,
      gifurl: ``
    };
  },
  components: {
    "file-preview": FilePreview
  },
  mounted () {
    // https://view.officeapps.live.com/op/embed.aspx?src= 微软在线服务
    // http://view.officeapps.live.com/op/view.aspx?src=
    // https://docs.google.com/gview?url= 谷歌在线服务
    this.excel = `http%3A%2F%2Fofficeweb365.com%2Fviewfile%2F在线预览Office服务费用说明（预览示例文件）.xlsx&p=1`;
    this.img = `https://img.zcool.cn/community/0115df5d9fd69ea8012060be5d9303.jpg@1280w_1l_2o_100sh.jpg`;
    this.pdfurl = `http://image.cache.timepack.cn/nodejs.pdf`;
    this.wordurl = `http://ieee802.org/secmail/docIZSEwEqHFr.doc&embedded=true`;
    // this.wordurl = `http%3A%2F%2Fofficeweb365.com%2Fviewfile%2F关于加快临时设施建设速度和保证建设标准的通知.docx&p=1`;
    this.ppturl = `http%3A%2F%2Fofficeweb365.com%2Fviewfile%2F深入浅出HTML5游戏开发.pptx&p=1`;
    this.videourl = `https://n.v.netease.com/2019/0620/ca424ff5a899678bdc3ab0cdb2484d62qt.mp4`;
    this.gifurl = `http://wx2.sinaimg.cn/mw690/5eef6257gy1fyuaelpqbwg206709tnpd.gif`;
  },
  methods: {
    lookpdf () {
      let url = "http://image.cache.timepack.cn/nodejs.pdf"; // 有效 服务器配置跨域处理
      window.open("/static/pdf/web/viewer.html?file=" + url);
    }
  }
};
</script>
<style lang="less">
audio:focus {
  outline: none !important;
}
</style>