<template>
    <el-table :data="tableData" height="80%">
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column label="状态" width="100px">
            <template #default="scope">
                <span :class="scope.row.authed ? 'pass' : 'unpass'">{{ status(scope.row.authed) }}</span>
            </template>
        </el-table-column>
        <el-table-column label="审核">
            <template #default="scope">
                <el-button @click="authPass(scope.row._id, false)" v-if="scope.row.authed" type="danger">不通过</el-button>
                <el-button @click="authPass(scope.row._id, true)" v-else type="success">通过</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script setup lang="ts">
import { ref, onMounted, defineComponent } from "vue"
import remarkApi from "@/api/remarkApi"
defineComponent({
    name: "auth"
});
const status = (code: boolean) => {
    return code ? '已通过' : '未通过'
}
let tableData = ref([])
interface authIT {
    _id: string,
    authed: boolean
}
const authPass = (_id: string, authed: boolean) => {
    remarkApi.authRemark({
        _id,
        authed
    }).then((res) => {
        if (res?.data.errcode == "0") {
            remarkApi.getAllRemark().then((res) => {
                if (res?.data.errcode == "0") {
                    tableData.value = res.data.list
                }
            })
        }
    })
}
onMounted(() => {
    remarkApi.getAllRemark().then((res) => {
        if (res?.data.errcode == "0") {
            tableData.value = res.data.list
        }
    })
})
</script>
<style scoped>
.pass {
    color: aquamarine
}

.unpass {
    color: tomato
}
</style>