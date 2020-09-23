<template>
  <el-select
    v-model="value"
    placeholder="请选择"
  >
    <el-option-group
      v-for="group in options"
      :key="group.label"
      :label="group.label"
    >
      <el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-option-group>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          label: '历史选择',
          options: [{
            value: 'xxxx.dbc',
            label: 'xxxx.dbc'
          }, {
            value: 'yyyy.dbc',
            label: 'yyyy.dbc'
          }]
        }, {
          label: '已上传的DBC',
          options: [{
            value: 'Chengdu',
            label: 'zzzz.dbc'
          }, {
            value: 'Shenzhen',
            label: 'aaaa.dbc'
          }, {
            value: 'Guangzhou',
            label: 'bbbb.dbc'
          }, {
            value: 'Dalian',
            label: 'kkkk.dbc'
          }]
        }],
        value: ''
      }
    }
  }
</script>