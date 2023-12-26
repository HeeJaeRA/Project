

module.exports ={
    login: `SELECT * FROM login WHERE user_id ='?'`,
    /*게시판 - 공지사항*/
    noticelist : `SELECT notice_code, title, user_id, write_date, view_cnt FROM notice`,
    noticeinfo : `SELECT notice_code, title, user_id, write_date, view_cnt, content FROM notice WHERE notice_code = ?`,
    // 조회수
    viewcnt : `UPDATE notice SET view_cnt=view_cnt+1 WHERE notice_code = ?`,

    /*게시판 - 이벤트*/
    /*게시판 - QnA*/
    /*게시판 - 커뮤니티*/
    
}

