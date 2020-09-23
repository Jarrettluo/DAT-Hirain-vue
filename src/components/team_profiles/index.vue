<template>
    <div class="team_body">
        <div class="team_header">
            <h2>TEAM</h2>
        </div>
        <div class="team_main">
          <el-row>
            <el-col :span="8" v-for="item in team[0]" :key="item.id">
                <div class="team_img">
                    <el-image
                        style="width: 119px; height: 110px"
                        :src="item.url"
                        fit="fill"></el-image>
                </div>
                <div class="team_profile">
                    <span class="person_name">{{ item.name }}</span><br><br>
                    <span class="person_profile">{{ item.profile }}</span>
                </div>
                </el-col>
            <el-col :span="8"><div class=""></div></el-col>
            <el-col :span="8"><div class=""></div></el-col>
          </el-row>
        </div>
    </div>    
</template>

<script>
export default {
    data(){
        return {
            team:[
                [
                {id:1, url:require("@/assets/team/jiarui_luo.jpg"),name:'Luo Jiarui',profile:'while(true) run!'},
                {id:2, url:require("@/assets/team/yunjiang_qu.jpg"),name:'Qu Yunjiang',profile:'Python heals everything!',},
                {id:3, url:require("@/assets/team/xiaowei_mao.jpg"),name:'Mao Xiaowei',profile:'Never quit!',}
            ],
            []
            ]


        }
    },
    created(){
        this.turn_off_aside()
    },
    methods:{
        turn_off_aside(){

        }
    }
}
</script>

<style scoped>
    .team_body{
        width: 1200px;
        margin: auto;
    }
    .team_header{
        padding: 153px 0px 50px 0px;
        text-align: center;
    }
    h2{
        font-size: 38px;
        font-style: normal;
    }
    .team_main{
        min-height: 480px;
    }
    .team_img{
        float: left;
    }
    .team_profile{
        float: left;
        padding: 5px 0px 0px 19px;
    }
    .person_name{
        font: 21px bold;
    }
    .person_profile{
        font: 14px normal;
        padding: 20px 0px;
    }
</style>