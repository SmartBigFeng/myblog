<template>
    <el-table :data="tableData" :key="num" stripe style="min-width: 1300px" height="600">
        <el-table-column prop="posttime" label="发布时间" width="150" />
        <el-table-column prop="kinds" label="类别" width="150" />
        <el-table-column prop="compos" label="类别" width="150" />
        <el-table-column prop="blogtitle" label="文章标题" width="200" show-overflow-tooltip />
        <el-table-column prop="intro" label="介绍" show-overflow-tooltip />
        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(scope.$index, scope.row)">
                    <template #reference>
                        <el-button size="small" type="danger">
                            Delete
                        </el-button>
                    </template>
                </el-popconfirm>
                <el-button size="small" type="primary" :icon="Search" @click="handleView(scope.$index, scope.row)">浏览
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue';
import store from '@/store'
import router from '@/router';
import http from '@/utils/http'
import { Search } from '@element-plus/icons-vue'
defineComponent({
    name: 'MyBlogs'
})
let temAllBlogs = ref([])
let tableData = ref([])
let num = ref(0)
onMounted(async () => {
    if (store.state.blogs.allBlogs.length == 0) {
        await store.dispatch('blogs/getAllBlogs',{
            type:'all'
        }).then((res) => {
            if (res) {
                temAllBlogs.value = store.state.blogs.allBlogs
            }
        })
    } else {
        temAllBlogs.value = store.state.blogs.allBlogs
    }
    temAllBlogs.value.forEach((v) => {
        let temobj = JSON.parse(JSON.stringify(v.infos))
        temobj.kinds = v.kinds;
        temobj._id = v._id;
        tableData.value[tableData.value.length] = JSON.parse(JSON.stringify(temobj));
    })
})



const handleEdit = (index, row) => {
    http.post('/blogs/getOne', {
        _id: row._id
    }).then(async (res) => {
        if (res) {
            await store.dispatch('blogs/temBlogInfo', res.data)
            router.push('/addblog')
        }
    })
}
const handleDelete = async (index, row) => {
    await store.dispatch('blogs/delOneBlog', {
        _id: row._id,
        fileurl: row.fileurl,
        mdfileurl: row.mdfileurl
    }).then(async (res) => {
        if (res.data.errcode == 0) {
            await store.dispatch('blogs/getAllBlogs',{
                type:'all'
            });
            temAllBlogs.value = store.state.blogs.allBlogs;
            tableData.value = [];
            await temAllBlogs.value.forEach((v) => {
                let temobj = JSON.parse(JSON.stringify(v.infos))
                temobj.kinds = v.kinds;
                temobj._id = v._id;
                tableData.value[tableData.value.length] = JSON.parse(JSON.stringify(temobj));
            })
        }
    });
}
const handleView = (index, row) => {
    const { href } = router.resolve({
        path: `/blogdetails/${row._id}`
    });
    window.open(href, '_blank');
}
</script>

<style lang="scss" scoped>
.bloglist {
    width: 1200px;
    margin-top: 20px;
    border: 1px solid black;
}

td {
    text-align: center;
    padding: 5px 0;
}

.blogtinymce {
    width: 800px;
}

.el-table-column {
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: red;
}
</style>