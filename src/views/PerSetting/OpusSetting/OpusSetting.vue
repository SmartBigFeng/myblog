<template>
  <div class="container">
    <!-- 添加项目 -->
    <div>
      <div class="opus-btn">
        <el-button type="primary" @click="dialogVisible = true">+ 添加</el-button>
      </div>
    </div>
    <!-- 添加项目弹出窗口 -->
    <el-dialog v-model="dialogVisible" title="添加/更新作品" width="60%" :destroy-on-close="true" top="25vh">
      <el-form ref="ruleFormRef" :model="ruleForm" label-width="120px" :rules="rules">
        <el-form-item label="类别" prop="title">
          <el-select v-model="ruleForm.title" class="m-2" placeholder="请选择分类" size="large" width="200px;">
            <el-option v-for="item in kinds.kinds" :value="item">{{ item }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称" prop="projname">
          <el-input v-model="ruleForm.projname" class="m-2" placeholder="请选择分类" size="large"></el-input>
        </el-form-item>
        <el-form-item label="作品图" prop="file">
          <el-upload class="avatar-uploader" :http-request="beforeUpload" multiple :show-file-list="false">
            <el-icon class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
          <div class="imgs"><img v-for="(item, index) in imageUrl" :src="item" class="avatar" alt="" :key="index" /></div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetForm($refs.ruleFormRef)">重置</el-button>
          <el-button type="primary" @click="submitForm($refs.ruleFormRef)">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <div class="proj-main">
      <!-- 数据回显 -->
      <div class="demo-collapse">
        <ul class="infinite-list" v-if="nowinfos.length">
          <li v-for="item in nowinfos" :key="item._id">
            <h4 class="nowkinds">{{ item.title }}</h4>
            <el-table :data="item.infos" style="width: 100%">
              <el-table-column prop="projname" label="项目名称" width="300" />
              <el-table-column fixed="right" label="Operations" width="300">
                <template #default="scope">
                  <el-popconfirm title="Are you sure to delete this?"
                    @confirm="handleDelete(scope.$index, scope.row, item.title)">
                    <template #reference>
                      <el-button size="small" type="danger">删除</el-button>
                    </template>
                  </el-popconfirm>
                  <el-button size="small" type="primary" :icon="Search"
                    @click="handleView(scope.$index, scope.row, item._id)">浏览</el-button>
                </template>
              </el-table-column>
            </el-table>
          </li>
        </ul>
        <template v-else>
          <el-empty description="Nothing" />
        </template>
      </div>
      <!-- 懒加载预览项目图片 -->
      <div class="demo-image__lazy">
        <template v-if="nowitem.length">
          <div class="imgcontainer" v-for="(url, index) in nowitem" :key="index">
            <div class="itembtns">
              <el-button :icon="Refresh" @click="showAlterItem(url, nowitem_id, index)">
                <span>替换</span>
              </el-button>
              <el-popconfirm title="Are you sure to delete this?" @confirm="handelDeleteItem(url, nowitem_id)">
                <template #reference>
                  <el-button type="danger" :icon="Delete">
                    <span>删除</span>
                  </el-button>
                </template>
              </el-popconfirm>
            </div>
            <el-image :key="url" :src="url" lazy />
          </div>
        </template>
        <template v-else>
          <el-empty description="No pictures are being displayed" />
        </template>
      </div>
    </div>
    <!-- 图片替换部分 -->
    <el-dialog v-model="alterdialogVisible" title="单图片替换" width="800px" :before-close="handleClose" top="25vh">
      <div class="altercontainer">
        <div>
          <span class="altertitle">新上传的图片</span>
          <el-upload class="avatar-uploader" :http-request="beforeAlterUpload" multiple :show-file-list="false"
            v-if="!newfileurl">
            <el-icon class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
          <img :src="newfileurl" alt class="alter-exist-img" v-if="newfileurl" />
        </div>
        <br />
        <div>
          <span class="altertitle">需要替换的图片</span>
          <img :src="nowimgurl" alt class="alter-exist-img" />
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="[alterdialogVisible = false, newfileurl = '']">取消</el-button>
          <el-button type="primary" @click="handelAlterItem">替换</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
// 引用
import http from "@/utils/http";
import store from "@/store";
import {
  defineComponent,
  ref,
  watch,
  reactive,
  onMounted,
  nextTick
} from "vue";
import { useRoute, useRouter } from "vue-router";
import kinds from "@/Mock/projKinds.json";
import { Delete, Search, Refresh } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
defineComponent({
  name: "OpusSetting"
});

// 定义响应式数据
let nowinfos = ref([]);
const activeNames = ref([]);
let router = useRouter();
let dialogVisible = ref(false);
let imageUrl = ref([]);

let ruleForm = reactive({
  title: "",
  projname: "",
  file: []
});
// 生命周期钩子
onMounted(async () => {
  if (store.state.works.infos.length == 0) {
    await store.dispatch("works/renewinfo");
  }
  nowinfos.value = store.state.works.infos;
});

// 定义函数
// 定义事件
let beforeUpload = res => {
  // ruleForm.file = res.file;
  imageUrl.value.push(URL.createObjectURL(res.file));
  ruleForm.file.push(res.file);
  Array.from(new Set(ruleForm.file));
};

// 添加个人作品部分
let submitForm = formEl => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (valid) {
      await store.dispatch("works/update", ruleForm);
      dialogVisible.value = false;
      formEl.resetFields();
      imageUrl.value = [];
      await store.dispatch("works/renewinfo");
      nowinfos.value = store.state.works.infos;
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
let resetForm = formEl => {
  if (!formEl) return;
  formEl.resetFields();
  imageUrl.value = [];
  ruleForm.file = [];
};

// 定义验证规则
let validateTitle = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请选择分类"));
  } else {
    callback();
  }
};
let validateName = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入项目名称"));
  } else {
    callback();
  }
};
let validateFile = (rule, value, callback) => {
  if (value.length == 0) {
    callback(new Error("请上传图片"));
  } else {
    callback();
  }
};

