<template>
  <div class="container">
    <br />
    <h4 style="font-family: JalnanGothic; margin-bottom: 40px">진행중인 이벤트</h4>
     <br />
        <div>
            <p>
                <button @click="getBoardEventList()" class="btn btn-primary" id="all"> 전체 </button>
                <button @click="goCurrentEventList()" class="btn btn-primary " id="current"> 진행중 </button>
                <button @click="goEndEventList()" class="btn btn-primary " id="endbtn"> 종료 </button>
            </p>
        </div>
        <table class="table table-hover" v-if="this.currentEventList[0] != null">
            <!-- <thead>
                <tr>
                    <th>제목</th>
                    <th>이벤트시작날짜</th>
                    <th>이벤트종료날짜</th>
                </tr>
            </thead> -->
            <tbody>
                <tr :key="i" v-for="(event, i) in currentEventList" @click="goToDetail(event.event_code)">
                    <tr id="img">
                    <td colspan="3">
                        <p v-if="getDateFormat(event.eventstart_date) >= getToday()" class="badge bg-dark text-white position-absolute">
								NEW
						</p>
                        <img :src="`/node/public/uploads/${event.banner_img }`" width="1100px" height="450px" />
                    </td>
                    </tr>
                    <tr>
                    <td>{{ event.title }}</td>
                    <td id="start">{{ getDateFormat(event.eventstart_date) }}</td>
                    <td id="end">{{ getDateFormat(event.eventend_date) }}</td> 
                    </tr>
                </tr>
            </tbody>
        </table>
        <div v-else>
            <p id="message">진행 중인 이벤트가 없습니다.</p>
        </div>
        <!-- <div class="pagination-container d-flex justify-content-center align-items-center mt-4">
					<button v-if="currentPage > 1" class="btn btn-primary mx-1" @click="changePage('prev')">
						이전
					</button>
					<span class="mx-1">Page {{ currentPage }} / {{ totalPages }}</span>
					<button v-if="currentPage < totalPages" class="btn btn-primary mx-1" @click="changePage('next')">
						다음
					</button>
		</div> -->
        <div class="d-flex justify-content-center mt-3" v-if="this.currentEventList[0] != null">
            <paginate
			:page-count="pageCount"
			:click-handler="handlePageClick"
			:prev-text="'Prev'"
			:next-text="'Next'"
			:v-model="list"
		></paginate>
        <!-- <p>Current Page: {{ currentPage }}</p>
        <p>totalItems: {{ totalItems }}</p> -->
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
table {
    margin-left: 100px;
}
.container {
  margin-top: 120px;
}
#current {
  background-color: lightblue;
  border-color: lightblue;
  margin-right: 3px;
  color: black;
}
#endbtn,
#all {
  background-color: lightblue;
  border-color: lightblue;
  opacity: 0.5;
  margin-right: 3px;
  color: black;
}
h4 {
  margin-left: 10px;
  margin-top: 10px;
}
#eventtr {
    width: 1250px;
}
#message {
  text-align: center;
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
</style>