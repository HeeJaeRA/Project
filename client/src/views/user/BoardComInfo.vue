<template>
  <div>
        <table>
            <thead>
                <tr>
                    <th>글번호</th>
                    <td>{{ comInfo.commu_code }}</td>
                    <th>작성일시</th>
                    <td>{{ getDateFormat(comInfo.write_date) }}</td>
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
                    <td>내용
                        <pre>{{ comInfo.content }}</pre>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <button type="button" @click="boardComForm()">수정</button>
            <button type="button">삭제</button>
            <button type="button" @click="BoardCommuList()">목록으로</button>
        </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            searchNo: '',
            comInfo: {}
        };
    },
    created() {
        this.searchNo = this.$route.query.comCode;
        this.boardComInfo();
    },
    methods: {
        async boardComInfo() {
           let result = await axios.get(`/node/community/${this.searchNo}`)
                       .catch(err => console.log(err));
           this.comInfo = result.data;           
        },
        getDateFormat(date) {
            return this.$dateFormat(date);
        },
        async BoardCommuList() {
            this.$router.push( {path : '/community' });
        },
        async boardComForm() {
            this.$router.push({ path : '/communityform' })
        }
    }
}
</script>

<style>

</style>