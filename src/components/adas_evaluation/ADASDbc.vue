<template>
  <el-container style=" border: 1px solid #eee;">
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">
          ADAS功能评估
        </el-breadcrumb-item>
        <el-breadcrumb-item v-text="this.$router.currentRoute.name" />
      </el-breadcrumb>
      <!-- <router-view></router-view> -->
      <el-container direction="vertical">
        <h1>ADAS功能数据库提交</h1>
        <p style="margin-top:-35px;">
          提交ADAS功能的DBC文件
        </p>
        <p><br></p>
        <h2 style="margin-top:0px;">
          提交DBC文件
        </h2>
        <p style="margin-top:-10px;">
          选择本地的数据上传
        </p>
        <div class="clg-upload">
          <Header @closeMain="closeMain" />
        </div>

        <el-divider />
        <h2 style="margin-top:0px;">
          信号对应
        </h2>
        <p style="margin-top:-10px;">
          请选择ADAS功能所对应的的信号
        </p>
        <el-tabs
          v-model="activeName"
          type="card"
          @tab-click="handleClick"
        >
          <el-tab-pane
            label="ACC功能"
            name="first"
          >
            <el-form
              v-model="formACC"
              ref="formACC"
            >
              <el-table
                :data="formACC.acc_tableData"
                style="width: 100%"
              >
                <el-table-column
                  prop="signals"
                  label="信号名"
                  width="180"
                />
                <el-table-column
                  prop="notes"
                  label="备注"
                />

                <el-table-column 
                  prop="target_name"
                  label="选择TargetName"
                >
                  <!-- @change="handleChange1(selectOptions, scope.$index, scope.row)" -->
                  <template slot-scope="scope">
                    <!-- 级联选择器 -->
                    <el-cascader
                      v-model="scope.row.target_name"
                      :options="options"
                      :show-all-levels="false"
                      style="width:100%"
                    />
                  </template>
                </el-table-column>

                <el-table-column 
                  prop="target_value"
                  label="输入TargetValue"
                >
                  <!-- @change="handleChange1(selectOptions, scope.$index, scope.row)" -->
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.target_value"
                      placeholder="请输入内容"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </el-form>
          </el-tab-pane>
          
          <el-tab-pane
            label="AEB功能"
            name="second"
          >
            <el-form
              v-model="formAEB"
              ref="formAEB"
            >
              <el-table
                :data="formAEB.aeb_tableData"
                style="width: 100%"
              >
                <el-table-column
                  prop="signals"
                  label="信号名"
                  width="180"
                />
                <el-table-column
                  prop="notes"
                  label="备注"
                />

                <el-table-column 
                  prop="target_name"
                  label="选择TargetName"
                >
                  <!-- @change="handleChange1(selectOptions, scope.$index, scope.row)" -->
                  <template
                    slot-scope="scope"
                    style="width:100%"
                  >
                    <!-- 级联选择器 -->
                    <el-cascader
                      v-model="scope.row.target_name"
                      :options="options"
                      :show-all-levels="false"
                      style="width:100%"
                    />
                  </template>
                </el-table-column>

                <el-table-column 
                  prop="target_value"
                  label="输入TargetValue"
                >
                  <!-- @change="handleChange1(selectOptions, scope.$index, scope.row)" -->
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.target_value"
                      placeholder="Please input value"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </el-form>
          </el-tab-pane>
          <el-tab-pane
            label="FCW功能"
            name="third"
          >
            <el-form
              v-model="formFCW"
              ref="formFCW"
            >
              <el-table
                :data="formFCW.fcw_tableData"
                style="width: 100%"
              >
                <el-table-column
                  prop="signals"
                  label="信号名"
                  width="180"
                />
                <el-table-column
                  prop="notes"
                  label="备注"
                />

                <el-table-column 
                  prop="target_name"
                  label="选择TargetName"
                >
                  <!-- @change="handleChange1(selectOptions, scope.$index, scope.row)" -->
                  <template slot-scope="scope">
                    <!-- 级联选择器 -->
                    <el-cascader
                      v-model="scope.row.target_name"
                      :options="options"
                      :show-all-levels="false"
                      style="width:100%"
                    />
                  </template>
                </el-table-column>

                <el-table-column 
                  prop="target_value"
                  label="输入TargetValue"
                >
                  <!-- @change="handleChange1(selectOptions, scope.$index, scope.row)" -->
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.target_value"
                      placeholder="请输入内容"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </el-form>
          </el-tab-pane>
          <el-tab-pane
            label="LDW功能"
            name="fourth"
          >
            <el-form
              v-model="formLDW"
              ref="formLDW"
            >
              <el-table
                :data="formLDW.ldw_tableData"
                style="width: 100%"
              >
                <el-table-column
                  prop="signals"
                  label="信号名"
                  width="180"
                />
                <el-table-column
                  prop="notes"
                  label="备注"
                />

                <el-table-column 
                  prop="target_name"
                  label="选择TargetName"
                >
                  <!-- @change="handleChange1(selectOptions, scope.$index, scope.row)" -->
                  <template slot-scope="scope">
                    <!-- 级联选择器 -->
                    <el-cascader
                      v-model="scope.row.target_name"
                      :options="options"
                      :show-all-levels="false"
                      style="width:100%"
                    />
                  </template>
                </el-table-column>

                <el-table-column 
                  prop="target_value"
                  label="输入TargetValue"
                >
                  <!-- @change="handleChange1(selectOptions, scope.$index, scope.row)" -->
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.target_value"
                      placeholder="请输入内容"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-divider />


        <el-button
          type="primary"
          plain
          @click="submit()"
        >
          提交文件
        </el-button>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import Header from '../common/dbc_upload'
