<template>
  <div class="container">
    <br />
    <h3 style="font-family: JalnanGothic; margin-bottom: 40px">EVENT</h3>
    <br>
        <div>
                <p>
                <button @click="getBoardEventList()" class="btn btn-primary" id="all"> 전체 </button>
                <button @click="goCurrentEventList()" class="btn btn-primary " id="current"> 진행중 </button>
                <button @click="goEndEventList()" class="btn btn-primary" id="endbtn"> 종료 </button>
            </p>
        </div>
        <table class="table table-hover">
            <tbody>
                <tr :key="i" v-for="(event, i) in boardEventList" @click="goToDetail(event.event_code)"  >
                    <tr id="img">
                    <td colspan="3">
                        <p v-if="getDateFormat(event.eventstart_date) >= getToday()" class="badge bg-dark text-white position-absolute">
								NEW
						</p>
                        <img :src="`/node/public/uploads/${event.banner_img }`" width="1100px" height="450px" />
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
           <button
      class="btn btn-dark rounded-pill px-3"
      style="
        border-radius: 30%;
        text-align: center;
        vertical-align: top;
        width: 100px;
        height: 50px;
        position: fixed;
        bottom: 80px;
        right: 80px;
        font-size: 20px;
      "
      @click="scrollToTop()"
    >
      Top
    </button>
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
            scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    }
}
</script>

<style scoped>
div {
	font-family: 'NEXON Lv1 Gothic OTF';
}
.container {
  margin-top: 120px;
}
table {
    margin-left: 100px;
}
#all {
    background-color: lightblue;
    border-color: lightblue;
    color: black;
    margin-right: 3px;
}
#current, #endbtn{
    background-color: lightblue;
    border-color: lightblue;
    color: black;
    opacity: 0.5;
    margin-right: 3px;
}
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