var dayNames = ["Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday", "Sunday"];
var currentDate = Date.now();
const calendar = document.getElementById('calendar-days');

function Day(date, events) {
    this.date = date;
    this.events = [];
    if(events != null) {
        this.events = events;
    }

    this.nextDay = function() {
        //Increment the day by 1
        //Fetch events corresponding to the day
        //Return a new day given prev inputs
    }

    this.prevDay = function() {
        //Decrement the day by 1
        //Fetch events corresponding to the day
        //Return a new day given prev inputs
    }

    this.draw = function(node) {
      //  console.log("Drawing day: " + new Date(date).toDateString())
        var container = document.createElement("div");
        var numberContainer = document.createElement("div");
        container.classList.add("card-day");
        container.classList.add("col-sm-1");
        numberContainer.classList.add("day-number");
        var dayNumber = document.createElement("span");
        dayNumber.innerText = new Date(date).getDate();
        numberContainer.appendChild(dayNumber);

        //Add events to day

        container.appendChild(numberContainer);
       return container
    }
}




function Week(days) {
    this.days = days;

    this.getDay = function(day){
        return days[day];
    }

    this.nextWeek = function() {

    }

    this.prevWeek = function() {

    }

    this.draw = function(days) {
        var row = document.createElement("div");
        row.classList.add('row');
        this.days.forEach(function(day) {
            row.appendChild(day.draw(row))
           // console.log(day.draw(row))
        })
        calendar.appendChild(row);
    }
}


var month = new Month(new Date().getFullYear(), new Date().getMonth())
month.initialize();
month.draw();

function Month(year, month) {
    this.year = year;
    this.month = month
    this.weeks = [];
    this.days = [];

    this.initialize = function() {

        var date = new Date(year, month, 1);
        var days = [];
        var weekDays = [];
        var counter = 1;
        while (date.getMonth() === month) {
          days.push(new Date(date));
          this.days.push(new Day(new Date(date)));
          weekDays.push(new Day(new Date(date)));
          if(counter != 1 && counter % 7 == 0) {
            this.weeks.push(weekDays);
            weekDays = [];
          }
          date.setDate(date.getDate() + 1);
          counter++;
        }
        this.weeks.push(weekDays);
       // console.log(this.weeks);
    }

    this.getWeek = function(week) {

    }

    this.nextMonth = function() {

    }

    this.prevMonth = function() {

    }

    this.draw = function() {
        console.log("Drawing Calendar")

        var month = document.getElementById('month');
        if(this.month == 0) {
            month.innerText = "January";
        } else if(this.month == 1) {
            month.innerText = "February";
        } else if(this.month == 2) {
            month.innerText = "March";
        } else if(this.month == 3) {
            month.innerText = "April";
        } else if(this.month == 4) {
            month.innerText = "May";
        } else if(this.month == 5) {
            month.innerText = "June";
        } else if(this.month == 6) {
            month.innerText = "July";
        } else if(this.month == 7) {
            month.innerText = "August";
        } else if(this.month == 8) {
            month.innerText = "September";
        } else if(this.month == 9) {
            month.innerText = "October";
        } else if(this.month == 10) {
            month.innerText = "November";
        } else if(this.month == 11) {
            month.innerText = "December";
        }

        var daysOfWeek = document.getElementsByClassName('struct-day');
        var firstDay = new Date(this.days[0].date).getDay();
       // console.log(daysOfWeek[5]);
        for(var i = 0; i < daysOfWeek.length; i++) {
            var text = document.createElement("p")
            if(firstDay == 0) {
                text.innerText = "Sunday";
            } else if(firstDay == 1) {
                text.innerText = "Monday";
            } else if(firstDay == 2) {
                text.innerText = "Tuesday";
            } else if(firstDay == 3) {
                text.innerText = "Wednsday";
            } else if(firstDay == 4) {
                text.innerText = "Thursday";
            } else if(firstDay == 5) {
                text.innerText = "Friday";
            } else if(firstDay == 6) {
                text.innerText = "Saturday";
            }
            daysOfWeek[i].appendChild(text);
            console.log(daysOfWeek[i])

            firstDay++;
            if(firstDay > 6) {
                firstDay = 0;
            }
        }
        

        this.weeks.forEach(function(week) {
            var weekObj = new Week(week);
            //console.log(weekObj)
            weekObj.draw();
           
        })
    }

}