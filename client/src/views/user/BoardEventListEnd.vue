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
                <tr :key="i" v-for="(event, i) in paginationend" @click="goToDetail(event.event_code)">
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
        <div class="pagination-container d-flex justify-content-center align-items-center mt-4">
					<button v-if="currentPage > 1" class="btn btn-primary mx-1" @click="changePage('prev')">
						이전
					</button>
					<span class="mx-1">Page {{ currentPage }} / {{ totalPages }}</span>
					<button v-if="currentPage < totalPages" class="btn btn-primary mx-1" @click="changePage('next')">
						다음
					</button>
		</div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            endEventList : [],
            itemsPerPage: 5,
			currentPage: 1,
			totalPages: 0,
        };
    },
    computed: {
		paginationend() {
			let startPage = (this.currentPage - 1) * this.itemsPerPage;
			let endPage = startPage + this.itemsPerPage;
			return this.endEventList.slice(startPage, endPage);
		},
	},
    created(){
        this.getEndEventList();
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
             let response = await axios.get('/node/userevent');
				this.endEventList = response.data;
				this.totalPages = Math.ceil(this.endEventList.length / this.itemsPerPage);
                console.log(this.totalPages);
            this.endEventList = (await axios.get(`/node/eventend`)
                                            .catch(err => console.log(err))).data;
         },
          changePage(action) {
			if (action === 'prev' && this.currentPage > 1) {
				this.currentPage--;
				this.scrollToTop();
				this.getEndEventList();
			} else if (action === 'next' && this.currentPage < this.totalPages) {
				this.currentPage++;
				this.scrollToTop();
				this.getEndEventList();
			}
		},
        scrollToTop() {
			window.scrollTo({ top: 0, behavior: 'smooth' });
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