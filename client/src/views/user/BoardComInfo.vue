<template>
        <div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>제목</th>
                    <td>{{ comInfo.title }}</td>
                    <th>작성자</th>
                    <td>{{ comInfo.user_id }}</td>
                </tr>
                <tr>
                    <th>작성일시</th>
                    <td>{{ getDateFormat(comInfo.write_date) }}</td>
                    <th>조회수</th>
                    <td>{{ comInfo.view_cnt }}</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="4">
                        <pre>{{ comInfo.content }}</pre>
                    </td>
                </tr>
                {{imgInfo}}
                <tr v-for="img in imgInfo" :key="img.commu_code">
                    <td colspan="2">
                        <pre>{{ img.img_name }}</pre>
                    </td>
                    <td colspan="2">
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
        <hr>
         <div>
            <ReplyList v-bind:comCode="this.searchNo" />
        </div>
        <!-- rcount 댓글 수 sql.js에 추가하기요 .......
            <CommentList v-if="boardInfo.rcount > 0" v-bind:bno="boardInfo.no" />
            <div v-else class="card text-center">
                댓글 없음
            </div>
        -->
  </div>
</template>

<script>
import axios from 'axios';
import ReplyList from './ReplyList.vue';

export default {
    data() {
        return {
            searchNo: '',
            comInfo: {},
            userId : window.localStorage.getItem('userId'),
            imgInfo: [],
        };
    },
    components: {
        ReplyList
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
            this.$router.push( {path : '/community' });
        }
    }
}
</script>

<style>

</style>