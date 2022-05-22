<template>
  <div class="container">
    <div class="text-center">
      <div class="select">
        <div id="select-detail">
          <h2>
            {{ name }}さん
          </h2>
          <!-- <p>出勤内容を選択してください</p> -->
          <select v-model="workingDetail">
            <option selected disabled value="-1">選択してください</option>
            <option value="3">１日勤務</option>
            <option value="2">半日勤務</option>
            <option value="0">休み</option>
          </select>
          <p>えらんだの：{{ workingDetail }}</p>
        <div class="mt-5">
          <router-link to="/"><button class="btn btn-primary" :disabled="fixedDisabled">確定</button></router-link>
          <router-link to="/"><button class="btn btn-primary">戻る</button></router-link>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
 export default {
    props: ['name'],
    // el: "#select-detail",
    data() {
      return {
        workingDetail: "-1",
        fixedDisabled: true
      }
    },
    watch: {
      workingDetail(newVal, oldVal) {
        if(this.workingDetail !== "-1") {
          console.log("newVal:" + newVal);
          this.fixedDisabled = false
        } else {
          this.fixedDisabled = true
        }
          // console.log("oldVal:" + oldVal);
      },
    },

  }

  // export default {
  //   props: ['name'],
  //   data: {
  //     workingDetail: "",
  //     fixedDisabled: false
  //   },
  //   watch: {
  //     workingDetail(newVal, oldVal) {
  //       if(this.workingDetail) {
  //         console.log("newVal:" + newVal);
  //         this.fixedDisabled = true
  //       } else {
  //         this.fixedDisabled = false
  //       }
  //         // console.log("oldVal:" + oldVal);
  //     },
  //   },
  //   methods: {
  //   onclick() {
  //   this.$router.push('/')
  //     }
  //   },
  // }

</script>