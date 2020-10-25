var dayNames = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var currentMonth = new Date(Date.now()).getMonth();
var currentYear = new Date(Date.now()).getFullYear();
const calendar = document.getElementById('calendar-days');

document.addEventListener('DOMContentLoaded', function() {
    new Month(currentYear, currentMonth).draw();
})

 $('#change_month_right').click(function() {
     if(currentMonth == 11) {
        currentMonth = 0;
        currentYear++;
     } else {
        currentMonth++;
     }
    // console.log(currentMonth)
    // console.log(currentYear)
     calendar.innerHTML = '';
     var month = new Month(currentYear, currentMonth);
     month.draw();
 })

 $('#change_month_left').click(function() {
    if(currentMonth == 0) {
       currentMonth = 11;
       currentYear--;
    } else {
       currentMonth--;
    }
    //console.log(currentMonth)
   // console.log(currentYear)
    calendar.innerHTML = '';
    var month = new Month(currentYear, currentMonth);
    month.draw();
})

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

    this.drawPadding = function(node) {
        var container = document.createElement("div");
        var numberContainer = document.createElement("div");
        container.classList.add("card-day-padding");
        container.classList.add("col-sm-1");
        numberContainer.classList.add("day-number");
        var dayNumber = document.createElement("span");
        numberContainer.appendChild(dayNumber);

        //Add events to day

        container.appendChild(numberContainer);
       return container
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
      //  console.log(this.days)
        //console.log((this.days[0].date))
        var row = document.createElement("div");
        row.classList.add('row');
        if(new Date(this.days[0].date).getDay() != 0) {
            for(var i = 0; i < new Date(this.days[0].date).getDay(); i++) {
                //console.log("Create padding")
                row.appendChild(this.days[0].drawPadding(row))
            }
            //console.log("DOES NOT START ON SUNDAY")
        }
        
        this.days.forEach(function(day) {
            row.appendChild(day.draw(row))
           // console.log(day.draw(row))
        })
        calendar.appendChild(row);
    }
}


function Month(year, month) {
    this.year = year;
    this.month = month
    this.weeks = [];
    this.days = [];

    this.initialize = function() {

        var date = new Date(year, month + 1, 0);
        //console.log(date);
        var daysReverse = [];
        var weekDays = [];
        var counter = 1;
        while (date.getMonth() === month) {
          daysReverse.push(new Date(date));
          //this.days.push(new Day(new Date(date)));
         /* weekDays.push(new Day(new Date(date)));
          if(counter != 1 && counter % 7 == 0) {
            this.weeks.push(weekDays);
            weekDays = [];
          }*/
          date.setDate(date.getDate() - 1);
          counter++;
        }

        for(var i = daysReverse.length - 1; i >= 0; i--) {
           // console.log(daysReverse[i])
            this.days.push(daysReverse[i])
            weekDays.push(new Day(new Date(daysReverse[i])));
            if(new Date(daysReverse[i]).getDay() == 6) {
                //console.log(weekDays)
                this.weeks.push(weekDays);
                weekDays = [];
            }
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
        this.initialize();

        var month = document.getElementById('month');
        month.innerText = monthNames[this.month] + " " + this.year;

        

        this.weeks.forEach(function(week) {
            if(week.length > 0) {
                var weekObj = new Week(week);
                weekObj.draw();
            }
        })
    }

}