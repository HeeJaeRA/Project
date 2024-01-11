<template>
	<div>
		<div v-if="replyList[0] == null">
			<h6>댓글</h6>
			<p>등록된 댓글이 없습니다.</p>
		</div>
		<div v-else>
			<h6>댓글</h6>
			<br />
			<ul class="list-group">
				<!-- {{
        replyList
      }} -->
				<li class="list-group-item" :key="idx" v-for="(reply, idx) in replyList">
					<div class="container1" v-if="reply.remove_status == 'N'">
						<div class="row">
							<div class="col" id="nickname" style="padding-left: 10px">
								{{ reply.writer }}
							</div>
							<div class="col" style="padding-left: 108px">
								{{ getDateFormat(reply.write_date) }}
							</div>
							<br />
							<div id="flex">
								<div id="recontent">
									{{ reply.content }}
								</div>
								<div id="rerebtn" v-if="reply.class == 0">
									<button type="button" class="btn btn-outline-secondary" @click="InsertRere(idx)">
										답글달기
									</button>
								</div>
							</div>
							<div v-if="this.nums == idx" class="flex">
								<input type="text" v-if="reply.insertcancle" v-model="replyInfo.content" />
								<button
									class="btn btn-outline-secondary"
									type="button"
									v-if="reply.insertcancle"
									@click="saveReReply(idx, reply.commu_code, reply.group_num)"
								>
									답글 작성
								</button>
								<button
									class="btn btn-warning text-white"
									type="button"
									v-if="reply.insertcancle"
									@click="modify(idx)"
								>
									취소
								</button>
							</div>

							<div v-if="reply.writer == this.userId" style="text-align: right; padding-right: 38px">
								<button
									type="button"
									class="btn btn-primary"
									style="background-color: lightblue; color: black; border-color: lightblue"
									@click="replyupdate(idx, reply.reply_code), getreplysel(reply.reply_code)"
								>
									수정
								</button>
								<button
									type="button"
									class="btn btn-outline-warning"
									style="background-color: #e7f89d; color: black; border-color: #e7f89d"
									@click="replydelete(reply.reply_code)"
								>
									삭제
								</button>

								<div v-if="this.renums == idx && rerere">
									<!-- {{ "내용: " + reply.content }} -->
									<input type="text" v-if="reply.editing" v-model="this.replyInfo.content" />
									<button
										type="button"
										v-if="reply.editing"
										class="btn btn-primary"
										style="background-color: black; color: white; border-color: black"
										@click="updatereply(reply.reply_code, idx)"
									>
										댓글 수정
									</button>
									<!-- <ReplyForm v-bind:comCode="this.comCode" /> -->
									<button
										class="btn btn-outline-secondary"
										v-if="reply.editing"
										type="button"
										@click="modify(idx)"
									>
										취소
									</button>
								</div>
							</div>

							<!-- <div v-if="reply.writer == this.nickname">
              <button
                type="button"
                class="btn btn-warning"
                @click="replydelete(reply.reply_code)"
              >
                삭제
              </button>
            </div> -->
						</div>
						<div>
							<ReReplyList
								v-bind:comCode="reply.commu_code"
								v-bind:groupNum="reply.group_num"
								:key="replyreload"
							/>
						</div>
					</div>
					<div v-else>
						<div class="row">
							<div class="row text-start">삭제된 댓글입니다.</div>
						</div>
					</div>
				</li>
			</ul>
			<div>
				<!-- <input type="text" v-model="replyInfo.content"/>
            <button type="button" @click="saveReply()">댓글 작성</button> -->
				<!-- <ReplyForm v-bind:comCode="this.comCode" /> -->
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import ReReplyList from './ReReplyList.vue';
// import ReplyForm from './ReplyForm.vue';
import Swal from 'sweetalert2';
export default {
	props: ['comCode'],
	data() {
		return {
			replyList: [],
			replyInfo: {
				reply_code: '',
				content: '',
				writer: '',
				commu_code: '',
				group_num: '',
			},
			userId: window.localStorage.getItem('userId'),
			nickname: window.localStorage.getItem('nickname'),
			reredisply: false,
			nums: 100,
			renums: 100,
			insertcancle: false,
			editing: false,
			replyreload: 0,
		};
	},
	components: {
		ReReplyList,
		// ReplyForm
	},
	created() {
		this.searchNo = this.$route.query.comCode;
		this.getreplyList();
		// if (this.replyList.reply_code > 0) {
		//   this.getreplysel();
		// }
	},
	methods: {
		async getreplysel(replycode) {
			let result = await axios.get(`/node/replyinfo/${replycode}`).catch((err) => console.log(err));
			this.replyInfo = result.data[0];
			this.replyInfo.write_date = this.$dateFormat(this.replyInfo.write_date);
			this.replyInfo.writer = this.userId;
		},
		async getreplyList() {
			let result = await axios.get(`/node/reply?comCode=${this.comCode}`).catch((err) => console.log(err));
			//console.log('replylist', result.data);
			this.replyList = result.data;
		},
		getDateFormat(date) {
			return this.$dateFormat(date);
		},
		/*          async saveReply() {
            let data = {
                param : {
                    content : this.replyInfo.content,
                    writer : this.userId,
                    commu_code : this.comCode
                }
            };
            let result = await axios.post("/node/replyinsert" , data)
                                    .catch((err) => console.log(err));
            console.log('savereply', result);
            this.getreplyList();
        },*/
		async saveReReply(idx, cCode, gNum) {
			this.replyList[idx].insertcancle = true;
			let data = {
				content: this.replyInfo.content,
				writer: this.userId,
				commu_code: cCode,
				group_num: gNum,
			};
			console.log(data);
			let result = await axios.post(`/node/rereplyinsert`, data).catch((err) => console.log(err));

			this.replyreload++;
			this.replyList[idx].insertcancle = false;
			this.replyInfo.content = '';
		},
		InsertRere(reply) {
			console.log(reply);
			this.nums = reply;
			this.replyList[reply].insertcancle = true;
		},
		replyupdate(reupdate, renum) {
			console.log(reupdate);
			this.renums = reupdate;
			this.replyList[reupdate].editing = true;
			this.rerere = true;
		},

		async replydelete(replycode) {
			let result = await axios.delete(`/node/replydelete/${replycode}`).catch((err) => console.log(err));
			console.log('replyList.vue', result.data);
			Swal.fire({
				icon: 'success',
				title: '정상 처리',
				text: '댓글이 삭제되었습니다.',
			});
			this.getreplyList();
		},
		async updatereply(replycode, idx) {
			this.replyList[idx].editing = true;
			let obj = this.replyInfo.content;
			console.log(replycode);
			console.log(obj);
			let data = {
				// 수정 해야함 content 값이 undefined
				content: obj,
			};
			console.log('data', data);
			let result = await axios.put(`/node/replyupdate/${replycode}`, data);
			console.log(result);
			Swal.fire({
				icon: 'success',
				title: '정상 처리',
				text: '댓글이 수정되었습니다.',
			});
			this.replyList[idx].editing = false;
			this.replyInfo.content = '';
			this.getreplyList();
		},
		modify(idx) {
			this.replyList[idx].editing = false;
			this.replyList[idx].insertcancle = false;
			this.replyInfo.content = '';
		},
	},
};
</script>

<style scoped>
div {
	font-family: 'NEXON Lv1 Gothic OTF';
}
#nickname {
	font-weight: 1000;
	width: 200px;
}
input[type='text'] {
	height: 39px;
	border-radius: 5px;
	margin-right: 2px;
	width: 300px;
}
#flex {
	display: flex;
	justify-content: space-around;
}
.flex {
	display: flex;
	margin-top: 10px;
	margin-bottom: 8px;
	justify-content: right;
}
button {
	margin: 0px 3px 5px 3px;
	border-radius: 20px;
}
#rerebtn {
	margin: 20px 0px 20px 120px;
	display: right;
}
.visible {
	display: none;
}
#recontent {
	margin-left: 5px;
	margin-top: 15px;
	width: 800px;
}
</style>
