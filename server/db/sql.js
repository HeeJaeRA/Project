module.exports = {
	ptinsert: `insert into imgtest set ?`,
	ptlist: `select * from imgtest`,
	ptinfo: `select * from imgtest where NO = ?`,
	rsalllist: `select * from restaurant`,
	rslist: `select * from restaurant order by rand() limit 4`,
	rsinfo: `select * from restaurant where rs_code = ?`,
	rslike: `
	update restaurant set like_cnt = like_cnt + 1 where rs_code = ?`,
};
