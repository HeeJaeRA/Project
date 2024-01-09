<template>
  <div class="container">
    <h4>전체 이벤트</h4>
        <div>
                <button @click="getBoardEventList()" class="btn btn-link "> 전체 </button>
                <button @click="goCurrentEventList()" class="btn btn-link "> 진행중 </button>
                <button @click="goEndEventList()" class="btn btn-link "> 종료 </button>
        </div>
        <table class="table table-hover">
            <tbody>
                <tr :key="i" v-for="(event, i) in boardEventList" @click="goToDetail(event.event_code)"  >
                    <tr id="img">
                    <td colspan="3">
                        <p v-if="getDateFormat(event.eventstart_date) >= getToday()" class="badge bg-dark text-white position-absolute">
								NEW
						</p>
                        <img :src="`http://localhost:3000/public/uploads/${event.banner_img }`" width="1200px" height="200px" />
                        <!-- {{ event.banner_img }} -->
                    </td>
                    </tr>
                    <tr id="eventtr">
                        <td>{{ event.title }}</td>
                        <td id="start">{{ getDateFormat(event.eventstart_date) }}</td>
                        <td id="end">{{ getDateFormat(event.eventend_date) }}</td> 
                    </tr>
                </tr>
            </tbody>
        </table>
        <div class="d-flex justify-content-center mt-3">
                <pagination v-bind:value="'event'" @current="selectPage"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import pagination from './Pagination.vue';

export default {
    data(){
        return {
            boardEventList : [],
            // currentEventList : [],
            // endEventList : [],
            current: 1
        };
    },
    components: {
        pagination,
    },
    created(){
        this.getBoardEventList();
        // this.goCurrentEventList();
        // this.goEndEventList();
    },
    methods : {
        async getBoardEventList(){
            this.boardEventList = (await axios.get(`/node/usereventpage/${this.current}`)
                                              .catch(err => console.log(err))).data;
        },
        async goToDetail(eventCode){
            this.$router.push({path : '/usereventinfo', query : {eventCode : eventCode}});
        },
        getDateFormat(date){
            return this.$dateFormat(date);
        },
        getToday() {
            return this.$dateFormat('', 'yyyy-MM-dd');
        },
        async goCurrentEventList() {
            this.$router.push({path : '/eventing'});
        },
         async goEndEventList() {
             this.$router.push({path : '/eventend'});
         },
        selectPage(selected){
            this.current = selected;
            this.getBoardEventList();
        },
    }
}
</script>

<style scoped>
h4 {
  margin-left: 10px;
  margin-top: 10px;
}
#eventtr {
    width: 1250px;
}
#start {
    text-align: right;
    width: 150px;
}
#end {
    text-align: right;
    width: 150px;
}
.pagination-container {
	margin-top: 20px;
}

.pagination-container button {
	font-size: 14px;
	padding: 8px 12px;
}
#eventtr {
    width: 100%;
}
</style>