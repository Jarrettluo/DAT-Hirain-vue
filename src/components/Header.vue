<template>
  <el-row :gutter="20">
    <el-col
      :span="4"
      :xs="8"
      :lg="3"
    >
      <div class="grid-content bg-purple">
        <a
          href="index"
          style="text-align:left;"
        >
          <el-image
            style="width: 180px; height: 66px; margin-top: 0px;"
            :src="url"
            fit="contain"
          /></a>
      </div>
    </el-col>
    <el-col
      :span="16"
      :xs="8"
      :lg="18"
    >
      <div class="grid-content bg-purple">
        <p />
      </div>
    </el-col>
    <el-col
      :span="4"
      :xs="8"
      :lg="3"
    >
      <div
        class="grid-content bg-purple"
        style="margin-top:20px;text-align:right;"
      >
        <el-dropdown>
          <span class="el-dropdown-link" style="margin-top:50px;"> <i class="el-icon-user-solid" /></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Guide</el-dropdown-item>
            <el-dropdown-item>Feature</el-dropdown-item>
            <el-dropdown-item divided>logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
        data() {
      return {
        url: require('../assets/new_log.png')
        //             style="width: 180px; height: 32px; margin-top: 16px;"
      }
    }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
    text-align: left;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>