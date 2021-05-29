<template>
  <div class="lavatoryManagement">
    <div class="center_table">
      <!-- 搜索和新增 -->
      <div class="search_add">
        <!-- 搜索 -->
        <div class="search">
          <div class="search_form">
            <div class="search_input">
              <label class="label" for="">厕所名称</label>
              <input class="input_text" type="text" placeholder="请输入厕所名称" v-model="lnameValue" />
            </div>
            <div class="earch_select">
              <label class="label lable_marlft" for="">告警类型</label>
              <el-select v-model="wtypeValue" clearable placeholder="全部" :popper-append-to-body="false"> </el-select>
            </div>
            <div class="search_select">
              <label class="label lable_marlft" for="">告警级别</label>
              <el-select v-model="wlevelValue" clearable placeholder="全部" :popper-append-to-body="false"> </el-select>
            </div>
            <div class="search_select">
              <label class="label lable_marlft" for="">处理状态</label>
              <el-select v-model="stateValue" clearable placeholder="全部" :popper-append-to-body="false"> </el-select>
            </div>
            <div class="input_btn">
              <div class="form_btn" @click="searchData">
                <i></i>
                <span>查询</span>
              </div>
              <div class="form_btn" @click="(lnameValue = ''), (wtypeValue = ''), (wlevelValue = ''), (stateValue = '')">
                <i></i>
                <span>重置</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 信息表格 -->
      <el-table
        :data="tableData.slice((currentPage - 1) * page_size, currentPage * page_size)"
        :row-style="{ height: '50.67px' }"
        style="width: 100%; max-height: 602.67px"
        @row-click="getDetails"
      >
        <el-table-column prop="wtype" label="告警类型" align="center"> </el-table-column>
        <el-table-column prop="wlevel" label="告警级别" align="center"> </el-table-column>
        <el-table-column prop="lname" label="厕所名称" align="center"> </el-table-column>
        <el-table-column prop="ltype" label="厕所类别" align="center"></el-table-column>
        <el-table-column prop="state" label="处理状态" align="center"></el-table-column>
        <el-table-column prop="warning_time" label="告警时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <i :data-i="icons[0]" @click="visible.details = true"></i>
        </el-table-column>
      </el-table>
      <!-- 页码 -->
      <div class="page">
        <el-pagination
          background
          layout="total,->,prev, pager, next"
          :total="total"
          :page-size="page_size"
          @current-change="current_change"
          :style="pageIsStyle ? 'display:block;' : 'display:none;'"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 详情 -->
    <div class="details_dialog">
      <el-dialog title="厕所详情" :visible.sync="visible.details">
        <div>
          <h3 class="head_title">基础信息</h3>
          <ul>
            <li v-for="(v, k) of detailsList.details" :key="k">
              <span>{{ v }}:</span>
              <span>{{ deviceMessage[k] }}</span>
            </li>
          </ul>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../../../scss/content.scss';
</style>
<script>
export default {
  data() {
    return {
      lnameValue: '',
      idValue: '',
      wtypeValue: '',
      wlevelValue: '',
      stateValue: '',
      //当前行的ID
      rowId: '',
      //存放数据以展示到表格
      tableData: [],
      //备份后台数据
      tableData2: [],
      //控制分页
      total: 0,
      page_size: 9,
      currentPage: 1,
      //控制页码是否显示
      pageIsStyle: true,
      //设备详细信息
      deviceMessage: {},
      //表格操作图标
      icons: ['details'],
      // 控制编辑页面是否弹出
      visible: {
        details: false,
      },
      //新增,修改,详情,删除:表单信息
      detailsList: {
        details: {
          id: '编号',
          tname: '类型名称',
          company: '单位',
          threshold_value: '阀值类型',
          warning_level_top1: '一级预警上线',
          warning_level_top2: '二级预警上限',
          warning_level_top3: '三级预警上限',
          warning_level_bottom1: '一级预警下限',
          warning_level_bottom2: '二级预警下限',
          warning_level_bottom3: '三级预警下限',
          remarks: '备注',
        },
      },
      //修改input
      input2: [],
    };
  },
  mounted() {
    // this.addTableData();
  },
  methods: {
    // 获取数据库中的数据加载到页面表格中(设备列表)
    // addTableData() {
    //   this.axios.get('http://127.0.0.1:3000/gcht/select/deviceManagement').then((result) => {
    //     this.tableData = result.data;
    //     this.tableData2 = result.data;
    //     this.total = this.tableData.length;
    //   });
    // },
    //控制分页
    current_change(currentPage) {
      this.currentPage = currentPage;
    },
    //查询数据
    searchData() {
      //准备一个中转容器,将获取到的对象放进数组
      var arr = [];
      if (this.nameValue == false && this.idValue == false) {
        this.addTableData();
        return;
      }
      //遍历备份的表格数据,避免造成污染
      for (var key in this.tableData2) {
        if (this.idValue == this.tableData2[key].did && this.nameValue == false) {
          arr[arr.length] = this.tableData2[key];
          this.tableData = arr;
        } else if (this.nameValue == this.tableData2[key].dname && this.idValue == false) {
          arr[arr.length] = this.tableData2[key];
          this.tableData = arr;
        } else if (this.nameValue == this.tableData2[key].dname && this.idValue == this.tableData2[key].did) {
          arr[arr.length] = this.tableData2[key];
          this.tableData = arr;
        }
      }
      if (arr.length == 0) {
        this.$message.error('查询数据为空!');
        return;
      }
    },
    //获取行数据并且保存到表单和详情中
    getDetails(row) {
      this.rowId = row.did;
      this.deviceMessage = row;
    },
  },
};
</script>
