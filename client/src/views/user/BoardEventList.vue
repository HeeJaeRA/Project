<template>
  <div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>전체</th>
                    <th>진행 중인 이벤트</th>
                    <th>종료된 이벤트</th>
                </tr>
                <tr>
                    <th>제목</th>
                    <th>이벤트시작날짜</th>
                    <th>이벤트종료날짜</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="i" v-for="(event, i) in boardEventList" @click="goToDetail(event.event_code)">
                    <tr>
                    <td>{{ event.banner_img }}</td>
                    </tr>
                    <tr>
                    <td>{{ event.title }}</td>
                    <td>{{ event.eventstart_date }}</td>
                    <td>{{ event.eventend_date }}</td> 
                    </tr>
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
            boardEventList : [],
        };
    },
    created(){
        this.getBoardEventList();
    },
    methods : {
        async getBoardEventList(){
            this.boardEventList = (await axios.get('/node/event')
                                   .catch(err => console.log(err))).data;
        },
        async goToDetail(eventCode){
           (await axios.put(`/node/event/${eventCode}`)
                       .catch(err => console.log(err))).data;
            this.$router.push({path : '/eventinfo', query : {eventCode : eventCode}});
        },
        getDateFormat(date){
            return this.$dateFormat(date);
        }
    }
}
</script>

<style>

</style>