import axios from 'axios'

export default {
    data() {
      return {
        formACC:{},
        acc_tableData:[],

        formAEB:{},
        aeb_tableData:[],

        formFCW:{},
        fcw_tableData:[],

        formLDW:{},
        ldw_tableData:[],

        tableData1:[],
        activeName:'third',
        value:[],
        options: [],
        selectOptions: [],
      }
    },
    
    methods: {
    handleClick(tab, event) {
        // console.log(tab, event);
    },

    handleChange(value) {
      // console.log(value);
    },
    handleChange1(selectOptions, index, row) {
      // console.log(selectOptions);
      // console.log(index, row);
    },

    closeMain(signal_names){
        var option_list = [];
        var x;
        var children_content = {};

        // 获取ACC的信号和备注
        var acc_table = []
        for(x in signal_names['acc']){
          acc_table.push({
            'signals': signal_names['acc'][x],
            'notes': signal_names['acc_note'][x],
          })
        }
        this.formACC.acc_tableData = acc_table;
        // this.reload();

        var aeb_table = []
        for(x in signal_names['aeb']){
          aeb_table.push({
            'signals': signal_names['aeb'][x],
            'notes': signal_names['aeb_note'][x],
          })
        }
        this.formAEB.aeb_tableData = aeb_table;

        var fcw_table = []
        for(x in signal_names['fcw']){
          fcw_table.push({
            'signals': signal_names['fcw'][x],
            'notes': signal_names['fcw_note'][x],
          })
        }
        this.formFCW.fcw_tableData = fcw_table;


        var ldw_table = []
        for(x in signal_names['ldw']){
          ldw_table.push({
            'signals': signal_names['ldw'][x],
            'notes': signal_names['ldw_note'][x],
          })
        }
        this.formLDW.ldw_tableData = ldw_table;


        var dbc_signal = signal_names['dbc']
        var dbc_id = signal_names['dbc_id']
        for(x in dbc_signal){
          children_content = {value:dbc_signal[x],
                      label:dbc_signal[x]}
          option_list.push(children_content)
        }
        this.options= [{value: dbc_id,
                     label: 'Messsage Name',
                     children: option_list,
        }];
        this.activeName='first';

        return this.xxx;
      },

    submit(){
      var result = {}
      result['acc'] = this.formACC.acc_tableData
      result['aeb'] = this.formAEB.aeb_tableData
      result['fcw'] = this.formFCW.fcw_tableData
      result['ldw'] = this.formLDW.ldw_tableData
      const path = 'http://localhost:5000/DataAnalysis/DbcData/';
      var msg = this.$message
      // this.init_state()
      if(result['acc']){
        axios
        .put(path, result)
        .then(
          res => {
            // this.book = res.data.books;
            if(res.data.code == 1200){
                // this.init_state() // 调用另外一个函数
                msg.info('提交成功')
            }
          }
        )
        .catch(error =>{
          console.error(error);
        })
      }else{
        this.$message.info('请提交文件！');
      }
      this.formACC = {};
      this.formAEB = {};
      this.formFCW = {};
      this.formLDW = {};
      this.activeName = 'first';

    }
    },
    init_state(){
      this.formACC = {};
      this.formAEB = {};
      this.formFCW = {};
      this.formLDW = {};
      this.activeName = 'first';
    },
    components:{
        Header: Header,
    }
};
</script>

<style >
.signal-name{
  padding-top: 10px;
  color:#5d5d5d;
}

.choose-signal{
  margin-top:-10px;
  margin-bottom:-10px;
  padding:0px 20px;

}

.choose-signal:hover{
  background-color:#f5f7fa;
}
</style>