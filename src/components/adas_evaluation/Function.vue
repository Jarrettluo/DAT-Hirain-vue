<template>
  <div>
    <el-card class="box-card">
      <el-form :model="adas_funcs">
        <!-- 'check' 为true或者false -->
        <div
          class="text item"
          style="padding-top:0px;"
        >
          <el-checkbox
            v-model="adas_funcs.acc"
            ref="xx"
          >
            ACC 功能
          </el-checkbox>
        </div>
        <div>
          <el-checkbox v-model="adas_funcs.aeb">
            AEB 功能
          </el-checkbox>
        </div>
        <div class="text item">
          <el-checkbox v-model="adas_funcs.fcw">
            FCW 功能
          </el-checkbox>
        </div>
        <div>
          <el-checkbox v-model="adas_funcs.ldw">
            LDW 功能
          </el-checkbox>
        </div>
        <div class="text item">
          <el-checkbox v-model="adas_funcs.bsd">
            BSD 功能
          </el-checkbox>
        </div>
        <div>
          <el-checkbox v-model="adas_funcs.ibeo">
            IBEO 功能
          </el-checkbox>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return{
      adas_funcs:{
        acc:false,
        aeb:false,
        fcw:false,
        ldw:false,
        bsd:false,
        ibeo:false
      },
    }
  }
}
</script>


<style scoped>
    .el-card {
    padding-top: -10px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 100%;
  }
</style>