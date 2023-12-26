

module.exports ={
    login: `SELECT * FROM login WHERE user_id ='?'`,
    /*게시판 - 공지사항*/
    noticelist : `SELECT notice_code, title, user_id, write_date, view_cnt FROM notice`,
    noticeinfo : `SELECT notice_code, title, user_id, write_date, view_cnt, content FROM notice WHERE notice_code = ?`,
    // 조회수
    viewcnt : `UPDATE notice SET view_cnt=view_cnt+1 WHERE notice_code = ?`,

    /*게시판 - 이벤트*/
    eventlist : `SELECT event_code, `,
    /*게시판 - QnA*/
    qnalist : `SELECT qna_code, title, write_date, FROM qna`,
    qnainfo : `SELECT qna_code, title, write_date, FROM qna WHERE qna_code = ?`,
    /*게시판 - 커뮤니티*/
    comlist : `SELECT title, user_id, write_date, view_cnt FROM community`,
    cominfo : `SELECT title, user_id, write_date, view_cnt, content FROM community WHERE community_code = ?`,
    comupdate : `UPDATE community SET title = ?, content = ? WHERE community_code = ?`,
    comdelete : `DELETE INTO community WHERE community_code = ?`,
    /*댓글*/
    relpylist : ``,
    
}

