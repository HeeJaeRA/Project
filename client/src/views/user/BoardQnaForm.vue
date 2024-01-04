<template>
  <div>
    <table class="table table-hover">
            <thead>
                <tr>
                    <th>제목</th>
                    <td><input type="text" v-model="qnaInfo.title" /></td>
                </tr>
                <tr>
                    <th>작성일자</th>
                    <td><input type="text" v-model="qnaInfo.write_date" readonly /></td>
                </tr>
                <tr>
                    <th>구분</th>
                    <td><select v-model="selectedOption">
                            <option value="회원정보">회원정보</option>
                            <option value="예약및결제">예약및결제</option>
                            <option value="기타문의">기타문의</option>
                    </select></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="6">
                        <pre><input type="text" v-model="qnaInfo.content" /></pre>
                    </td>
                </tr>
                <tr>
                    <th>파일첨부</th>
                    <td>
                        <input type="file" ref="fileInput" @change="handleFileChange" multiple/>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="row">
        <button type="button" class="btn btn-xs btn-info" @click="saveInfo(searchNo)">저장</button>
        </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";

export default {
  data() {
        return {
            searchNo : '',
            qnaInfo : {
                qna_code : '',
                write_date : '',
                title : '',
                writer : '',
                content : '',
                qna_status : '답변대기',
                ans_code : '',
                qna_divison : '',
                user_divison : '일반유저'

             },
             isUpdated : false,
            boardQnaList : {},
            selectedOption: '',
            userId : window.localStorage.getItem('userId'),
            images: [],
            bno: ''
        };
    },
    created() {
        this.searchNo = this.$route.query.qndCode;
        this.getBoardQnaList();
        if(this.searchNo > 0) {
            // 수정
            this.getBoardQnaInfo();
            this.isUpdated = true;
        } else {
           // 등록
            this.qnaInfo.write_date = this.getToday();
            this.qnaInfo.writer = this.userId; 
        }
        
    },
    methods: {
        async getBoardQnaInfo() {
           let result = await axios.get(`/node/qna/${this.userId}/${this.searchNo}`)
                       .catch(err => console.log(err));
            console.log(result);
            this.qnaInfo = result.data; 
            this.qnaInfo.write_date = this.$dateFormat(this.qnaInfo.write_date);
            this.selectedOption = result.data.qna_divison;
            this.qnaInfo.writer = this.userId;          
        },
        async getBoardQnaList() {
            let result = await axios.get(`node/qna/${this.userId}`)
                                    .catch(err => console.log(err))
            this.boardQnaList = result.data;
        },
        getToday() {
            return this.$dateFormat('', 'yyyy-MM-dd');
        },
        async saveInfo(qnaCode) {
            let formData = new FormData();
            this.images.forEach((file) => {
				formData.append(`files`, file);
			});
            try {
                let info = this.getInfo(qnaCode);
                let result = await axios(info);
                if(result.data.affectedRows > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "정상 처리",
                        text: "정상적으로 처리되었습니다.",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "처리 실패",
                        text: "정상적으로 처리되지 않았습니다.",
                    });
                }
                this.bno = result.data.insertId;
                console.log(123, result.data.insertId);
				formData.append('bno', this.bno);
                this.$router.push({path : `/qna` });
            } catch(err) {
                console.error(err);
            } finally {
                let res = await axios.post(`/node/qnaPhotos`, formData);
                let uploadedImages = res.data.filenames;
				console.log('이미지' , uploadedImages);

				this.images = uploadedImages;
            }
        },
        getInfo(qnaCode) {
            let method = '';
            let url = '';
            let data = null;

            if(qnaCode > 0){
                method = 'put';
                url = `/node/qna/${this.userId}/${qnaCode}`;
                data = {
                    param : {
                        title : this.qnaInfo.title,
                        writer : this.qnaInfo.writer,
                        content : this.qnaInfo.content
                    }
                }

            } else {
                method = 'post';
                url = `/node/qna`;
                let info = this.qnaInfo;
                this.qnaInfo.writer = this.userId;
                this.qnaInfo.qna_divison = this.selectedOption;
                console.log('this.selectedOption', this.selectedOption);
                console.log(info);
                data = {
                    param : this.qnaInfo
                };
                this.$router.push({path : `/qna`, query : {qnaCode : qnaCode}});
            }
            return {
                method,
                data,
                url
            }
        },
        handleFileChange(event) {
            this.images = Array.from(event.target.files);
        }
    }
}
</script>

<style>

</style>