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
              <input class="input_text" type="text" placeholder="请输入厕所名称" v-model="nameValue" />
            </div>
            <div class="search_input">
              <label class="label lable_marlft" for="">厕所编号</label>
              <input class="input_text " type="text" placeholder="请输入厕所编号" v-model="idValue" />
            </div>
            <div class="input_btn">
              <div class="form_btn" @click="searchData">
                <i></i>
                <span>查询</span>
              </div>
              <div class="form_btn" @click="(nameValue = ''), (idValue = '')">
                <i></i>
                <span>重置</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 新增按钮 -->
        <div class="add_delate">
          <div class="form_btn" @click="(visible.add = true), (input1 = [])">
            <i></i>
            <span>新增</span>
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
        <el-table-column prop="lid" label="厕所编号" align="center"> </el-table-column>
        <el-table-column prop="lname" label="厕所名称" align="center"> </el-table-column>
        <el-table-column prop="location" label="位置" align="center"> </el-table-column>
        <el-table-column prop="createtime" label="创建时间" align="center"> </el-table-column>
        <el-table-column label="操作" align="center">
          <i :data-i="icons[0]" @click="visible.edit = true"></i>
          <i :data-i="icons[1]" @click="visible.details = true"></i>
          <i :data-i="icons[2]" @click="visible.delete = true"></i>
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
    <!-- 新增 -->
    <div class="add_dialog">
      <el-dialog title="新增厕所" :visible.sync="visible.add">
        <div>
          <ul>
            <li v-for="(v, k) of detailsList.add" :key="k" class="add_input">
              <div>
                <span>{{ v }}</span>
                <el-input type="text" v-model="input1[k]" :placeholder="`请输入` + v" maxlength="50"></el-input>
                <span>{{ detailsFont[k] }}</span>
              </div>
            </li>
          </ul>
        </div>
        <span slot="footer">
          <el-button @click="visible.add = false">取 消</el-button>
          <el-button type="primary" @click="addrow">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 编辑 -->
    <div class="edit_dialog">
      <el-dialog title="编辑厕所" :visible.sync="visible.edit">
        <div>
          <ul>
            <li v-for="(v, k) of detailsList.edit" :key="k" class="edit_input">
              <div>
                <span>{{ v }}</span>
                <el-input type="text" v-model="input2[k]" :placeholder="`请输入` + v" maxlength="50"></el-input>
                <span>{{ detailsFont[k] }}</span>
              </div>
            </li>
          </ul>
        </div>
        <span slot="footer">
          <el-button @click="(visible.edit = false), (input2 = [])">取 消</el-button>
          <el-button @click="editrow" type="primary">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 详情 -->
    <div class="details_dialog">
      <el-dialog title="厕所详情" :visible.sync="visible.details">
        <div>
          <h3 class="head_title">基础信息</h3>
          <ul>
            <li v-for="(v, k) of detailsList.details" :key="k">
              <span>{{ v }}:</span>
              <span>{{ detaiMessage[k] }}</span>
            </li>
          </ul>
        </div>
      </el-dialog>
    </div>
    <!-- 删除厕所 -->
    <div class="delete_dialog">
      <el-dialog title="提示" :visible.sync="visible.delete">
        <div class="delete_content">
          <div class="delete_icon"></div>
          <div>你确定要删除吗</div>
        </div>
        <span slot="footer">
          <el-button @click="deleterow" type="primary">确 定</el-button>
          <el-button @click="visible.delete = false">取 消</el-button>
        </span>
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
      nameValue: '',
      idValue: '',
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
      //厕所详细信息
      detaiMessage: {},
      //表格操作图标
      icons: ['edit', 'details', 'quit'],
      total: 0,
      // 控制编辑页面是否弹出
      visible: {
        add: false,
        edit: false,
        details: false,
        delete: false,
      },
      //新增,修改,详情,删除:表单信息
      detailsList: {
        add: {
          lid: '厕所编号',
          lname: '厕所名称',
          longitude: '经度',
          latitude: '纬度',
          location: '位置',
        },
        edit: {
          lid: '厕所编号',
          lname: '厕所名称',
          longitude: '经度',
          latitude: '纬度',
          location: '位置',
        },
        details: {
          lid: '厕所编号',
          lname: '厕所名称',
          longitude: '经度',
          latitude: '纬度',
          location: '位置',
          createtime: '创建时间',
        },
      },
      detailsFont: {
        lid: '1-10字',
        lname: '1-20字',
        longitude: '1-10字',
        latitude: '1-10字',
        location: '1-10字',
      },
      //新增input
      input1: [],
      //修改input
      input2: [],
    };
  },
  mounted() {
    this.addTableData();
  },
  methods: {
    //获取数据库中的数据加载到页面表格中(厕所列表)
    addTableData() {
      this.axios.get('/gcht/select/lavatoryManagement').then((result) => {
        this.tableData = result.data;
        this.tableData2 = result.data;
        this.total = this.tableData.length;
      });
    },
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
        if (this.idValue == this.tableData2[key].lid && this.nameValue == false) {
          arr[arr.length] = this.tableData2[key];
          this.tableData = arr;
        } else if (this.nameValue == this.tableData2[key].lname && this.idValue == false) {
          arr[arr.length] = this.tableData2[key];
          this.tableData = arr;
        } else if (this.nameValue == this.tableData2[key].lname && this.idValue == this.tableData2[key].lid) {
          arr[arr.length] = this.tableData2[key];
          this.tableData = arr;
        }
      }
      if (arr.length == 0) {
        this.$message.error('查询数据为空!');
        return;
      }
    },
    //新增数据
    addrow() {
      if (!this.input1.lid) {
        this.$message.error('厕所编号不能为空');
        return;
      }
      if (!this.input1.lname) {
        this.$message.error('厕所名称不能为空');
        return;
      }
      if (!this.input1.longitude) {
        this.$message.error('经度不能为空');
        return;
      }
      if (!this.input1.latitude) {
        this.$message.error('纬度不能为空');
        return;
      }
      if (!this.input1.location) {
        this.$message.error('位置不能为空');
        return;
      }
      this.axios
        .post(
          '/gcht/add/lavatoryManagement',
          `lid=${this.input1.lid}&lname=${this.input1.lname}&longitude=${this.input1.longitude}&latitude=${this.input1.latitude}&location=${this.input1.location}`
        )
        .then((result) => {
          if (result.data.code == '201') {
            this.$message.success('添加成功');
            this.visible.add = false;
            this.input1 = [];
            this.addTableData();
          } else if (result.data.code == '200') {
            this.$message.error('厕所不能编号重复');
          } else {
            this.$message.error('添加失败');
          }
        });
    },
    //获取行数据并且保存到表单和详情中
    getDetails(row) {
      // this.input2 = row;
      this.rowId = row.lid;
      this.detaiMessage = row;
    },
    //修改行数据
    editrow() {
      if (!this.input2.lid) {
        this.$message.error('厕所编号不能为空');
        return;
      } else if (this.input2.lid != this.rowId) {
        this.$message.error('厕所编号不能修改');
        return;
      }
      if (!this.input2.lname) {
        this.$message.error('厕所名称不能为空');
        return;
      }
      if (!this.input2.longitude) {
        this.$message.error('经度不能为空');
        return;
      }
      if (!this.input2.latitude) {
        this.$message.error('纬度不能为空');
        return;
      }
      if (!this.input2.location) {
        this.$message.error('位置不能为空');
        return;
      }
      this.axios
        .put(
          '/gcht/update/lavatoryManagement',
          `lid=${this.input2.lid}&lname=${this.input2.lname}&longitude=${this.input2.longitude}&latitude=${this.input2.latitude}&location=${this.input2.location}`
        )
        .then((result) => {
          if (result.data.code == '201') {
            this.$message.success('修改成功');
          } else {
            this.$message.error('修改失败');
          }
          this.visible.edit = false;
          this.input2 = [];
          this.addTableData();
        });
    },
    //删除行数据
    deleterow() {
      console.log(this.rowId);
      this.axios.delete(`/gcht/delete/lavatoryManagement/${this.rowId}`).then((result) => {
        console.log(result);
        if (result.data.code == 1) {
          this.$message.success('删除成功');
        } else {
          this.$message.error('删除失败');
        }
        this.visible.delete = false;
        this.addTableData();
      });
    },
  },
};
</script>