let rules = reactive({
  title: [{ validator: validateTitle, trigger: "blur" }],
  file: [{ validator: validateFile, trigger: "blur" }],
  projname: [{ validator: validateName, trigger: "blur" }]
});

// 再编辑、删除、浏览个人作品集
let nowitem = ref([]);
let nowprojname = ref("");
let nowitem_id = ref("");
let handleEdit = (proj, nowitem, nowtitle) => {
  dialogVisible.value = true;
};
let handleDelete = async (proj, nowitem, nowkinds) => {
  await store.dispatch("works/deleteItem", {
    title: nowkinds,
    infos: JSON.parse(JSON.stringify(nowitem))
  });
  await store.dispatch("works/renewinfo");
  nowinfos.value = store.state.works.infos;
};
let handleView = (proj, nowclickitem, nowid) => {
  nowitem.value = JSON.parse(JSON.stringify(nowclickitem.worksurl));
  nowitem_id.value = nowid;
  nowprojname.value = nowclickitem.projname;
};
let clearNowItem = () => {
  nowitem.value = [];
};

// 删除每个项目下的图片

let handelDeleteItem = async (nowurl, nowid) => {
  await store.dispatch("works/deleteNowImg", {
    _id: nowid,
    projname: nowprojname.value,
    fileurl: nowurl
  });
  nowinfos.value = store.state.works.infos;
  let nowproj = nowinfos.value.find(v => v._id == nowitem_id.value);
  if (nowproj) {
    nowitem.value = nowproj.infos.find(
      v => v.projname == nowprojname.value
    ).worksurl;
  } else {
    nowitem.value = [];
  }
};
// 替换每个项目下的图片
let nowimgurl = ref("");
let alterdialogVisible = ref(false);
let newfileurl = ref("");
let newfile = ref("");
let newindex = ref(0);
let beforeAlterUpload = res => {
  newfileurl.value = URL.createObjectURL(res.file);
  newfile.value = res.file;
};
let handleClose = () => {
  alterdialogVisible.value = false;
  newfile.value = "";
};
let showAlterItem = (nowurl, nowid, nowindex) => {
  nowimgurl.value = nowurl;
  newindex.value = nowindex;
  alterdialogVisible.value = true;
};
let handelAlterItem = async () => {
  if (newfileurl.value.length) {
    await store
      .dispatch("works/alterSingleImg", {
        _id: nowitem_id.value,
        projname: nowprojname.value,
        nowimgurl: nowimgurl.value,
        newfile: newfile.value
      })
      .then(res => {
        nowitem.value[newindex.value] = res;
        newfile.value = "";
        nowimgurl.value = "";
        newfileurl.value = "";
        alterdialogVisible.value = false;
      });
  } else {
    ElMessage({
      type: "error",
      message: "请上传替换的图片"
    });
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
.opus-btn {
  padding: 20px 50px;
  display: flex;
  justify-content: flex-end;
}

.avatar-uploader {
  width: 100%;
}

div.imgs {
  display: flex;
  flex-wrap: wrap;

  .avatar {
    width: 75px;
    height: 75px;
    display: block;
  }
}

.avatar-uploader .avatar-uploader-icon {
  width: 150px;
  height: 150px;
  display: block;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  text-align: center;
  line-height: 178px;
  font-size: 40px;
  color: #ccc;
}

.formlable {
  vertical-align: top;
}

.proj-main{
  display: flex;
  height:calc(100% - 80px);
  width:100%;
  justify-content: space-between;
}
// 所有项目展示
.demo-collapse {
  min-width: 800px;
  max-width: 1000px;
}

.btndelall {
  position: absolute;
  height: inherit;
  left: 100px;
  top: 5px;
  padding: 10px 10px;
  transition: 0.5s;
}

.btndelitem {
  position: absolute;
  height: inherit;
  left: 100px;
  top: 5px;
  padding: 10px 10px;
}

.infinite-list {
  height: 500px;
  overflow-y: scroll;
  padding: 0;
  margin: 0;
  list-style: none;
  border: 0;
  width: 80%;

  &::-webkit-scrollbar {
    display: none;
  }

  .nowkinds {
    padding: 5px 10px;
    font-size: 20px;
    margin-top: 20px;
  }
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  padding-left: 50px;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
  margin-top: 10px;
}

.el-table-column {
  display: flex;
  justify-content: space-evenly;
}

.demo-image__lazy {
  height: 60vh;
  width: 100%;
   overflow-y: auto;
  border: 1px solid black;
  border-radius: 5px;

  &::-webkit-scrollbar {
    display: none;
  }

  &>.imgcontainer {
    margin-bottom: 5px;
    position: relative;

    .itembtns {
      height: 100px;
      max-width: 70px;
      position: absolute;
      z-index: 11;
      right: 10px;
      top: calc(50% - 40px);
      display: flex;
      flex-direction: column;

      &>.el-button {
        height: 30px;
        width: 100%;
        margin: 5px;
        padding: 5px;
        text-align: center;

        span {
          height: 30px;
          line-height: 30px;
          width: 40px;
          text-align: left;
          font-size: 12px;
        }
      }
    }
  }
}

.demo-image__lazy .el-image {
  display: block;
  min-height: 200px;
  margin-bottom: 5px;
}

.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}

.block {
  position: relative;
  width: 25%;

  &>img {
    width: 100%;
  }

  &>.el-button {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 5;
  }
}

.altercontainer {
  width: 100%;
  display: flex;

  &>div {
    flex: 1;

    &>span {
      display: block;
      padding: 10px;
      font-size: 20px;
      justify-content: space-evenly;
    }

    .alter-exist-img {
      width: 300px;
      max-height: 200px;
    }

    .el-empty {
      width: 300px;
      padding: 0;
      max-height: 200px;
    }
  }
}

.el-dialog {
  padding: 0;
  margin: 0;
}
</style> 