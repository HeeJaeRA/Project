<template>
	<div class="reform">
		<div class="row1">
			<div>작성자</div>
			<div id="nickname">
				{{ this.userId }}
			</div>
		</div>
		<div class="row">
			<div class="flex">
				<input type="text" v-model="replyInfo.content" />
				<button type="button" class="btn btn-outline-secondary" @click="saveReply()">댓글 작성</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
	props: ['comCode'],
	data() {
		return {
			searchNo: '',
			replyList: [],
			replyInfo: {
				reply_code: '',
				content: '',
				writer: '',
				commu_code: '',
			},
			userId: window.localStorage.getItem('userId'),
			nickname: window.localStorage.getItem('nickname'),
			reloadnum: 0,
		};
	},

	created() {
		this.searchNo = this.$route.query.comCode;
		this.replyInfo.write_date = this.getToday();
		this.replyInfo.writer = this.userId;
		this.getreplyList();
	},
	methods: {
		async getreplyList() {
			let result = await axios.get(`/node/reply?comCode=${this.searchNo}`).catch((err) => console.log(err));
			//console.log('replylist', result.data);
			this.replyList = result.data;
		},
		getToday() {
			return this.$dateFormat('', 'yyyy-MM-dd');
		},
		async saveReply() {
			if (!this.replyInfo.content.trim()) {
				Swal.fire({
					title: '댓글이 입력되지 않았습니다.',
					icon: 'warning',
				});
				return;
			}
			let data = {
				param: {
					content: this.replyInfo.content,
					writer: this.userId,
					commu_code: this.searchNo,
				},
			};
			let result = await axios.post('/node/replyinsert', data).catch((err) => console.log(err));
			console.log('savereply', result);
			// this.getreplyList();
			this.replyInfo.content = '';
			this.reloadnum++;
			this.$emit('reload', this.reloadnum);

			/* let result = null;
            console.log(this.replyInfo.class);
            if(this.replyInfo.class == 0) {
                let data = {
                param : {
                    content : this.replyInfo.content,
                    writer : this.userId,
                    commu_code : this.comCode,
                },
            }
                console.log('data rform', data);
                result = await axios.post(`/node/replyinsert`, data)
                                    .catch((err) => console.log(err));
                console.log('savereply', result);
                // this.getreplyList();
            } else {
                let data = {
                param : {
                    content : this.replyInfo.content,
                    writer : this.userId,
                    commu_code : this.comCode,
                    group_num: this.replyInfo.group_num
                }
            };
                result = await axios.post(`/node/rereplyinsert`, data)
                                    .catch((err) => console.log(err));
                console.log('saveReRe', result);
                // this.getreplyList();
            } */
		},
	},
};
</script>

<style scoped>
div {
	font-family: 'NEXON Lv1 Gothic OTF';
}
.reform {
	margin-top: 15px;
}
input[type='text'] {
	height: 39px;
	border-radius: 5px;
	margin-right: 2px;
	width: 400px;
}
#nickname {
	margin-left: 50px;
	margin-right: 330px;
}
.row1 {
	display: flex;
	text-align: right;
	justify-content: right;
}
.col {
	width: 100px;
}
.flex {
	display: flex;
	margin-top: 10px;
	margin-bottom: 20px;
	justify-content: right;
}
</style>
