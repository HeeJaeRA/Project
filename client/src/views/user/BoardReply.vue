<template>
  <div>
    <div>댓글목록</div>
    <div>
        <ul class="list-group">
            <li class="list-group-item" :key="idx" v-for="(reply, idx) in replyList">
                <div class="container">
                    <div class="row text-start">
                        {{ reply.content }}
                    </div>
                    <div class="row">
                        <div class="col-9 text-end">
                            {{ reply.writer }}
                        </div>
                        <div class="col-3 text-center">
                            {{ reply.created_date }}
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>