
function calculate_fine(date){
  let res = new Date()-date
  let oneDay = 1000*60*60*24
  let fineDay = res/oneDay
  if(fineDay>1)
    return fineDay*1000;
  else return 0;
}

module.exports = calculate_fine;
