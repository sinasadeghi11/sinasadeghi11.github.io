// WEBSITE: https://codepen.io/fun/pen/vdWoBq

//const { start } = require("repl");

const colors = [
  "#E45A84",
  "#FFD478",
  "#BA53DE",
  "#393E46",
  "#497285",
  "#3AB1C8",
  "#8DC6FF",
  "#B2E672",
  "#B17179"
];

document.getElementById("startDate").innerHTML = localStorage.getItem("date");

const vm = new Vue({
  el: "#app",
  data: {
    habits: [
      /*{
        title: 'Bikesss',
        reps: 3,
        initial: 3,
        complete: 0,
        random: "#E45A84",
        finished: false
      }
      */
    ],
    newHabit: '',
    reps: '',
    initial: 0,
    complete: 0,
    colors: colors,
    finished: false
  },
  methods: {
    //RESET
    addHabit() {
      console.log(new Date().getTime())
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      now.setMilliseconds(null)
      document.getElementById('startDate').value = now.toISOString().slice(0, -2);
      //startDate = new Date().getTime();
      //document.getElementById("startDate").value = getFormattedDate( new Date());
      if (typeof(Storage) !== "undefined") {
        localStorage.setItem("date", now);
      }
      setCookie("date", now, 300)

    },
    removeHabit(habit) {
      this.habits.$remove(habit);
      console.log(this.habits);
    },
    completeReps(habit) {
      if (habit.reps > 0) {
        habit.reps -= 1;
        habit.complete += 1;
      }
      if (habit.reps === 0) {
        habit.finished = true;
      }
    }
  }
});



