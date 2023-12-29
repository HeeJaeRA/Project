<template>
    <div>
        <form class="d-flex" action="#" method="POST">
               <input
                  style="width: 800px"
                  class="form-control me-sm-2"
                  type="search"
                  placeholder="Search"
                  name="word"
               />
               <button class="btn btn-secondary my-2 my-sm-0">Search</button>
        </form>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>글번호</th>
                    <th>제목</th>
                    <th>작성일자</th>
                    <th>답변상태</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="i" v-for="(qna, i) in boardQnaList" @click="goToDetail(qna.qna_code)">
                    <td>{{ qna.qna_code }}</td>
                    <td>{{ qna.title }}</td>
                    <td>{{ getDateFormat(qna.write_date) }}</td>
                    <td>{{ qna.qna_status }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            boardQnaList : [],
            userId : window.localStorage.getItem('userId')
        };
    },
    created(){
        this.getBoardQnaList();
        this.userId;
    },
    methods : {
        async getBoardQnaList(){
            this.boardQnaList = (await axios.get(`/node/qna/${this.userId}`)
                                   .catch(err => console.log(err))).data;
        },
        async goToDetail(qnaCode){
            this.$router.push({path : '/qnainfo', query : {qnaCode : qnaCode}});
        },
        getDateFormat(date){
            return this.$dateFormat(date);
        }
    }
}
</script>

<style>

</style>