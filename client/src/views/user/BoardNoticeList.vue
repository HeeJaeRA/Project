<template>
    <div>
        <div>
            <form class="d-flex" action="`notices/${this.selectedOption}/${this.searchTerm}`" method="GET" @submit.prevent="goToSearch">
                <select v-model="selectedOption">
                    <option value="title" selected>제목</option>
                    <option value="content">내용</option>
                </select>
                <input
                    v-model="searchTerm"
                    style="width: 800px"
                    class="form-control me-sm-2"
                    type="search"
                    placeholder="Search"
                    name="word"
                />
                <button type="submit" class="btn btn-secondary my-2 my-sm-0" @click="goToSearch">Search</button>
            </form>
        </div>
            <table class="table table-hover">
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
            selectedOption: 'title',
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
        },
        async goToSearch() {
            let list =  await axios.get(`/node/notices/${this.selectedOption}/${this.searchTerm}`)
                                    .catch(err=>console.log(err));
            let result = list.data;
            this.boardNoticeList = result;
        }
    }
}
</script>

<style>

</style>