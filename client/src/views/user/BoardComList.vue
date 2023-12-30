<template>
    <div>
        <div>
            <form class="d-flex" action="`notices/${this.selectedOption}/${this.searchTerm}`" method="GET" @submit.prevent="goToSearch">
                <select v-model="selectedOption">
                    <option value="title">제목</option>
                    <option value="user_id">작성자</option>
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
                <tr :key="i" v-for="(community, i) in boardComList" @click="goToDetail(community.commu_code)">
                    <td>{{ community.commu_code }}</td>
                    <td>{{ community.title }}</td>
                    <td>{{ community.user_id }}</td>
                    <td>{{ getDateFormat(community.write_date) }}</td>
                    <td>{{ community.view_cnt }}</td>
                </tr>
            </tbody>
        </table>
        <div>
            <button @click="goToInsert()">등록</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            selectedOption : 'title',
            boardComList : [],
        };
    },
    created(){
        this.getBoardComList();
    },
    methods : {
        async getBoardComList(){
            this.boardComList = (await axios.get('/node/community')
                                   .catch(err => console.log(err))).data;
        },
        async goToDetail(comCode){
            (await axios.patch(`/node/community/${comCode}`)
                         .catch(err => console.log(err))).data;
            this.$router.push({path : '/communityinfo', query : {comCode : comCode}});
        },
        getDateFormat(date){
            return this.$dateFormat(date);
        },
        async goToInsert(){
            this.$router.push({path : '/communityform'});
        },
        async goToSearch() {
            let list =  await axios.get(`/node/community/${this.selectedOption}/${this.searchTerm}`)
                                    .catch(err=>console.log(err));
            let result = list.data;
            this.boardComList = result;
        }
    }
}
</script>

<style>

</style>