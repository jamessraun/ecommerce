
function calculate_date(days){
  var one_day=(1000*60*60*24)*(+days);
  var now_ms=new Date().getTime()
  var res = one_day+now_ms
  return new Date(res);
}

module.exports = calculate_date;
