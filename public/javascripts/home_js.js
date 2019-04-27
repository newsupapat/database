$(document).ready(function() {
  $("body").addClass("sidebar-mini");
  var dragContainer = new hx.DragContainer("#container");
  var dragContainer = new hx.DragContainer("#container2");

  hx.select("#resetOrder").on("click", function() {
    dragContainer.order(undefined);
  });
  Array.prototype.sumUnic = function(name, sumName) {
    var returnArr = [];
    var obj = this;
    for (var x = 0; x < obj.length; x++) {
      if (
        (function(source) {
          if (returnArr.length == 0) {
            return true;
          } else {
            for (var y = 0; y < returnArr.length; y++) {
              var isThere = [];
              if (returnArr[y][name] == source[name]) {
                if (parseInt(source[sumName]) > 0) {
                  returnArr[y][sumName] =
                    parseInt(returnArr[y][sumName]) + parseInt(source[sumName]);
                  return false;
                }
              } else if (parseInt(source[sumName]) > 0) {
                isThere.push(source);
              }
            }
            if (isThere.length > 0) returnArr.push(source);
            return false;
          }
        })(obj[x])
      ) {
        returnArr.push(obj[x]);
      }
    }
    return returnArr;
  };
  var data = $.ajax({
    async: false,
    url: "/data/new",
    type: "get",
    data: {
      Get: "data"
    },
    dataType: "JSON"
  }).responseJSON;

  var count_code = _.countBy(data[0], function(num) {
    return num.Code;
  });
  var count = [];
  var header = [];
  var keys = Object.keys(count_code);
  keys.forEach(function(key) {
    header.push(key);
    count.push(count_code[key]);
  });
  // console.log(count,header);

  Bonus = data[0].sumUnic("Employeeid", "Sub_total");
  // console.log(Bonus);
  new Chart(document.getElementById("bar-chart"), {
    type: "bar",
    data: {
      labels: Bonus.map(x => x.Employeeid),
      datasets: [
        {
          label: "sub_total",
          backgroundColor: [
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850",
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850"
          ],
          data: Bonus.map(x => x.Sub_total)
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Data Bonus For Each EmployeeID"
      },
      scales: {
        xAxes: [
          {
            barPercentage: 0.4
          }
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
  new Chart(document.getElementById("code"), {
    type: "bar",
    data: {
      labels: header,
      datasets: [
        {
          label: "Code",
          backgroundColor: [
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850",
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850"
          ],
          data: count
        }
      ]
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
        text: "Count Code"
      },
      scales: {
        xAxes: [
          {
            barPercentage: 0.9,
            categoryPercentage: 1,
            gridLines: {
              color: "rgba(0, 0, 0, 0)"
            }
          }
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)"
            }
          }
        ]
      }
    }
  });
  // console.log(Time);
  var End_Hours = 0;
  var End_Min = 0;
  var Start_Hours = 0;
  var Start_Min = 0;
  var array = [];
  var array_min = [];
  var array_end = [];
  var array_min_end = [];

  data[1].forEach(element => {
    array.push(parseInt(element.Start_time.slice(11, 13), 10));
    array_min.push(parseInt(element.Start_time.slice(14, 16), 10));

    array_end.push(parseInt(element.End_time.slice(11, 13), 10));
    array_min_end.push(parseInt(element.End_time.slice(14, 16), 10));

    End_Hours = End_Hours + parseInt(element.End_time.slice(11, 13), 10);
    End_Min = End_Min + parseInt(element.End_time.slice(14, 16), 10);
    Start_Hours = Start_Hours + parseInt(element.Start_time.slice(11, 13), 10);
    Start_Min = Start_Min + parseInt(element.Start_time.slice(14, 16), 10);
  });
  $("#start_time_max").text(
    "Max  " +
      _.max(array) +
      ":" +
      array_min[array.indexOf(_.max(array))] +
      " AM  " +
      "Min  " +
      _.min(array) +
      ":" +
      array_min[array.indexOf(_.min(array))] +
      " AM "
  );
  $("#start_time").text(
    Math.floor(Start_Hours / data[1].length) +
      ":" +
      Math.floor(Start_Min / data[1].length) +
      " AM "
  );

  $("#end_time_max").text(
    "Max  " +
      _.max(array_end) +
      ":" +
      array_min_end[array_end.indexOf(_.max(array_end))] +
      " PM  " +
      "Min  " +
      _.min(array_end) +
      ":" +
      array_min_end[array_end.indexOf(_.min(array_end))] +
      " PM "
  );
  $("#end_time").text(
    Math.floor(End_Hours / data[1].length) +
      ":" +
      Math.floor(End_Min / data[1].length) +
      " PM "
  );
  //ot-late
  var OT = [];
  var LATE = [];
  data[2].forEach(element => {
    if (element.Code === "OT") OT.push(element.Sub_total);
    else if (element.Code === "LATE") LATE.push(element.Sub_total);
  });
  // console.log(ot_late,OT,LATE);
  $("#ot").text(
    "OT-" +
      _.reduce(
        OT,
        function(memo, num) {
          return memo + num;
        },
        0
      ) +
      "   LATE-" +
      _.reduce(
        LATE,
        function(memo, num) {
          return memo + num;
        },
        0
      )
  );
  $("#ot_late_text").text("MaxOT:" + _.max(OT) + "  MinOT:" + _.min(OT));
  $("#ot_late_text2").text(
    "MaxLate:" + _.max(LATE) + "  MinLate:" + _.min(LATE)
  );
  //salary
  var new2 = data[3].map(data => {
    return new Date().getFullYear() - new Date(data.DOB).getFullYear();
  });
  var new3 = _.countBy(new2, function(num) {
    return num;
  });
  var count_new3 = [];
  var header_new3 = [];
  var keys_new3 = Object.keys(new3);
  keys_new3.forEach(function(key) {
    header_new3.push(key);
    count_new3.push(new3[key]);
  });
  new Chart(document.getElementById("age_chart"), {
    type: "pie",
    data: {
      labels: header_new3,
      datasets: [
        {
          label: "Age",
          backgroundColor: [
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850"
          ],
          data: count_new3
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Count Age"
      }
    }
  });
  new Chart(document.getElementById("salary"), {
    type: "bar",
    data: {
      labels: data[3].map(x => x._id),
      datasets: [
        {
          label: "Code",
          backgroundColor: [
            "#fb6340",
            "#fb6340",
            "#fb6340",
            "#fb6340",
            "#fb6340",
            "#fb6340",
            "#fb6340",
            "#fb6340",
            "#e8c3b9",
            "#c45850"
          ],
          data: data[3].map(x => x.s_Salary)
        }
      ]
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
        text: "Count Code"
      },
      scales: {
        xAxes: [
          {
            barPercentage: 0.9,
            categoryPercentage: 1,
            gridLines: {
              color: "rgba(0, 0, 0, 0)"
            }
          }
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)"
            }
          }
        ]
      }
    }
  });
  var count_company = _.countBy(data[4], function(num) {
    return num.Nuber_of_company_worked;
  });
  //   console.log(count_company);
  var count2 = [];
  var header2 = [];
  var keys2 = Object.keys(count_company);
  keys2.forEach(function(key) {
    header2.push(key);
    count2.push(count_company[key]);
  });
  new Chart(document.getElementById("lastcom"), {
    type: "horizontalBar",
    data: {
      labels: header2,
      datasets: [
        {
          label: "Lastcompany Work",
          backgroundColor: [
            "#fb6340",
            "#fb6340",
            "#fb6340",
            "#fb6340",
            "#fb6340",
            "#fb6340",
            "#fb6340",
            "#fb6340",
            "#e8c3b9",
            "#c45850"
          ],
          data: count2
        }
      ]
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
        text: "Last Company Work"
      },
      scales: {
        xAxes: [
          {
            barPercentage: 0.9,
            categoryPercentage: 1,
            gridLines: {
              color: "rgba(0, 0, 0, 0)"
            },
            ticks: {
              beginAtZero: true
            }
          }
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)"
            }
          }
        ]
      }
    }
  });
  var count_marital = _.countBy(data[5], function(num) {
    return num.Marital;
  });
  console.log(count_marital);
  $("#Marital").text(
    "Marital :" +
      ((count_marital.Y / (count_marital.Y + count_marital.N)) * 100).toFixed(
        2
      ) +
      "%"
  );
  $("#Marital_text").text(
    "Non-Marital :" +
      ((count_marital.N / (count_marital.Y + count_marital.N)) * 100).toFixed(
        2
      ) +
      "%"
  );
  var count_nation = _.countBy(data[6], function(num) {
    return num.Nationality;
  });
  var count_nation2 = [];
  var header_nation = [];
  var keys3 = Object.keys(count_nation);
  keys3.forEach(function(key) {
    header_nation.push(key);
    count_nation2.push(count_nation[key]);
  });

  new Chart(document.getElementById("nation"), {
    type: "horizontalBar",
    data: {
      labels: header_nation,
      datasets: [
        {
          label: "Nationality",
          backgroundColor: [
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850",
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850"
          ],
          data: count_nation2
        }
      ]
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
        text: "Nationality"
      },
      scales: {
        xAxes: [
          {
            barPercentage: 0.9,
            categoryPercentage: 1,
            gridLines: {
              color: "rgba(0, 0, 0, 0)"
            },
            ticks: {
              beginAtZero: true
            }
          }
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)"
            }
          }
        ]
      }
    }
  });
  var gpax = _.groupBy(data[7], "EM_id");
  var keys_gpax = Object.keys(gpax);
  var header_gpax = [];
  var count_gpax = [];
  keys_gpax.forEach(function(key) {
    header_gpax.push(key);
    count_gpax.push(gpax[key][gpax[key].length - 1].GPAX);
  });
  // console.log(count_gpax);
  // console.log(header_gpax);
  $("#GPAX").text(
    "AVG " +
      (
        _.reduce(
          count_gpax,
          function(memo, num) {
            return memo + num;
          },
          0
        ) / count_gpax.length
      ).toFixed(2)
  );
  $("#GPAX_text").text(
    "Max :" + _.max(count_gpax) + "  Min :" + _.min(count_gpax)
  );

  $("#absent").text("Absent : " + data[8].length + " Times This Month");

  var education = _.groupBy(data[9], "Degree");
  var keys_education = Object.keys(education);
  var header_education = [];
  var count_education = [];
  keys_education.forEach(function(key) {
    header_education.push(key);
    count_education.push(education[key].length);
  });
  console.log(education, header_education, count_education);

  new Chart(document.getElementById("degree"), {
    type: "horizontalBar",
    data: {
      labels: header_education,
      datasets: [
        {
          label: "Degree",
          backgroundColor: [
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850",
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850"
          ],
          data: count_education
        }
      ]
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
        text: "Nationality"
      },
      scales: {
        xAxes: [
          {
            barPercentage: 0.9,
            categoryPercentage: 1,
            gridLines: {
              color: "rgba(0, 0, 0, 0)"
            },
            ticks: {
              beginAtZero: true
            }
          }
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)"
            }
          }
        ]
      }
    }
  });

  var gender = _.countBy(data[10], function(num) {
    return num.gender;
  });
  console.log(gender);
  $("#gender").text(
    "Male :" + gender.M + "  Female :" + gender.F + "  None :" + gender.None
  );
});
