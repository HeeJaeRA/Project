<template>
  <div>
        <table>
            <thead>
                <tr>
                    <th>글번호</th>
                    <td></td>
                    <th>작성일시</th>
                    <td></td>
                </tr>
                <tr>
                    <th>제목</th>
                    <td></td>
                    <th>작성자</th>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>내용</td>
                </tr>
                <tr>
                    <td colspan="2" class="text-center">
                        <button class="btn btn-xs btn-info" @click="goTo(boardInfo.no)">수정</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <!-- 댓글 존재 -->
            <div v-if="rcoumt > 0" v-bind:bno="board.no" />
            <!-- 댓글 없음 -->
            <div v-else>
                댓글 없음
            </div>
        </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>