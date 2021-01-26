const input2 = {
    '2020-01-01' : 6, 
    '2020-01-04' : 12,
    '2020-01-05' : 14,
    '2020-01-06' : 2,
    '2020-01-07' : 4,
}

const input1 = {
    '2020-01-01' : 4, 
    '2020-01-02' : 4,
    '2020-01-03' : 6,
    '2020-01-04' : 8,
    '2020-01-05' : 2,
    '2020-01-06' : -6,
    '2020-01-07' : 2,
    '2020-01-08' : -2
}


const findNewDic = (input) => {
    const weekMap = {
        '0' : {
            name : "sun",
            selected : false
        },
        '1' : {
            name : "mon",
            selected : false
        },
        '2' : {
            name: 'tue',
            selected : false
        },
        '3' : {
            name : 'wed',
            selected : false
        },
        '4' : {
            name : 'thurs',
            selected : false
        },
        '5' : {
            name : 'fri',
            selected : false
        },
        '6' : {
            name : 'sat',
            selected : false
        }
    }
    
    var output = {};
    for(var date in input)
    {
        var year = date.substring(0, 4);
        var month = date.substring(5, 7);
        var day = date.substring(8, 10);
        var dayNumber = String(dayOfWeek(Number(year), Number(month), Number(day)));
        var valueInDates = input[date];
        if(output[weekMap[dayNumber]['name']])
        {
            output[weekMap[dayNumber]['name']]+= valueInDates
        }
        else
        {
            output[weekMap[dayNumber]['name']] = valueInDates;
            weekMap[dayNumber]['selected'] = true
        }
    }
    //  console.log(output);
    // console.log(weekMap);
    var unselectedKeys = [];
    for(var key in weekMap){
        if(!weekMap[key]['selected'])
        {
            unselectedKeys.push(key);
        }
    }
    // console.log(unselectedKeys);
    unselectedKeys.map(key => {
        if(weekMap[key]['selected'])
        {
            return;
        }
        else if(key == '6' && weekMap['0']['selected'] && weekMap['5']['selected'])
        {
           weekMap['6']['selected'] = true;
           output[weekMap['6']['name']] = (output[weekMap['5']['name']] + output[weekMap['0']['name']])/2;
        }
        else if(weekMap[String(Number(key)-1)]['selected'] && weekMap[String(Number(key)+1)]['selected'])
        {
            output[weekMap[key]['name']] = (output[weekMap[String(Number(key)-1)]['name']] + output[weekMap[String(Number(key)-1)]['name']])/2;
        }
        else
        {
            if(!weekMap[String(Number(key)+1)]['selected'] && weekMap[String(Number(key)+2)]['selected'])
            {
                weekMap[key]['selected'] = true
                weekMap[String(Number(key)+1)]['selected'] = true
                var first = output[weekMap[String(Number(key)-1)]['name']];
                var second = output[weekMap[String(Number(key)+2)]['name']];
                output[weekMap[key]['name']] = (2*first + second)/3;
                output[weekMap[String(Number(key)+1)]['name']] = (first + 2*second)/3;
            }
        }
    })
    // console.log("final output");
    console.log(output);
    // console.log(weekMap);
}

function dayOfWeek(year, month, day) {
    var arr = [ 0, 3, 2, 5, 0, 3, 
        5, 1, 4, 6, 2, 4];
    year-= (month < 3)?1:0;
    return Math.floor(( year + year/4 - year/100 + year/400 + arr[month-1] + day) % 7);
}

findNewDic(input1);
findNewDic(input2);