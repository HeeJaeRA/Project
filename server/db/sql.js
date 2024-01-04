module.exports = {
	login: `SELECT * FROM login WHERE user_id = ?`,
	join: `insert into user set ?`,

	/*이미지*/
	comImgInsert: `insert into img set commu_code = ?, img_name = ?`,
	qnaImgInsert: `INSERT INTO img SET qna_code = ?, img_name = ?`,
	qnaImg: `SELECT img_name FROM img WHERE qna_code = ?`,
	commuImg: `SELECT * FROM img WHERE commu_code = ?`,
	noticeImg: `SELECT * FROM img WHERE notice_code = ?`,

	/* ----------------- 게시판 ----------------- */
	/*게시판 - 공지사항*/
	noticelist: `SELECT notice_code, title, user_id, write_date, view_cnt, notice_important FROM notice WHERE user_division = '일반유저' ORDER BY notice_important, write_date`,
	noticeinfo: `SELECT notice_code, title, user_id, write_date, view_cnt, content FROM notice WHERE notice_code = ?`,
	// 조회수
	viewcnt: `UPDATE notice SET view_cnt=view_cnt+1 WHERE notice_code = ?`,
	/*게시판 - 이벤트*/
	eventlist: `SELECT event_code, banner_img, title, eventstart_date, eventend_date FROM event ORDER BY eventend_date desc`,
	eventinfo: `SELECT event_code, main_img, title, writer, write_date, content, eventstart_date, eventend_date, coupon_code FROM event WHERE event_code = ?`,
	eventcurrentlist : `SELECT event_code, banner_img, title, eventstart_date, eventend_date FROM event
						WHERE eventend_date >= CURDATE()`,
	eventendlist : `SELECT event_code, banner_img, title, eventstart_date, eventend_date FROM event
					WHERE eventend_date < CURDATE()`,
	eventinsertcoupon: `INSERT IGNORE INTO user_coupon SET ?`,
	/*게시판 - QnA*/
	qnalist: `SELECT qna_code, title, write_date, qna_status, qna_divison, ans_code 
                FROM qna WHERE user_divison = '일반유저' AND writer = ? ORDER BY write_date DESC`,
	qnainfo: `SELECT qna_code, title, write_date, content, qna_status, qna_divison, ans_code FROM qna WHERE writer =? AND qna_code = ?`,
	answerinfo: `SELECT b.qna_code, b.title, b.write_date, b.content, a.qna_status, a.qna_divison, b.ans_code 
                    FROM qna a JOIN qna b
                    ON a.qna_code = b.ans_code
    	            WHERE b.ans_code = ?`,
	qnainsert: `INSERT INTO qna SET ?`,
	qnaupdate: `UPDATE qna SET ? WHERE writer = ? AND qna_code = ? AND qna_status = '답변대기'`,
	qnadelete: `DELETE FROM qna WHERE qna_code = ?`,

	/*게시판 - 커뮤니티*/
	comlist: `SELECT commu_code, title, user_id, write_date, view_cnt, 
				(select count(*) from reply where community.commu_code = reply.commu_code) AS rcount FROM community`,
	comlistp: `SELECT commu_code, title, user_id, write_date, view_cnt, 
				(select count(*) from reply where community.commu_code = reply.commu_code) AS rcount FROM community ORDER BY write_date DESC LIMIT 10 OFFSET ?`,
	cominfo: `SELECT commu_code, title, content, user_id, write_date, view_cnt FROM community WHERE commu_code = ?`,
	cominsert: `INSERT INTO community SET ?`,
	comupdate: `UPDATE community SET ? WHERE commu_code = ?`,
	comdelete: `DELETE FROM community WHERE commu_code = ?`,
	comviewcnt: `UPDATE community SET view_cnt=view_cnt+1 WHERE commu_code = ?`,
	/*게시판 - 리뷰 */
	reviewlist: `SELECT review_code, title, write_date, like_cnt FROM review`,
	/*댓글*/
	relpylist: `WITH RECURSIVE rereply AS (
		SELECT reply_code, content, writer, write_date, commu_code, class, order_num, group_num, report_status, remove_status, 0 AS depth
		FROM reply  WHERE class = 0
		GROUP BY group_num 
	  UNION ALL
		SELECT r.reply_code, r.content, r.writer, r.write_date, r.commu_code,
		  r.class, r.order_num, r.group_num, r.report_status, r.remove_status, rh.depth + 1 AS depth
		FROM reply r JOIN rereply rh 
		ON r.class = rh.reply_code
		WHERE r.commu_code = 1
	  )
	  
	  SELECT reply_code, content, writer, write_date, commu_code, class, order_num, group_num, report_status, remove_status, depth
	  FROM rereply
	   WHERE commu_code = ?
	  ORDER BY group_num, depth, order_num`,

	/*검색*/
	searchnotice: `SELECT * FROM notice  WHERE user_division = '일반유저' AND ?? LIKE concat(concat('%',?),'%');`,
	searchcommu: `SELECT * FROM community WHERE ?? LIKE concat(concat('%',?),'%');`,

	/*페이지 */
	page: `select count(*) as cnt from ??`,
	
	// 판매자
	ptinsert: `insert into imgtest set ?`,
	ptlist: `select * from imgtest`,
	ptinfo: `select * from imgtest where NO = ?`,
	rsalllist: `select * from restaurant`,
	rslist: `select * from restaurant order by rand() limit 4`,
	rsinfo: `select * from restaurant where rs_code = ?`,
	rslike: `update restaurant set like_cnt = like_cnt + 1 where rs_code = ?`,

	//관리자
	eventList: `SELECT *FROM event`, //관리자- 이벤트 리스트 출력
	eventInfo: `select * from event e join coupon c on(e.coupon_code=c.coupon_code) where event_code = ?`, //이벤트단건조회
	insertEvent: `INSERT INTO event set ?`, //관리자 - 이벤트 등록
	eventUpdate: `UPDATE event SET ? WHERE event_code = ?`, //관리자 - 이벤트 수정
	eventDelete: `DELETE FROM event where event_code =?`,
	couponList: `select *from coupon`, //쿠폰 전체목록
	insertCoupon: `INSERT INTO coupon set?`, //관리자 - 쿠폰등록
	insertUserCoupon: `insert into user_coupon set?`, //쿠폰 일괄발급
	couponUpdate: `UPDATE coupon set ?  where coupon_code = ?`, //관리자 - 쿠폰수정
	gradeUserList: `SELECT *FROM user WHERE grade =? and user_status= '활동회원' `, //관리자 - 등급별회원리스트출력
	userList: `SELECT *FROM user where user_status='활동회원'`, //활동회원전체리스트
};

// join : `insert into user(birthday, gender, grade, join_date, nickname, penalty, phone, profile, reserve_cnt, sns_status, user_id, user_name, user_pw, user_status, banned_cnt) values
// ('2023-12-01', 'F', '맛잘알', current_date(),'가가', 0, '010-3333-3333','',0,'사이트계정','user3','김가가','3333','활동회원', 0); `
