<template>
  <div>
        <div>
            <p>
                <button @click="getBoardEventList()" class="btn btn-link "> 전체 </button>
                <button @click="goCurrentEventList()" class="btn btn-link "> 진행중 </button>
                <button @click="goEndEventList()" class="btn btn-link "> 종료 </button>
            </p>
        </div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>제목</th>
                    <th>이벤트시작날짜</th>
                    <th>이벤트종료날짜</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="i" v-for="(event, i) in endEventList" @click="goToDetail(event.event_code)">
                    <tr>
                    <td>{{ event.banner_img }}</td>
                    </tr>
                    <tr>
                    <td>{{ event.title }}</td>
                    <td>{{ getDateFormat(event.eventstart_date) }}</td>
                    <td>{{ getDateFormat(event.eventend_date) }}</td> 
                    </tr>
                </tr>
            </tbody>
        </table>
        <div>
            <paginate
                :page-count="pageCount"
                :click-handler="handlePageClick"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :v-model="list"
            ></paginate>
            <p>Current Page: {{ currentPage }}</p>
            <p>totalItems: {{ totalItems }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Paginate from 'vuejs-paginate-next';

export default {
    data(){
        return {
            endEventList : [],
            itemsPerPage: 5,
			currentPage: 1,
			totalItems: 0,
        };
    },
    components: {
        Paginate
    },
    computed: {
		pageCount() {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        }
	},
    watch : {
        currentPage() {
           this.currentPage; 
        }     
    },
    created(){
        this.getEndEventList();
    },
    mounted() {
        this.fetchTotalItems();
    },
    methods : {
        async getBoardEventList(){
            this.$router.push({path : '/userevent'});
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
        
         async getEndEventList() {
            this.endEventList = (await axios.get(`/node/usereventpageend/${this.currentPage}`)
                                            .catch(err => console.log(err))).data;
         },
        handlePageClick: async function (pageNum) {
            this.currentPage = pageNum;
            await this.getEndEventList();
        },
        fetchTotalItems() {
            //value 값에 테이블명 넣기.
            axios.get(`/node/pagenationend`)
            .then(appData => {
                this.totalItems = appData.data.test;
            })
            .catch(err => console.log(err));
        },
    },
}
</script>

<style scoped>
.pagination-container {
	margin-top: 20px;
}

.pagination-container button {
	font-size: 14px;
	padding: 8px 12px;
}
</style>