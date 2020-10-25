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
    console.log(title)
    console.log(description)
    console.log(date)
    console.log(color)

    const data = {'title': title, 'description': description, 'date': date, 'color': color}

    fetch("php/createEvent.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
    .then(res => res.json())
    .then(function(text) {
        console.log(text.nosession)
        if(text.nosession) {
            showEventError("ERROR: You must be logged in to do this")
        } 
    })
    .catch(err => console.error(err));
})

function showEventError(error) {
    $('#create-event-error').text(error)
    $('#create-event-error').show();
}

function hideEventError() {
    $('#create-event-error').hide();
}