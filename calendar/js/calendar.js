var dayNames = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var currentMonth = new Date(Date.now()).getMonth();
var currentYear = new Date(Date.now()).getFullYear();
const calendar = document.getElementById('calendar-days');
var currentEvent = '';


document.addEventListener('DOMContentLoaded', function() {
    getUserEvents()
})

function getUserEvents() {
    var arr = []
    fetch("php/getEvents.php", {
        method: 'POST'
    })
    .then(res => res.json())
    .then(function(text) {
        if(!text.nosession) {
            var allUserEvents = [];
            //console.log(text)
            text.forEach(function(event) {
                arr.push(event);
                allUserEvents.push(event);
               // console.log(allUserEvents)
            })
            new Month(currentYear, currentMonth, allUserEvents).draw();
            //console.log(allUserEvents)
        } else {
            new Month(currentYear, currentMonth, null).draw();
        }


        var e = $('.event').draggable({
            containment: 'document',
            zIndex: 100,
            helper: 'clone',
            start: function(event, ui) {
                currentEvent = $(this);
                console.log("Dragging");
            },

            stop: function(event, ui) {
                //$(this).detach();
             //   $('#calendar').append($(this));
            }
        });
        
        $('.card-day').droppable({
            over: function(event, ui) {
                $(this).css('background-color', '#CCCCCC')
                console.log(currentEvent)
            },

            out: function(event, ui) {
                $(this).css('background-color', 'white')
            },

            drop: function(event, ui) {
                console.log(currentEvent)
                $(this).css('background-color', 'white')
                $(this).append(currentEvent);
            }
        });
    });


}

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
     getUserEvents()
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
    getUserEvents()
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

    this.drawEvent = function(node) {
        var eventDiv = document.createElement('div');
        eventDiv.classList.add("events");
        var date = this.date;
        this.events.forEach(function(event) {

            if(new Date(date).getYear() == new Date(event.date).getYear() && new Date(date).getMonth() == new Date(event.date).getMonth() && new Date(date).getDate() == new Date(event.date).getDate()) {
                var eventDate = event.date;
                var eventTitle = event.title;
                var color = event.color;
                var id = event.id;
                var description = event.description;
               // console.log("Match")
                var event = document.createElement('div');
                var title = document.createElement("p");
                var time = document.createElement("p");
                var idInput = document.createElement("input");
                var fullDate = document.createElement("input");
                var desc = document.createElement("input")

                title.classList.add("no-margin");
                time.classList.add("no-margin");
                event.classList.add("centered");
                event.classList.add("event");

                event.style.cssText = "background-color: " + color;

                title.innerText = eventTitle;
                time.innerText = eventDate.substr(11, 5);
                idInput.value = id;
                fullDate.value = eventDate;
                desc.value = description;

                idInput.style.cssText = "display: none";
                fullDate.style.cssText = "display: none";
                desc.style.cssText = "display: none";

                event.appendChild(title);
                event.appendChild(time);
                event.appendChild(idInput);
                event.appendChild(fullDate);
                event.appendChild(desc)


                eventDiv.appendChild(event);

                event.addEventListener('click', function() {
                    var title = this.childNodes[0].innerHTML;
                    var id = this.childNodes[2].value;
                    var date = this.childNodes[3].value;
                    var desc = this.childNodes[4].value;
                    var descReplace = date.replace(/ /g, 'T')
                    // MAY THROW ERROR LATER WITH COLOR
                    var color = $(this).css('background-color');
                    document.getElementById('edit-event-title').value = title
                    document.getElementById('edit-event-description').innerText = desc
                    document.getElementById('edit-event-date').value = descReplace;
                    document.getElementById('edit-event-id').value = id;

                    //May throw error later
                    document.getElementById('edit-event-color').value = color;
                    $("#edit-event-modal").modal('show');

                    
                })


               
            }
        })
        node.appendChild(eventDiv)
    }

    this.draw = function(node) {
       // console.log(this.date);
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
        this.drawEvent(container);
       return container
    }
}




function Week(days, events) {
    this.days = days;
    this.events = events;

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


function Month(year, month, events) {
    this.year = year;
    this.month = month
    this.weeks = [];
    this.days = [];
    this.events = events

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
            weekDays.push(new Day(new Date(daysReverse[i]), this.events));
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