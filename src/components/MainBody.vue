<template>
    <el-container style="margin-top:-8px;">
      <el-header >
          <Header></Header>
      </el-header>
      <el-container>
            <el-aside width="200px" v-if="aside_flag">
                <div class="user-panel">
                  <div class="user-avater">
                    <i class="el-icon-user-solid" style="font-size:42px;margin:6px;"></i>
                  </div>
                  <div class="user-info">
                    <div class="user-name"><strong style="color:#595959;">Admin</strong></div>
                    <div class="user-role" style="color:#cccbcb;"><small>administrator</small></div>
                  </div>
                </div>
                <Aside></Aside>
            </el-aside>
          <el-container>
            <el-main>
                <Main></Main>
            </el-main>
            <!-- <el-footer>
                <Footer></Footer>
            </el-footer> -->
          </el-container>
      </el-container>
    </el-container>
</template>

<script>
    import Header from  './Header'
    import NavBar from './Nav'
    import Main from './Body'
    // import Footer from './Footer'

export default {
  data(){
    return{
      aside_flag:true,
    }
  },
  components:{
    Header: Header,
    Aside: NavBar,
    Main: Main,
    // Footer: Footer,
  },
  created(){
    this.turn_off_aside()
  },
  methods:{
    // 当某些域名时隐藏其真实
    turn_off_aside(){
      if (this.$route.path=='/team'){
        this.aside_flag = false;
      }else{
        this.aside_flag = true;
      }
    }
  }
}
</script>

<style>
  .user-panel{
     background-color:#f5f5f5;
     margin: 26px 12px 12px 12px;
     height: 70px;
     border-radius: 3px;
  }

  .user-avater{
    background-color: #cccbcb;
    width: 54px;
    float: left;
    margin: 10px;
    height: 54px;
    border-radius: 54px;
  }

  .user-info{
    /* background-color: red ; */
    width: 50%;
    float: left;
    margin-top: 20px;
  }

  .el-header, .el-footer {
    /* background-color: #108ee9; */
    background: #56ccf2;  /* fallback for old browsers */      background: -webkit-linear-gradient(to right, rgb(86, 204, 242), rgb(47, 128, 237));  /* Chrome 10-25, Safari 5.1-6 */      background: linear-gradient(to right, rgb(86, 204, 242), rgb(47, 128, 237)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */      
    color: #ffffff;
    text-align: center;
    /* line-height: 80px; */
    /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) */
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  
  
  
  .el-aside {
    background-color: #ffffff;
    color: #ffffff;
    text-align: left;
    /* line-height: 200px; */
    min-height: 850px;
  }
  
  .el-main {
    background-color: #f5f7fa;
    color: #595959;
    text-align: left;

  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  h1{
        font-family: "PingFang SC";
        font-size:24px;
        font-weight: normal;
    }
    h2 {
        font-family: "PingFang SC";
        font-size:20px;
        font-weight: normal;
    }


</style>