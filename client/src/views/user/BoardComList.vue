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
        }
    }
}
</script>

<style>

</style>