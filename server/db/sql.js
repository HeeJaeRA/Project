
module.exports ={
    login: `SELECT * FROM login WHERE user_id ='?'`,

    /*게시판 - 공지사항*/
    noticelist : `SELECT notice_code, title, user_id, write_date, view_cnt FROM notice`,
    noticeinfo : `SELECT notice_code, title, user_id, write_date, view_cnt, content FROM notice WHERE notice_code = ?`,
    // 조회수
    viewcnt : `UPDATE notice SET view_cnt=view_cnt+1 WHERE notice_code = ?`,

    /*게시판 - 이벤트*/
    eventlist : `SELECT event_code, banner_img, title, eventstart_date, eventend_date FROM event`,
    eventinfo : `SELECT event_code, main_img, title, writer, write_date, content, eventstart_date, eventend_date, coupon_code FROM event`,

    /*게시판 - QnA*/
    qnalist : `SELECT qna_code, title, write_date, qna_status, qna_divison, ans_code 
                FROM qna WHERE user_divison = '일반' AND writer = 'user1'`,
    qnainfo : `SELECT qna_code, title, write_date, content, qna_status, qna_divison, ans_code FROM qna WHERE qna_code = ?`,
    answerinfo : `SELECT a.qna_code, b.title, b.write_date, b.content, a.qna_status, a.qna_divison, b.ans_code 
                    FROM qna a JOIN qna b
                    ON a.qna_code = b.ans_code
                    WHERE a.writer = 'user1'`,

    /*게시판 - 커뮤니티*/
    comlist : `SELECT commu_code, title, user_id, write_date, view_cnt FROM community`,
    cominfo : `SELECT commu_code, title, content, user_id, write_date, view_cnt FROM community WHERE commu_code = ?`,
    cominsert : `INSERT INTO community SET ?`,
    comupdate : `UPDATE community SET title = ?, content = ? WHERE commu_code = ?`,
    comdelete : `DELETE FROM community WHERE commu_code = ?`,
    comviewcnt : `UPDATE community SET view_cnt=view_cnt+1 WHERE commu_code = ?`,
   
    /*댓글*/
    relpylist : ``,
    
}

