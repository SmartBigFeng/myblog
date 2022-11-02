<template>
  <div>
    <div class="editorContainer">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="valueHtml"
        @onCreated="handleCreated"
      />
    </div>
    <ul class="editorbtn">
      <li>
        <el-button type="success" @click="publishBlog" :icon="Check">保存</el-button>
      </li>
      <li>
        <el-button type="danger" @click="resetBlog" :icon="Delete" title="重置">重置</el-button>
      </li>
      <li>
        <el-button type="info" :icon="Message" @click="startPush" :disabled="!renewBtnDis">开始推送</el-button>
      </li>
      <li>
        <el-button type="primary" :icon="Edit" :disabled="renewBtnDis" @click="toRenew">更新</el-button>
      </li>
    </ul>
    <div class="dialogcon" v-if="showTarget">
      <el-dialog v-model="showTarget" title="添加作品" width="60%" :destroy-on-close="true">
        <el-form ref="ruleFormRef" :model="ruleForm" label-width="90px" :rules="rules">
          <el-form-item label="类别" prop="kind">
            <el-select
              v-model="ruleForm.kind"
              class="m-2"
              placeholder="请选择分类"
              size="large"
              width="200px;"
            >
              <el-option
                v-for="item in optionKinds"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="创作类别" prop="compos">
            <el-select
              v-model="ruleForm.compos"
              class="m-2"
              placeholder="请选择分类"
              size="large"
              width="200px;"
            >
              <el-option value="原创">原创</el-option>
              <el-option value="转载">转载</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="博客标题" prop="blogtitle">
            <el-input v-model="ruleForm.blogtitle" class="m-2" placeholder="请选择博客标题" size="large"></el-input>
          </el-form-item>
          <el-form-item label="博客介绍" prop="intro">
            <el-input v-model="ruleForm.intro" class="m-2" placeholder="请简单介绍博客" size="large"></el-input>
          </el-form-item>
          <el-form-item label="Blog封面图" prop="imgfile">
            <el-upload
              class="avatar-uploader"
              :http-request="beforeUpload"
              multiple
              :show-file-list="false"
              v-show="!imageUrl"
            >
              <el-icon class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
            <div class="imgs">
              <img :src="imageUrl" class="avatar" alt />
            </div>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="resetForm($refs.ruleFormRef)">重置</el-button>
            <el-button type="primary" @click="submitForm($refs.ruleFormRef)">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

    <script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css";
import {
  onBeforeUnmount,
  ref,
  reactive,
  shallowRef,
  onMounted,
  defineComponent
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { ElMessage } from "element-plus";
import store from "@/store";
import moment from "moment";
import optionKinds from "@/Mock/blogKinds.json";
import { Check, Delete, Message, Edit } from "@element-plus/icons-vue";
defineComponent({
  name: "RichEditor"
});

const editorRef = shallowRef();
let valueHtml = ref("");
const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };
let showTarget = ref(false);
let imageUrl = ref("");
let ruleFormRef = ref({});
let ruleForm = reactive({
  id: "",
  kind: "",
  compos: "",
  blogtitle: "",
  intro: "",
  file: "",
  blogmess: "",
  posttime: ""
});
let renewBtnDis = ref(true);

