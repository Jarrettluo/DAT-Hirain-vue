<template>
  <div>
    <el-upload
      class="upload"
      action="http://localhost:5000/DataAnalysis/DbcData/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="1"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :on-success="handleSuccess"
      ref="upload"
      accept=".dbc"
    >
      <el-button
        size="small"
        type="primary"
      >
        点击上传
      </el-button>
      <div
        slot="tip"
        class="el-upload__tip"
      >
        只能上传.clg文件，且不超过50MB
      </div>
    </el-upload>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fileList: [
          ]
      };
    },
    methods: {
      handleRemove(file, fileList) {
        // console.log(file, fileList);
      },
      handlePreview(file) {
        // console.log(file);
      },
      // 上传个数超出限制！
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleSuccess(response, file, fileList){
        if (response.code == 1200){
          this.$message.info(file.name + '上传成功！');
          let flag = response.data
          this.$emit('closeMain',flag); // 将结果发送到父组件
        }else{
          this.$message.error('解析失败！重新提交！')
          this.$refs.upload.clearFiles() // 清空文件列表
        }
      }
    }
  }
</script>