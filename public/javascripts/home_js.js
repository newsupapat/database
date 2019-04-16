$(document).ready(function () {
    $('body').addClass('sidebar-mini');
    var dragContainer = new hx.DragContainer('#container')
    var dragContainer = new hx.DragContainer('#container2')

    hx.select('#resetOrder').on('click', function() {
    dragContainer.order(undefined)
    })
    Array.prototype.sumUnic = function (name, sumName) {
        var returnArr = [];
        var obj = this;
        for (var x = 0; x < obj.length; x++) {
            if ((function (source) {
                    if (returnArr.length == 0) {
                        return true;
                    } else {
                        for (var y = 0; y < returnArr.length; y++) {
                            var isThere = [];
                            if (returnArr[y][name] == source[name]) {
                                if (parseInt(source[sumName]) > 0) {
                                    returnArr[y][sumName] = parseInt(returnArr[y][sumName]) + parseInt(source[sumName]);
                                    return false;
                                }
                            } else if (parseInt(source[sumName]) > 0) {
                                isThere.push(source);
                            }
                        }
                        if (isThere.length > 0) returnArr.push(source);
                        return false;
                    }
                })(obj[x])) {
                returnArr.push(obj[x]);
            }
        }
        return returnArr;
    }
    var Statement_data = $.ajax({
        async: false,
        url: '/data/new',
        type: 'get',
        data: {
            'Get': 'statement'
        },
        dataType: "JSON"
    }).responseJSON;
    // console.log(Statement_data.groupBy(v => (v.Employeeid)));      
    // console.log(Statement_data.map(x=> x.Employeeid));
    // var ot_late = Statement_data.sumUnic('Code','Sub_total')
    // console.log(ot_late);

    var count_code = _.countBy(Statement_data, function(num) {
        return num.Code ;
      });
    var count = [];
    var header = [];
    var keys = Object.keys(count_code);
    keys.forEach(function(key){
        header.push(key);
        count.push(count_code[key]);
    });
        // console.log(count,header);
        
    Bonus = Statement_data.sumUnic('Employeeid', 'Sub_total')
    // console.log(Bonus);
    new Chart(document.getElementById("bar-chart"), {
        type: 'bar',
        data: {
            labels: Bonus.map(x => x.Employeeid),
            datasets: [{
                label: "sub_total",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850","#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                data: Bonus.map(x => x.Sub_total)
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Data Bonus For Each EmployeeID'
            },
            scales: {
                xAxes: [{
                    barPercentage: 0.4,
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    new Chart(document.getElementById("code"), {
        type: 'bar',
        data: {
            labels: header,
            datasets: [{
                label: "Code",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850","#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                data: count
            }]
        },
        options: {
            animation: {
                animateScale: true
            },
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Count Code'
            },
            scales: {
                xAxes: [{
                    barPercentage: 0.9,
                    categoryPercentage: 1,
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            }
        }
    });
    var Time = $.ajax({
        async: false,
        url: '/data/new',
        type: 'get',
        data: {
            'Get': 'time'
        },
        dataType: "JSON"
    }).responseJSON;
    // console.log(Time);
    var End_Hours = 0;
    var End_Min = 0;
    var Start_Hours= 0;
    var Start_Min= 0;
    var array = [];
    var array_min = [];
    var array_end = [];
    var array_min_end = [];

    Time.forEach(element => {
        array.push(parseInt(element.Start_time.slice(11, 13), 10))
        array_min.push(parseInt(element.Start_time.slice(14, 16), 10));

        array_end.push(parseInt(element.End_time.slice(11, 13), 10))
        array_min_end.push(parseInt(element.End_time.slice(14, 16), 10));

        End_Hours = End_Hours + parseInt(element.End_time.slice(11, 13), 10);
        End_Min = End_Min + parseInt(element.End_time.slice(14, 16), 10);
        Start_Hours = Start_Hours + parseInt(element.Start_time.slice(11, 13), 10);
        Start_Min = Start_Min + parseInt(element.Start_time.slice(14, 16), 10);
    });
    $('#start_time_max').text("Max  "+_.max(array)+":"+array_min[array.indexOf(_.max(array))]+" AM  "+"Min  "+_.min(array)+":"+array_min[array.indexOf(_.min(array))]+" AM ");
    $('#start_time').text(Math.floor(Start_Hours/Time.length)+":"+Math.floor(Start_Min/Time.length)+" AM ");

    $('#end_time_max').text("Max  "+_.max(array_end)+":"+array_min_end[array_end.indexOf(_.max(array_end))]+" PM  "+"Min  "+_.min(array_end)+":"+array_min_end[array_end.indexOf(_.min(array_end))]+" PM ");
    $('#end_time').text(Math.floor(End_Hours/Time.length)+":"+Math.floor(End_Min/Time.length)+" PM ");
    //ot-late
    var ot_late = $.ajax({
        async: false,
        url: '/data/new',
        type: 'get',
        data: {
            'Get': 'ot_late'
        },
        dataType: "JSON"
    }).responseJSON;
    // console.log(ot_late);
    var OT = [];
    var LATE = [];
    ot_late.forEach(element => {
        if(element.Code === 'OT') OT.push(element.Sub_total);
        else if(element.Code === 'LATE') LATE.push(element.Sub_total);
    });
    // console.log(ot_late,OT,LATE);
    $('#ot').text( "OT-"+_.reduce(OT, function(memo, num){ return memo + num; }, 0)+"   LATE-"+_.reduce(LATE, function(memo, num){ return memo + num; }, 0));
    $('#ot_late_text').text('MaxOT:'+_.max(OT)+'  MinOT:'+_.min(OT));
    $('#ot_late_text2').text('MaxLate:'+_.max(LATE)+'  MinLate:'+_.min(LATE));
    //salary
    var salary = $.ajax({
        async: false,
        url: '/data/new',
        type: 'get',
        data: {
            'Get': 'salary'
        },
        dataType: "JSON"
    }).responseJSON;
    // console.log(salary);
    new Chart(document.getElementById("salary"), {
        type: 'bar',
        data: {
            labels: salary.map(x=>x._id),
            datasets: [{
                label: "Code",
                backgroundColor: ["#fb6340", "#fb6340", "#fb6340", "#fb6340", "#fb6340","#fb6340", "#fb6340", "#fb6340", "#e8c3b9", "#c45850"],
                data: salary.map(x=>x.s_Salary)
            }]
        },
        options: {
            animation: {
                animateScale: true
            },
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Count Code'
            },
            scales: {
                xAxes: [{
                    barPercentage: 0.9,
                    categoryPercentage: 1,
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            }
        }
    });
    var lastcom = $.ajax({
        async: false,
        url: '/data/new',
        type: 'get',
        data: {
            'Get': 'lastcom'
        },
        dataType: "JSON"
    }).responseJSON;
    console.log(lastcom);
    var count_company = _.countBy(lastcom, function(num) {
        return num.Nuber_of_company_worked ;
      });
    //   console.log(count_company);
    var count2 = [];
    var header2 = [];
    var keys2 = Object.keys(count_company);
    keys2.forEach(function(key){
        header2.push(key);
        count2.push(count_company[key]);
    });
    new Chart(document.getElementById("lastcom"), {
        type: 'horizontalBar',
        data: {
            labels: header2,
            datasets: [{
                label: "Lastcompany Work",
                backgroundColor: ["#fb6340", "#fb6340", "#fb6340", "#fb6340", "#fb6340","#fb6340", "#fb6340", "#fb6340", "#e8c3b9", "#c45850"],
                data: count2
            }]
        },
        options: {
            responsive: true,
            animation: {
                animateScale: true
            },
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Last Company Work'
            },
            scales: {
                xAxes: [{
                    barPercentage: 0.9,
                    categoryPercentage: 1,
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    },ticks: {
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            }
        }
    });
    var marital = $.ajax({
        async: false,
        url: '/data/new',
        type: 'get',
        data: {
            'Get': 'marital'
        },
        dataType: "JSON"
    }).responseJSON;
    // console.log(marital);
    var count_marital = _.countBy(marital, function(num) {
        return num.Marital ;
      });
    console.log(count_marital);
    $('#Marital').text("Marital :" + ((count_marital.Y/(count_marital.Y+count_marital.N))*100).toFixed(2) + "%");
    $('#Marital_text').text("Non-Marital :" + ((count_marital.N/(count_marital.Y+count_marital.N))*100).toFixed(2) + "%");
    var nationality = $.ajax({
        async: false,
        url: '/data/new',
        type: 'get',
        data: {
            'Get': 'nation'
        },
        dataType: "JSON"
    }).responseJSON;
    var count_nation = _.countBy(nationality, function(num) {
        return num.Nationality ;
      });
    var count_nation2 = [];
    var header_nation = [];
    var keys3 = Object.keys(count_nation);
    keys3.forEach(function(key){
        header_nation.push(key);
        count_nation2.push(count_nation[key]);
    });
    
    new Chart(document.getElementById("nation"), {
        type: 'horizontalBar',
        data: {
            labels: header_nation,
            datasets: [{
                label: "Nationality",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850","#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                data: count_nation2
            }]
        },
        options: {
            responsive: true,
            animation: {
                animateScale: true
            },
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Nationality'
            },
            scales: {
                xAxes: [{
                    barPercentage: 0.9,
                    categoryPercentage: 1,
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    },ticks: {
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            }
        }
    });
    var gpax = $.ajax({
        async: false,
        url: '/data/new',
        type: 'get',
        data: {
            'Get': 'gpax'
        },
        dataType: "JSON"
    }).responseJSON;
    gpax = _.groupBy(gpax, 'EM_id');
    var keys_gpax = Object.keys(gpax);
    var header_gpax=[];
    var count_gpax =[];
    keys_gpax.forEach(function(key){
        header_gpax.push(key);
        count_gpax.push(gpax[key][gpax[key].length-1].GPAX);
    });
    // console.log(count_gpax);
    // console.log(header_gpax);
    $('#GPAX').text("AVG "+(_.reduce(count_gpax, function(memo, num){ return memo + num; }, 0)/count_gpax.length).toFixed(2));
    $('#GPAX_text').text("Max :"+_.max(count_gpax)+"  Min :"+_.min(count_gpax));

    var absent = $.ajax({
        async: false,
        url: '/data/new',
        type: 'get',
        data: {
            'Get': 'absent'
        },
        dataType: "JSON"
    }).responseJSON;
    console.log(absent.length);
    $('#absent').text("Absent : "+absent.length + " Times This Month");

    var education = $.ajax({
        async: false,
        url: '/data/new',
        type: 'get',
        data: {
            'Get': 'education'
        },
        dataType: "JSON"
    }).responseJSON;
    education = _.groupBy(education, 'Degree');
    var keys_education = Object.keys(education);
    var header_education =[];
    var count_education =[];
    keys_education.forEach(function(key){
        header_education.push(key);
        count_education.push(education[key].length);
    });
    console.log(education,header_education,count_education);

    new Chart(document.getElementById("degree"), {
        type: 'horizontalBar',
        data: {
            labels: header_education,
            datasets: [{
                label: "Degree",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850","#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                data: count_education
            }]
        },
        options: {
            responsive: true,
            animation: {
                animateScale: true
            },
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Nationality'
            },
            scales: {
                xAxes: [{
                    barPercentage: 0.9,
                    categoryPercentage: 1,
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    },ticks: {
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]
            }
        }
    });
    var gender = $.ajax({
        async: false,
        url: '/data/new',
        type: 'get',
        data: {
            'Get': 'gender'
        },
        dataType: "JSON"
    }).responseJSON;
    gender = _.countBy(gender, function(num) {
        return num.gender ;
      });
      console.log(gender);
      $('#gender').text("Male :"+ gender.M + "  Female :"+gender.F+"  None :"+gender.None);
      
});