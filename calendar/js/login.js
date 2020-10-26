var login = true;
var user = '';

$(document).ready(function() {
    $('.modal-register-active').hide();
    getSession();
})

$('.login-switch-btn').click(function() {
    if(login) {
        $('.modal-login-active').hide();
        $('.modal-register-active').show();
    } else {
        $('.modal-login-active').show();
        $('.modal-register-active').hide();
    }
    login = !login;
})

$('#login-btn-sit').click(function() {
    showLoginModal()
});


$('#register-btn').click(function() {
    registerAjax();
})

$('#login-btn').click(function() {
    loginAjax();
})

$('#logout-btn').click(function() {
    logout();
})

function loginAjax(event) {
        var email = $('#login-email').val();
        var password = $('#login-password').val();

    const data = { 'email': email, 'password': password };

    fetch("php/login.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
        .then(res => res.json())
        .then(function(text) {
            if(text.success == true) {
                if(text.session != false) {
                    updatePageLoginBtn(true, text.session)
                    showLoginSuccess();
                } else {
                    updatePageLoginBtn(false, text.session)
                }
                destroyLoginModal();
            } else {
                console.log(text)
                showLoginError("ERROR: Email or Password is incorrect")
            }
        })
        .catch(err => console.error(err));
}

function registerAjax(event) {
    var email = $('#register-email').val();
    var password = $('#register-password').val();
    var passwordConfirm = $('#register-password-confirm').val();

const data = { 'email': email, 'password': password, 'passwordConfirm': passwordConfirm};

fetch("php/registerUser.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
    .then(res => res.json())
    .then(function(text) {
        if(text.success == true) {
            destroyLoginModal();
            showLoginSuccess();
        } else {
            if(text.incorrect_email_format) {
                showRegisterError("ERROR: Incorrect email format")
            } else if(text.email_exists) {
                showRegisterError("ERROR: Email already exists!")
            }
        }
    })
    .catch(err => console.error(err));
}

function getSession(event) {
    fetch("php/getSession.php", {
        method: 'POST'
    })
    .then(res => res.json())
    .then(function(text) {
        if(text.session != false) {
            user = text.session
            updatePageLoginBtn(true, text.session)
        } else {
            updatePageLoginBtn(false, text.session)
        }
    });
}

function showLoginModal() {
    $("#login-modal").modal('show');
    $('.modal-register-active').hide();
    hideLoginError();
    hideRegisterError();
}

function destroyLoginModal() {
    $("#login-modal").modal('hide');
}

function updatePageLoginBtn(status, session) {
    if(status) {
        $('#show-login-btn').hide();
        $('#user').html(`Welcome ${session}`)
        $('#user-welcome').show();
    } else {
        $('#user-welcome').hide();
        $('#show-login-btn').show();
    }
}

function logout() {
    fetch("php/logout.php", {
        method: 'POST'
    })
    .then(res => res.json())
    .then(function(text) {
        updatePageLoginBtn(false, null)
        showLogoutSuccess();
    });
}

function showLoginError(error) {
    $('#login-error').show();
    $('#login-error').html(error)
}

function showRegisterError(error) {
    $('#register-error').show();
    $('#register-error').html(error)
}

function hideLoginError() {
    $('#login-error').hide();
}

function hideRegisterError() {
    $('#register-error').hide();
}

function showLoginSuccess() {
    $('#login-success').show();
}

function showLogoutSuccess() {
    $('#logout-success').show();
}
