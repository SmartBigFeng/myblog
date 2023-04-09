<template>
    <div v-loading="pageLoading">
        <el-form ref="formEL" :model="formData" class="demo-form-inline" :rules="rules">
            <el-form-item label="图片" prop="imgsrc">
                <el-upload ref="uploadRef" v-model:file-list="filelist" action="#" list-type="picture-card"
                    :auto-upload="false" :limit="1" :on-change="handleUpload" :disabled="uploadDisabled">
                    <el-icon>
                        <Plus />
                    </el-icon>

                    <template #file="{ file }">
                        <div>
                            <img style="width:146px;height:146px" :src="file.url" alt="" />
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                    <el-icon><zoom-in /></el-icon>
                                </span>
                                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                    <el-icon>
                                        <Delete />
                                    </el-icon>
                                </span>
                            </span>
                        </div>
                    </template>
                </el-upload>

                <el-dialog v-model="dialogVisible" width="55vh">
                    <div class="img-container">
                        <img style="width:100%;height:100%;" :src="dialogImageUrl" alt="Preview Image" />
                    </div>
                </el-dialog>
            </el-form-item>
            <el-form-item label="标题" prop="title">
                <el-input style="width:400px" v-model="formData.title" placeholder="请输入内容" />
            </el-form-item>
            <el-form-item label="内容" prop="description">
                <el-input style="width:400px" v-model="formData.description" :rows="7" type="textarea"
                    placeholder="请输入标题" />
            </el-form-item>
            <div style="margin-left: 40px">
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="onSubmit">取消</el-button>
            </div>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import persetApi from "@/api/persetApi"
import { UploadFile, ElMessage } from 'element-plus'
import { changeGlobalNodesTarget } from 'element-plus/es/utils';
let uploadRef = ref(null)
let filelist = ref([])
//规则
const formEL = ref(null)
const formData = ref({
    imgsrc: '',
    title: '',
    description: '',
})
const rules = reactive({
    imgsrc: [
        {
            required: true,
            message: '请至少上传一张图片',
            trigger: 'change',
        },
    ],
    title: [
        {
            required: true,
            message: '请输入标题',
            trigger: 'blur',
        },
    ],
    description: [
        {
            required: true,
            message: '请输入内容',
            trigger: 'blur',
        },
    ]
})
//提交按钮
const onSubmit = () => {
    formEL.value.validate((valid, fileds) => {
        if (valid) {
            persetApi.updateInfo(formData.value).then(res => {
                if (res.data.errcode == '0') {
                    ElMessage.success("操作成功")
                    getInfo()
                }
            })
        }
    })
}
// 获取个人信息
const getInfo = () => {
    persetApi.getInfo().then(res => {
        if (res.data.errcode == '0') {
            formData.value = res.data.dataitem;
            if (!filelist.value.length && !!formData.value.imgsrc) {
                filelist.value.push({ url: formData.value.imgsrc })
            }
            // console.log(filelist.value)
        }
    })
}
//
// 
let pageLoading = ref(false)
//图片上传
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const handleUpload = (files: File) => {
    if (!!formData.value.imgsrc) {
        ElMessage({
            type: "warning",
            message: "最多上传一张图片"
        })
        return false
    }
    pageLoading.value = true;
    let paramFile = new FormData()
    paramFile.append('file', new File([files.raw], files.name, { type: files.raw.type }))
    persetApi.postFile(paramFile).then(res => {
        if (res.data?.errcode == '0') {
            formData.value.imgsrc = res.data.imgsrc;
        }
        pageLoading.value = false;
    })
}
const handleRemove = (file: UploadFile) => {
    pageLoading.value = true;
    persetApi.removeFile({ delImgSrc: formData.value.imgsrc }).then((res) => {
        if (res.data?.errcode == '0') {
            formData.value.imgsrc = "";
            uploadRef.value.clearFiles()
        }
        pageLoading.value = false;
    })
}

const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url;
    dialogVisible.value = true
}
//图片上传禁用
let uploadDisabled = computed(() => {
    return !!formData.value.imgsrc;
})

onMounted(() => {
    getInfo()
})
</script>

<style lang="scss" scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

:deep(.el-upload-list--picture-card.is-disabled .el-upload.el-upload--picture-card) {
    display: none;
}
.img-container{
    height:60vh;
    width:50vh;
}
</style>