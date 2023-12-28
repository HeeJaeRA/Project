module.exports = {
  login: `SELECT * FROM login WHERE user_id ='?'`,
  cartList: `SELECT  re.reserve_num, resta.rs_name, re.reserve_year, re.reserve_month, re.reserve_day, re.reserve_time, re.head_cnt, re.amount, re.booking_date, re.payment_status FROM reservation re JOIN restaurant resta ON (re.rs_code = resta.rs_code)`,
  cartUser: `SELECT  re.reserve_num, resta.rs_name, re.reserve_year, re.reserve_month, re.reserve_day, re.reserve_time, re.head_cnt, re.amount, re.booking_date, re.payment_status FROM reservation re JOIN restaurant resta ON (re.rs_code = resta.rs_code) WHERE user_id = ?`,
};
