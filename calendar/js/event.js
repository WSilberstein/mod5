$('#create-event-btn').click(function() {
    console.log("click")
    hideEventError();
    $('#create-event-modal').modal('show')

})

$('#delete-event-btn').click(function() {
    var id = $('#delete-event-id').val();
    
    const data = {'id': id}

    fetch("php/deleteEvent.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
    .then(res => res.json())
    .then(function(text) {
        if(text.success) {
            getUserEvents();
            hideEditEventModal();
        }
    })
    .catch(err => console.error(err));
})

$('#create-event-btn-final').click(function() {
    console.log("submit");
    var title = document.getElementById('create-event-title').value;
    var description = document.getElementById('create-event-description').value;
    var date = document.getElementById('create-event-date').value;
    var color = document.getElementById('create-event-color').value;
    var shareUser = document.getElementById("create-event-share-user").value;

    const data = {'title': title, 'description': description, 'date': date, 'color': color, 'shareUser': shareUser}

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
            getUserEvents();
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
    var shareUser = document.getElementById("edit-event-share-user").value;

    editEvent(id, title, description, date, color, shareUser);
})

function editEvent(id, title, description, date, color, shareUser) {
    const data = {'id': id, 'title': title, 'description': description, 'date': date, 'color': color, 'shareUser': shareUser}

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

            if($('#edit-event-modal').is(':visible')) {
                updateCalendar();
                hideEditEventModal();
            }


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