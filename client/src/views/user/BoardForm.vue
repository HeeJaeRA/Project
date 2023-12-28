<template>
  <div>
    <slot name="community">
        <form @submit.prevent >
                <label for="no">글번호</label>
                <input type="text" id="no" v-model="boardInfo.no" disabled>

                <label for="title">제목</label>
                <input type="text" id="title"  v-model="boardInfo.title">

                <label for="writer">작성자</label>
                <input type="text" id="writer" v-model="boardInfo.writer" disabled>    

                <label for="content">내용</label>
                <textarea id="content" style="height:200px" v-model="boardInfo.content"></textarea>

                <label for="regdate">작성일자</label>
                <input type="text" id="regdate" v-model="boardInfo.created_date" disabled>

                <label for="file">파일첨부</label>

                <button type="button" class="btn btn-xs btn-info" @click="isUpdated? boardUpdate() : boardInsert()">저장</button>
        </form>
    </slot>
    <slot name="qna">
        <form>
            <label for="title">제목</label>
            <input type="text" id="title" v-model="boardInfo.title">
            <label for="content">내용</label>
            <input type="text" id="content" v-model="boardInfo.content">
            <label for="file">파일첨부</label>
            <input type="text" id="title" v-model="boardInfo.title">
        </form>
    </slot>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>