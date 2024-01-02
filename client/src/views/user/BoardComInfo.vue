<template>
        <div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>글번호</th>
                    <td>{{ comInfo.commu_code }}</td>
                    <th>작성일시</th>
                    <td colspan="3">{{ getDateFormat(comInfo.write_date) }}</td>
                </tr>
                <tr>
                    <th>제목</th>
                    <td>{{ comInfo.title }}</td>
                    <th>작성자</th>
                    <td>{{ comInfo.user_id }}</td>
                    <th>조회수</th>
                    <td>{{ comInfo.view_cnt }}</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="6">
                        <pre>{{ comInfo.content }}</pre>
                    </td>
                </tr>
                <tr v-for="img in imgInfo" :key="img.commu_code">
                    <td colspan="6">
                        <pre>{{ img.img_name }}</pre>
                    </td>
                    <td>
                        <img :src="`http://localhost:3000/public/uploads/${img.img_name}`" width="200px" height="200px" />
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <div v-if="this.userId == this.comInfo.user_id">
                <button type="button" class="btn btn-outline-primary" @click="boardComForm(comInfo.commu_code)">수정</button>
                <button type="button" class="btn btn-warning" @click="deleteComInfo()">삭제</button>
                <button type="button" class="btn btn-outline-secondary" @click="BoardCommuList()">목록으로</button>
            </div>
            <div v-else>
                <button type="button" class="btn btn-outline-secondary" @click="BoardCommuList()">목록으로</button>
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            searchNo: '',
            comInfo: {},
            userId : window.localStorage.getItem('userId'),
            imgInfo: [],
        };
    },
    created() {
        this.searchNo = this.$route.query.comCode;
        this.boardComInfo();
        this.getimgInfo();

    },
    methods: {
        async boardComInfo() {
           let result = await axios.get(`/node/community/${this.searchNo}`)
                       .catch(err => console.log(err));
           this.comInfo = result.data;           
        },
        async getimgInfo() {
            let result = await axios.get(`/node/commuimg/${this.searchNo}`)
                                    .catch((err) => console.log(err));
            this.imgInfo = result.data;
            console.log(this.imgInfo)
        },
        getDateFormat(date) {
            return this.$dateFormat(date);
        },
        async BoardCommuList() {
            this.$router.push( {path : '/community' });
        },
        async boardComForm(comCode) {
            this.$router.push({ path : '/communityform', query : {comCode : comCode} })
        },
        async deleteComInfo() {
            let result = await axios.delete(`/node/community/${this.searchNo}`)
                                    .catch( err=> console.log(err));
            this.comInfo = result.data;
        }
    }
}
</script>

<style>

</style>