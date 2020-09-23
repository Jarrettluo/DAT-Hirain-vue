<template>
    <el-container style=" border: 1px solid #eee;">
         <el-main style="display:inline;inline-height:30px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">ADAS功能评估</el-breadcrumb-item>
                <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
            </el-breadcrumb>
            <p></p>
            <h1>fig绘图</h1>
            
        </el-main>
    </el-container>
</template>

<script>
export default {
    
}
</script>
