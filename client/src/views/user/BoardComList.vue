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
                <tr :key="i" v-for="(community, i) in paginatedRestaurants" @click="goToDetail(community.commu_code)">
                    <td>{{ i + 1 }}</td>
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
import Swal from "sweetalert2";

export default {
    data(){
        return {
            selectedOption : 'title',
            boardComList : [],
            itemsPerPage: 10,
			currentPage: 1,
			totalPages: 0,
            userId : window.localStorage.getItem('userId'),
        };
    },
    computed: {
		paginatedRestaurants() {
			let startPage = (this.currentPage - 1) * this.itemsPerPage;
			let endPage = startPage + this.itemsPerPage;
			return this.boardComList.slice(startPage, endPage);
		},
	},
    created(){
        this.getBoardComList();
    },
    methods : {
        async getBoardComList(){
            let response = await axios.get('/node/community');
				this.boardComList = response.data;
				this.totalPages = Math.ceil(this.boardComList.length / this.itemsPerPage);
            this.boardComList = (await axios.get('/node/community')
                                   .catch(err => console.log(err))).data;
        },
        async goToDetail(comCode){
            console.log('user', this.userId);
            if(this.userId != null) {
                (await axios.patch(`/node/community/${comCode}`)
                         .catch(err => console.log(err))).data;
                this.$router.push({path : '/communityinfo', query : {comCode : comCode}});
            } else {
                Swal.fire({
                        icon: "warning",
                        title: "접근 권한이 없습니다."
                    });
            }
            
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
        },
        changePage(action) {
			if (action === 'prev' && this.currentPage > 1) {
				this.currentPage--;
				this.scrollToTop();
				this.getBoardComList();
			} else if (action === 'next' && this.currentPage < this.totalPages) {
				this.currentPage++;
				this.scrollToTop();
				this.getBoardComList();
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
</style>