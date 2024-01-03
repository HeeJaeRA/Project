<template>
  <div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <!-- <th>글번호</th>
                    <td>{{ qnaInfo.qna_code }}</td> -->
                    <th>작성일시</th>
                    <td colspan="3">{{ getDateFormat(qnaInfo.write_date) }}</td>
                </tr>
                <tr>
                    <th>제목</th>
                    <td>{{ qnaInfo.title }}</td>
                    <th>답변상태</th>
                    <td>{{ qnaInfo.qna_status }}</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="5">
                        <pre>{{ qnaInfo.content }}</pre>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <QnaAnswerInfo v-bind:qnaCode="this.searchNo" />
        </div>
        <div v-if="this.qnaInfo.qna_status == '답변완료'"> 
            <button type="button" class="btn btn-outline-secondary" @click="BoardQnaList()">목록으로</button>
        </div>
        <div v-else>
            <button type="button" class="btn btn-outline-primary" @click="BoardQnaForm(qnaInfo.qna_code)">수정</button>
            <button type="button" class="btn btn-warning" @click="BoardQnaDelete()">삭제</button>
            <button type="button" class="btn btn-outline-secondary" @click="BoardQnaList()">목록으로</button>
        </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";
import QnaAnswerInfo from '../user/QnaAnswerInfo.vue';

export default {
    data() {
        return {
            searchNo: '',
            userId : window.localStorage.getItem('userId'),
            qnaInfo: {}
        };
    },
     components : {
        QnaAnswerInfo
    },
    created() {
        this.searchNo = this.$route.query.qnaCode;
        this.boardQnaInfo();
    },
    methods: {
        async boardQnaInfo() {
           let result = await axios.get(`/node/qna/${this.userId}/${this.searchNo}`)
                       .catch(err => console.log(err));
            console.log(result)
            this.qnaInfo = result.data;           
        },
        getDateFormat(date) {
            return this.$dateFormat(date);
        },
        async BoardQnaList() {
            this.$router.push({path : `/qna`});
        },
        async BoardQnaForm(qndCode) {
            this.$router.push({ path : '/qnaform', query : {qndCode : qndCode} })
        },
        async BoardQnaDelete() {
            let result = await axios.delete(`/node/qna/${this.searchNo}`)
                                    .catch( err=> console.log(err));
            this.qnaInfo = result.data;
            Swal.fire({
                        icon: "success",
                        title: "QnA 문의",
                        text: "삭제되었습니다.",
                    });
            this.$router.push({path : `/qna`});
        }
    }
}
</script>

<style>

</style>