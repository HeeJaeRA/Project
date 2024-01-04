<template>
  <div>
        <div>
                <button @click="getBoardEventList()" class="btn btn-link "> 전체 </button>
                <button @click="goCurrentEventList()" class="btn btn-link "> 진행중 </button>
                <button @click="goEndEventList()" class="btn btn-link "> 종료 </button>
        </div>
        <table class="table table-hover">
            <tbody>
                <tr :key="i" v-for="(event, i) in paginatedRestaurants" @click="goToDetail(event.event_code)" id="eventtr" >
                    <tr>
                    <td>
                        <p v-if="getDateFormat(event.eventstart_date) == getToday()" class="badge bg-dark text-white position-absolute">
								NEW
						</p>
                        <img :src="`http://localhost:3000/public/uploads/${event.banner_img }`" width="1200px" height="200px" />
                        {{ event.banner_img }}
                    </td>
                    </tr>
                    <tr>
                    <td>{{ event.title }}</td>
                    <td>{{ getDateFormat(event.eventstart_date)}}</td>
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
            boardEventList : [],
            // currentEventList : [],
            // endEventList : [],
            itemsPerPage: 5,
			currentPage: 1,
			totalPages: 0,
        };
    },
    computed: {
		paginatedRestaurants() {
			let startPage = (this.currentPage - 1) * this.itemsPerPage;
			let endPage = startPage + this.itemsPerPage;
			return this.boardEventList.slice(startPage, endPage);
		},
	},
    created(){
        this.getBoardEventList();
        // this.goCurrentEventList();
        // this.goEndEventList();
    },
    methods : {
        async getBoardEventList(){
            let response = await axios.get('/node/userevent');
				this.boardEventList = response.data;
				this.totalPages = Math.ceil(this.boardEventList.length / this.itemsPerPage);
            this.boardEventList = (await axios.get('/node/userevent')
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
          changePage(action) {
			if (action === 'prev' && this.currentPage > 1) {
				this.currentPage--;
				this.scrollToTop();
				this.getBoardEventList();
			} else if (action === 'next' && this.currentPage < this.totalPages) {
				this.currentPage++;
				this.scrollToTop();
				this.getBoardEventList();
			}
		},
        scrollToTop() {
			window.scrollTo({ top: 0, behavior: 'smooth' });
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
#eventtr {
    width: 100%;
}
</style>