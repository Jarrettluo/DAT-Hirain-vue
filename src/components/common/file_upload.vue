<template>
  <div>
    <el-upload
      class="upload"
      ref="upload"
      action="http://localhost:5000/upload_file"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :auto-upload="false"
      :on-success="handleSuccess"
      accept=".jpg"
    >
      <el-button
        slot="trigger"
        size="small"
        type="primary"
      >
        点击上传
      </el-button>
    
      <!-- 这里是上传到服务器的按钮 -->
      <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->

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
          // {
          // name: 'food.jpeg',
          // url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          // },
          // {
          //   name: 'food2.jpeg',
          //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          // }
          ]
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleSuccess(info, file, fileList){
        this.$message.info('成功！')
      }

    }
  }
</script>