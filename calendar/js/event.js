$('#create-event-btn').click(function() {
    console.log("click")
    hideEventError();
    $('#create-event-modal').modal('show')

})

$('#create-event-btn-final').click(function() {
    console.log("submit");
    var title = document.getElementById('create-event-title').value;
    var description = document.getElementById('create-event-description').value;
    var date = document.getElementById('create-event-date').value;
    var color = document.getElementById('create-event-color').value;

    const data = {'title': title, 'description': description, 'date': date, 'color': color}

    fetch("php/createEvent.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
    .then(res => res.json())
    .then(function(text) {
        if(text.nosession) {
            showEventError("ERROR: You must be logged in to do this")
        } else if(text.date == false) {
            showEventError("ERROR: Must specify date")
        } else if(text.success) {
            hideEventModal();
        }
    })
    .catch(err => console.error(err));
})

$('#edit-event-btn-final').click(function() {
    var id = document.getElementById('edit-event-id').value;
    var title = document.getElementById('edit-event-title').value;
    var description = document.getElementById('edit-event-description').value;
    var date = document.getElementById('edit-event-date').value;
    var color = document.getElementById('edit-event-color').value;

    editEvent(id, title, description, date, color);
})

function editEvent(id, title, description, date, color) {
    const data = {'id': id, 'title': title, 'description': description, 'date': date, 'color': color}

    fetch("php/editEvent.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
    .then(res => res.json())
    .then(function(text) {
        if(text.nosession) {
            showEventError("ERROR: You must be logged in to do this")
        } else if(text.date == false) {
            showEventError("ERROR: Must specify date")
        } else if(text.success) {
            hideEditEventModal();
            updateCalendar();
        }
    })
    .catch(err => console.error(err));
}

function showEventError(error) {
    $('#create-event-error').text(error)
    $('#create-event-error').show();
}

function hideEventError() {
    $('#create-event-error').hide();
}

function hideEditEventModal() {
    $('#edit-event-modal').modal('hide');
}

function hideEventModal() {
    $('#create-event-modal').modal('hide')
}