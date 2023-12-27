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
            <table>
                <thead>
                    <tr>
                        <th>글번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일자</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="i" v-for="(notice, i) in boardNoticeList" @click="goToDetail(notice.notice_code)">
                        <td>{{ notice.notice_code }}</td>
                        <td>{{ notice.title }}</td>
                        <td>{{ notice.user_id }}</td>
                        <td>{{ getDateFormat(notice.write_date) }}</td>
                        <td>{{ notice.view_cnt }}</td>
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
            boardNoticeList : [],
        };
    },
    created(){
        this.getBoardNoticeList();
    },
    methods : {
        async getBoardNoticeList(){
            this.boardNoticeList = (await axios.get('/node/notices')
                                   .catch(err => console.log(err))).data;
        },
        async goToDetail(noticeCode){
           (await axios.put(`/node/notices/${noticeCode}`)
                       .catch(err => console.log(err))).data;
            this.$router.push({path : '/noticeinfo', query : {noticeCode : noticeCode}});
        },
        getDateFormat(date){
            return this.$dateFormat(date);
        }
    }
}
</script>

<style>

</style>