var intervalId = window.setInterval(function(){
  startDate = document.getElementById("startDate").value;
  startDate = new Date(startDate).getTime();
  //startDate = startDate.getFullYear()+'-'+(startDate.getMonth()+1)+'-'+startDate.getDate();
  today = new Date().getTime();
  //today = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  dif = today - startDate;
  y = 1000*60*60*24*7*4*12;
  m = 1000*60*60*24*7*4;
  w = 1000*60*60*24*7;
  d = 1000*60*60*24;
  h = 1000*60*60;
  m = 1000*60;
  s = 1000;

  years = Math.floor(dif/(1000*60*60*24*7*4*12));
  months = Math.floor(dif/(1000*60*60*24*7*4));
  weeks = Math.floor((dif/1000/60/60/24/7));
  days = Math.floor((dif/1000/60/60/24));
  hours = Math.floor((dif/1000/60/60));
  minutes = Math.floor((dif/1000/60));
  seconds = Math.floor((dif/1000));

  neuronText = "";
  //add neurons
  for (var i = 1; i < seconds+1; i++) {
    neuronText += ".";
    if (i%300==0) {
      neuronText += "<br />"
    }
  }
  neuronText += "<br />"
  //add connections
  for (var i = 1; i < minutes+1; i++) {
    neuronText += "o";
    if (i%100==0) {
      neuronText += "<br />"
    }
  }
  neuronText += "<br />"
  //add receptors
  for (var i = 1; i < hours+1; i++) {
    neuronText += "O";
    if (i%80==0) {
      neuronText += "<br />"
    }
  }
  //milliseconds = Math.floor(((today - startDate)*3.72) - seconds*1000);
  document.getElementById("soberTime").innerHTML = 
    numberWithCommas(years) + " Years <br />" + 
    numberWithCommas(months) + " Months <br />" + 
    Math.round((dif/1000/60/60/24)*100, 2) + "% Dopamine Storage <br /> " + 
    numberWithCommas(days) + " Clusters Generated <br />" + 
    numberWithCommas(hours) + " Receptors Restored <br />" + 
    numberWithCommas(minutes) + " Connections Formed <br /> " + 
    numberWithCommas(seconds) + " Neurons Created  <br />" +
    neuronText 
    //numberWithCommas(milliseconds) + " Healthy Cells"
;

badgesHTML = ""
if (hours > 0) {
  badgesHTML += "<div style='float:left'><h4>One Hour</h4><img style='padding: 5px;' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGP1Nvima4jGK1tJM3_Ni0iPceP1GKNX0Hfl2PzRBQHIC8bAfbs1GW0SoPEn4BK5NSE0g&usqp=CAU' width='164' height='164' ' ></div>"
}

if (hours > 5) {
  let badge = 'https://365psd.com/images/istock/previews/9616/96162507-medal-award-icon.jpg'
  badgesHTML += "<div style='float:left'><h4>Five Hours</h4><img style='padding: 5px;' src='data:image/png;base64,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' width='164' height='164' ></div>"
}

if (days > 0) {
  badge = 'https://365psd.com/images/istock/previews/9616/96162507-medal-award-icon.jpg'
  badgesHTML += "<div style='float:left'><h4>One Day</h4><img style='padding: 5px;' src='data:image/png;base64,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' width='164' height='164' ></div>"
}

if (days >= 3) {
  badge = 'https://365psd.com/images/istock/previews/9616/96162507-medal-award-icon.jpg'
  badgesHTML += "<div style='float:left'><h4>Three Day</h4><img style='padding: 5px;' src='data:image/png;base64,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' width='164' height='164' ></div>"
}

if (weeks > 0) {
  badge = 'https://365psd.com/images/istock/previews/9616/96162507-medal-award-icon.jpg'
  badgesHTML += "<div style='float:left'><h4>One Week</h4><img style='padding: 5px;' src='data:image/png;base64,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' width='164' height='164' ></div>"
}

if (weeks >= 2) {
  badge = 'https://365psd.com/images/istock/previews/9616/96162507-medal-award-icon.jpg'
  badgesHTML += "<div style='float:left'><h4>Two Weeks</h4><img style='padding: 5px;' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQdjzP7xhFcztOcFmWClbb1M_rKcL-BRajxrNgfLPWMJAUowx3oCIMuydvENKrbM8xyOc&usqp=CAU' width='164' height='164' ></div>"
}

if (months > 0) {
  badge = 'https://365psd.com/images/istock/previews/9616/96162507-medal-award-icon.jpg'
  badgesHTML += "<div style='float:left'><h4>One Month</h4><img style='padding: 5px;' src='https://cdn.dribbble.com/users/14383/screenshots/1394037/tree-test.gif' width='164' height='164' ></div>"
}

if (months >= 6) {
  badge = 'https://365psd.com/images/istock/previews/9616/96162507-medal-award-icon.jpg'
  badgesHTML += "<div style='float:left'><h4>Six Months</h4><img style='padding: 5px;' src='https://cdn.dribbble.com/users/14383/screenshots/1394037/tree-test.gif' width='164' height='164' ></div>"
}
if (years > 0) {
  badge = 'https://365psd.com/images/istock/previews/9616/96162507-medal-award-icon.jpg'
  badgesHTML += "<div style='float:left'><h4>One Year</h4><img style='padding: 5px;' src='https://cdn.dribbble.com/users/14383/screenshots/1394037/tree-test.gif' width='164' height='164' ></div>"
}

if (years >= 10) {
  badge = 'https://365psd.com/images/istock/previews/9616/96162507-medal-award-icon.jpg'
  badgesHTML += "<div style='float:left'><h4>Ten Years</h4><img style='padding: 5px;' src='https://cdn.dribbble.com/users/14383/screenshots/1394037/tree-test.gif' width='164' height='164' ></div>"
}

document.getElementById("badges").innerHTML = badgesHTML;

}, 1000);



function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Get formatted date YYYY-MM-DD
function getFormattedDate(date) {
  return date.getFullYear()
      + "-"
      + ("0" + (date.getMonth() + 1)).slice(-2)
      + "-"
      + ("0" + date.getDate()).slice(-2);
}

function today() {
  return new Date();
}

function setCookie(cname,cvalue,exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let user = getCookie("username");
  let date = getCookie("date");
  date = new Date(date);
  if (user != "") {
    alert("Welcome back, " + user);
    document.getElementById("startDate").value = date.toISOString().slice(0, -2);
  } else {
     user = prompt("Please enter your name:","");
     if (user != "" && user != null) {
       setCookie("username", user, 30);
     }
  }
}

function save(date) {
  startDate = document.getElementById("startDate").value;
  startDate = new Date(startDate.toISOString().slice(0, -2)).getTime();
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("date", startDate);
  }
  setCookie("date", startDate, 300)
}