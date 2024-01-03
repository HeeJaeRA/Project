<template>
    <div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>글번호</th>
                    <th>제목</th>
                    <th>작성일자</th>
                    <th>유형</th>
                    <th>답변상태</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="i" v-for="(qna, i) in paginatedRestaurants" @click="goToDetail(qna.qna_code)">
                    <td>{{ i + 1 }}</td>
                    <td>{{ qna.qna_divison }}</td>
                    <td>{{ qna.title }}</td>
                    <td>{{ getDateFormat(qna.write_date) }}</td>
                    <td>{{ qna.qna_status }}</td>
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
            boardQnaList : [],
            userId : window.localStorage.getItem('userId'),
            itemsPerPage: 5,
			currentPage: 1,
			totalPages: 0,
        };
    },
    computed: {
		paginatedRestaurants() {
			let startPage = (this.currentPage - 1) * this.itemsPerPage;
			let endPage = startPage + this.itemsPerPage;
			return this.boardQnaList.slice(startPage, endPage);
		},
	},
    created(){
        this.getBoardQnaList();
    },
    methods : {
        async getBoardQnaList(){
            let response = await axios.get(`/node/qna/${this.userId}`);
				this.boardQnaList = response.data;
				this.totalPages = Math.ceil(this.boardQnaList.length / this.itemsPerPage);
            this.boardQnaList = (await axios.get(`/node/qna/${this.userId}`)
                                   .catch(err => console.log(err))).data;
        },
        async goToDetail(qnaCode){
            this.$router.push({path : '/qnainfo', query : {qnaCode : qnaCode}});
        },
        getDateFormat(date){
            return this.$dateFormat(date);
        },
        async goToInsert(){
            this.$router.push({path : '/qnaform'});
        },
        changePage(action) {
			if (action === 'prev' && this.currentPage > 1) {
				this.currentPage--;
				this.scrollToTop();
				this.getBoardQnaList();
			} else if (action === 'next' && this.currentPage < this.totalPages) {
				this.currentPage++;
				this.scrollToTop();
				this.getBoardQnaList();
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