let nowbloginfo = ref({});
let router = useRouter();
let route = useRoute();
onBeforeUnmount(() => {
  valueHtml.value = store.state.works.temblog;
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
onMounted(async () => {
  let nowdata = route.params;
  if (JSON.stringify(store.state.blogs.temfile) == "{}") {
    valueHtml.value = await getTemblog();
  } else {
    nowbloginfo.value = await JSON.parse(
      JSON.stringify(store.state.blogs.temfile)
    );
    valueHtml.value = nowbloginfo.value.fileflud;
    renewBtnDis.value = false;
  }
});
let getTemblog = () => {
  return store.state.blogs.temblog;
};

const getTime = () => {
  return moment().format("YYYY-MM-DD HH:mm:ss");
};
const handleCreated = editor => {
  editorRef.value = editor;
};
// 点击收集valueHtml，显示弹窗
const publishBlog = () => {
  if (valueHtml.value != "<p><br></p>") {
    store.dispatch("blogs/createTemBlogs", valueHtml.value);
    ElMessage({
      type: "warning",
      message: "保存成功，注意 : 刷新页面数据丢失 !"
    });
  } else {
    ElMessage({
      type: "error",
      message: "推送内容不能为空"
    });
  }
};
// 富文本编辑器重置
const resetBlog = () => {
  renewBtnDis.value = true;
  valueHtml.value = "<p><br></p>";
  store.dispatch("blogs/createTemBlogs", valueHtml.value);
  store.dispatch("blogs/temBlogInfo", {});
  resetForm();
};
// 开始推送，内容合理打开弹窗进行下一步编辑
const startPush = () => {
  if (valueHtml.value != "<p><br></p>") {
    showTarget.value = true;
  } else {
    ElMessage({
      type: "error",
      message: "推送内容不能为空"
    });
  }
};
// 点击更新按钮出现弹窗
const toRenew = () => {
  if (valueHtml.value != "<p><br></p>") {
    showTarget.value = true;
    ruleForm.kind = nowbloginfo.value.kinds;
    ruleForm.blogtitle = nowbloginfo.value.blogtitle;
    ruleForm.intro = nowbloginfo.value.intro;
    ruleForm.blogmess = nowbloginfo.value.fileflud;
    ruleForm.id = nowbloginfo.value._id;
    ruleForm.compos = nowbloginfo.value.compos;
  } else {
    ElMessage({
      type: "error",
      message: "推送内容不能为空"
    });
  }
};

// 提交按钮，会涉及到后端
let submitForm = formEl => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (valid) {
      ruleForm.blogmess = valueHtml.value;
      ruleForm.posttime = getTime();
      if (JSON.stringify(store.state.blogs.temfile) == "{}") {
        await store.dispatch("blogs/postnewBlog", ruleForm);
      } else {
        await store.dispatch("blogs/updateBlog", ruleForm);
        store.dispatch("blogs/temBlogInfo", {});
      }
      showTarget.value = false;
      resetForm();
      resetBlog();
      valueHtml.value = "<p><br></p>";
      imageUrl.value = "";
      renewBtnDis.value = true;
      await store.dispatch("blogs/getAllBlogs", {
        type: "all"
      });
      router.push("/myblogs");
    }
  });
};
// 弹窗重置按钮
let resetForm = formEl => {
  if (!formEl) return;
  formEl.resetFields();
  imageUrl.value = "";
  ruleForm.file = "";
};
// 关于上传封面图片
let beforeUpload = res => {
  imageUrl.value = URL.createObjectURL(res.file);
  ruleForm.file = res.file;
};

// 表单合理性检测
let validateKind = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请选择分类"));
  } else {
    callback();
  }
};
let validateBlogTitle = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入博客标题"));
  } else {
    callback();
  }
};
let validateCompos = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请选择创作类别"));
  } else {
    callback();
  }
};

let validateIntro = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请简单介绍博客"));
  } else {
    callback();
  }
};
let validateFile = (rule, value, callback) => {
  if (!imageUrl.value) {
    callback(new Error("请上传图片"));
  } else {
    callback();
  }
};
// 表单验证规则
let rules = reactive({
  kind: [{ validator: validateKind, trigger: "blur" }],
  blogtitle: [{ validator: validateBlogTitle, trigger: "blur" }],
  imgfile: [{ validator: validateFile, trigger: "blur" }],
  intro: [{ validator: validateIntro, trigger: "blur" }],
  compos: [{ validator: validateCompos, trigger: "blur" }]
});
</script>

    <style lang="scss" scoped>
.editorContainer {
  width: 90%;
  min-width: 1000px;
  border: 1px solid #ccc;
  overflow-y: scroll;
}

.editorbtn {
  list-style: none;
  display: flex;
  align-items: center;
  margin-top: 20px;

  .el-button {
    height: 40px;
    margin: 0 10px 0;
  }
}

.avatar {
  height: 200px;
}
</style>
