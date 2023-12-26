<template>
  <div>
        <table>
            <thead>
                <tr>
                    <th>글번호</th>
                    <td>{{ qnaInfo.qna_code }}</td>
                    <th>작성일시</th>
                    <td>{{ getDateFormat(qnaInfo.write_date) }}</td>
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
                    <td>내용
                        <pre>{{ qnaInfo.content }}</pre>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <v-if></v-if>
            <v-else></v-else>
        </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            searchNo: '',
            qnaInfo: {}
        };
    },
    created() {
        this.searchNo = this.$route.query.qnaCode;
        this.boardQnaInfo();
    },
    methods: {
        async boardQnaInfo() {
           let result = 
            await axios.get(`/node/qna/${this.searchNo}`)
                       .catch(err => console.log(err));
           this.qnaInfo = result.data;           
        },
        getDateFormat(date) {
            return this.$dateFormat(date);
        }
    }
}
</script>

<style>

</style>