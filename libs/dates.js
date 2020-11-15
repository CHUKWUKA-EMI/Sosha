  const days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ];

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]  


export const formatDate = (time) => {
    
    const date = new Date(time);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = days[date.getDay()];
    let dayNum = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();

    const now = new Date();
    const thisDayNum = now.getDate();
    const thisMonth = months[now.getMonth()];
    const thisYear = now.getFullYear();


    if(min < 10){ min = `0${min}`;}

    let format;
    if(hour < 12){ 
      format = 'am' 
    } else {

      if(hour >= 13){ hour = hour - 12; }

      format = 'pm'
    }


     let newDayNum;
    if([1, 21, 31].includes(dayNum)){
      newDayNum = `${dayNum}st`;
    } else if([2, 22].includes(dayNum)){
      newDayNum = `${dayNum}nd`;
    } else if([3, 23].includes(dayNum)){
      newDayNum = `${dayNum}rd`;
    } else {
      newDayNum = `${dayNum}th`;
    }

    return `${year === thisYear && month === thisMonth && dayNum === thisDayNum ? 'Today,' : `${day},`} 
    ${year === thisYear && month === thisMonth && dayNum === thisDayNum ? '' : newDayNum} 
    ${year === thisYear && month === thisMonth ? '' : month} 
    ${year === thisYear ? '' : year} ${hour}:${min}${format}`;
  }
