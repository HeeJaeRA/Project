<template>
    <div>
        <form class="d-flex" action="#" method="POST">
               <input
                  style="width: 800px"
                  class="form-control me-sm-2"
                  type="search"
                  placeholder="Search"
                  name="word"
               />
               <button class="btn btn-secondary my-2 my-sm-0">Search</button>
        </form>
            <table>
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
                    <tr :key="i" v-for="(board, i) in boardNoticeList" @click="goToDetail(board.no)">
                        <td>{{ board.no }}</td>
                        <td>{{ board.title }}</td>
                        <td>{{ board.writer }}</td>
                        <td>{{ getDateFormat(board.write_date) }}</td>
                        <td>{{ board.view_cnt }}</td>
                    </tr>
                </tbody>
            </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {

}
</script>

<style>

</style>