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
    calendar.innerHTML = '';
    fetch("php/getEvents.php", {
        method: 'POST'
    })
    .then(res => res.json())
    .then(function(text) {
        if(!text.nosession) {
            var allUserEvents = [];
            text.forEach(function(event) {
                arr.push(event);
                allUserEvents.push(event);
            })
            new Month(currentYear, currentMonth, allUserEvents).draw();
        } else {
            new Month(currentYear, currentMonth, null).draw();
        }

        var e = $('.event').draggable({
            containment: 'document',
            zIndex: 100,
            helper: 'clone',
            start: function(event, ui) {
                currentEvent = $(this);
            }
        });
        
        $('.card-day').droppable({
            over: function(event, ui) {
                $(this).css('background-color', '#CCCCCC')
            },

            out: function(event, ui) {
                $(this).css('background-color', 'white')
            },

            drop: function(event, ui) {
                $(this).css('background-color', 'white')
                $(this).append(currentEvent);
                var number = parseInt($(this).children()[0].childNodes[0].textContent);
                var newDate = String($(currentEvent).children()[3].value).replace(/\b-\d+ \b/g, '-' + number + ' ');
                var title = $(currentEvent).children()[0].innerText;
                var id = $(currentEvent).children()[2].value;
                var desc = $(currentEvent).children()[4].value;
                var color = $(currentEvent).css('background-color');

                editEvent(id, title, desc, newDate, color, "asdf@asdf.com");
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
                    document.getElementById('delete-event-id').value = id;

                    //May throw error later
                    document.getElementById('edit-event-color').value = color;
                    $("#edit-event-modal").modal('show');

                    
                })


               
            }
        })
        node.appendChild(eventDiv)
    }

    this.draw = function(node) {
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
        var row = document.createElement("div");
        row.classList.add('row');
        if(new Date(this.days[0].date).getDay() != 0) {
            for(var i = 0; i < new Date(this.days[0].date).getDay(); i++) {
                row.appendChild(this.days[0].drawPadding(row))
            }
        }
        
        this.days.forEach(function(day) {
            row.appendChild(day.draw(row))
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
        var daysReverse = [];
        var weekDays = [];
        var counter = 1;
        while (date.getMonth() === month) {
          daysReverse.push(new Date(date));
          date.setDate(date.getDate() - 1);
          counter++;
        }

        for(var i = daysReverse.length - 1; i >= 0; i--) {
            this.days.push(daysReverse[i])
            weekDays.push(new Day(new Date(daysReverse[i]), this.events));
            if(new Date(daysReverse[i]).getDay() == 6) {
                this.weeks.push(weekDays);
                weekDays = [];
            }
        }


        this.weeks.push(weekDays);
    }

    this.getWeek = function(week) {

    }

    this.nextMonth = function() {

    }

    this.prevMonth = function() {

    }

    this.draw = function() {
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