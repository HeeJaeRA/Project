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
            <!-- <thead>
                <tr>
                    <th>제목</th>
                    <th>이벤트시작날짜</th>
                    <th>이벤트종료날짜</th>
                </tr>
            </thead> -->
            <tbody>
                <tr :key="i" v-for="(event, i) in currentEventList" @click="goToDetail(event.event_code)">
                    <tr>
                    <td>
                        <p v-if="getDateFormat(event.eventstart_date) >= getToday()" class="badge bg-dark text-white position-absolute">
								NEW
						</p>
                        <img :src="`http://localhost:3000/public/uploads/${event.banner_img }`" width="1200px" height="200px" />
                        {{ event.banner_img }}
                    </td>
                    </tr>
                    <tr>
                    <td>{{ event.title }}</td>
                    <td>{{ getDateFormat(event.eventstart_date) }}</td>
                    <td>{{ getDateFormat(event.eventend_date) }}</td> 
                    </tr>
                </tr>
            </tbody>
        </table>
        <!-- <div class="pagination-container d-flex justify-content-center align-items-center mt-4">
					<button v-if="currentPage > 1" class="btn btn-primary mx-1" @click="changePage('prev')">
						이전
					</button>
					<span class="mx-1">Page {{ currentPage }} / {{ totalPages }}</span>
					<button v-if="currentPage < totalPages" class="btn btn-primary mx-1" @click="changePage('next')">
						다음
					</button>
		</div> -->
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
            currentEventList : [],
            // endEventList : [],
            currentPage: 1, // 현재 페이지
            itemsPerPage: 5, // 한 페이지당 페이지 수
            totalItems: 0, // 전체 개수
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
        this.getcurrentEventList();
    },
    mounted() {
        this.fetchTotalItems();
    },
    methods : {
        async goToDetail(eventCode){
            this.$router.push({path : '/usereventinfo', query : {eventCode : eventCode}});
        },
        getDateFormat(date){
            return this.$dateFormat(date);
        },
        getToday() {
            return this.$dateFormat('', 'yyyy-MM-dd');
        },
        async getBoardEventList(){
            this.$router.push({path : '/userevent'});
        },
        async getcurrentEventList() {
            this.currentEventList = (await axios.get(`/node/usereventpageing/${this.currentPage}`)
                                                .catch(err => console.log(err))).data;
            console.log(this.currentPage);
            console.log(this.currentEventList);

        },
        async goEndEventList() {
             this.$router.push({path : '/eventend'});
         },
        handlePageClick: async function (pageNum) {
            this.currentPage = pageNum;
            await this.getcurrentEventList();
        },
        fetchTotalItems() {
            //value 값에 테이블명 넣기.
            axios.get(`/node/pagenationing`)
            .then(appData => {
                this.totalItems = appData.data.test;
            })
            .catch(err => console.log(err));
        },
    }
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