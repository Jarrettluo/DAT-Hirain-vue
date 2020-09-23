<template>
    <el-container style="height: 500px; border: 1px solid #eee">
         <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
            </el-breadcrumb>
            <router-view></router-view>
                    <h1>ADAS功能对标产品页面</h1>
        </el-main>
    </el-container>
</template>