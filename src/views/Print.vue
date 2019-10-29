<template lang="html">
    <div class="print">
        <div id="receipt" class="chen">
            武汉
            <div class="bottom">
                底部
            </div>
        </div>
        <button id="ww" @click="print" >打印</button>
        <div class="aa">
            我是页面
        </div>
    </div>
</template>
<script>

export default {
  data () {
    return {

    }
  },
  methods: {
    print () {
      this.printpage('receipt')
    },
    printpage (myDiv) {
      var newstr = document.getElementById(myDiv).innerHTML
      var oldstr = document.body.innerHTML
      document.body.innerHTML = newstr
      window.print()
      document.body.innerHTML = oldstr
      window.location.reload()
      return false
    }
  },
}
</script>
<style>
@media print {
  .chen {
    color: red;
    -webkit-print-color-adjust: exact;
  }
  .bottom {
    background-color: skyblue;
    color: #fff;
    -webkit-print-color-adjust: exact;
  }
}
</style>
