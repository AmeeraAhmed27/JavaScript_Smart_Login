var SignUpUsername = document.getElementById('SignUpUsername')
var SignUpEmail = document.getElementById('SignUpEmail')
var SignUpPassword = document.getElementById('SignUpPassword')


var loginEmail = document.getElementById('loginEmail')
var loginPassword = document.getElementById('loginPassword')


var signUpArray = []
if (localStorage.getItem('SystemUsers') == null) {
    signUpArray = []
} else {
    signUpArray = JSON.parse(localStorage.getItem('SystemUsers'))
}


var pathparts = location.pathname.split('/');
var baseURL = ''
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]
}


function signUp() {
    if (isEmpty() == false) {
        document.getElementById('SignIn-msg').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }

    var signUp = {
        name: SignUpUsername.value,
        email: SignUpEmail.value,
        password: SignUpPassword.value,
    }
    if (signUpArray.length == 0) {
        signUpArray.push(signUp)
        localStorage.setItem('SystemUsers', JSON.stringify(signUpArray))
        document.getElementById('SignIn-msg').innerHTML = '<span class="text-success m-3">Success</span>'
        return true
    }
    if (isEmailExist() == false) {
        document.getElementById('SignIn-msg').innerHTML = '<span class="text-danger m-3">email already exists</span>'

    } else {
        signUpArray.push(signUp)
        localStorage.setItem('SystemUsers', JSON.stringify(signUpArray))
        document.getElementById('SignIn-msg').innerHTML = '<span class="text-success m-3">Success</span>'

    }


}


function login() {
    if (isLoginEmpty() == false) {
        document.getElementById('SignUp-msg').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var password = loginPassword.value
    var email = loginEmail.value
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()) {
            sessionStorage.setItem('SessionUsername', signUpArray[i].name)
            if (baseURL == '/') {
                location.replace('https://' + location.hostname + '/home.html')

            } else {
                location.replace(baseURL + '/home.html')

            }
        } else {
            document.getElementById('SignUp-msg').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }

}


function logout() {
    sessionStorage.removeItem('SessionUsername')
    location.replace(baseURL + '/index.html')
}


function isEmpty() {

    if (SignUpUsername.value == "" || SignUpEmail.value == "" || SignUpPassword.value == "") {
        return false
    } else {
        return true
    }
}


function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == SignUpEmail.value.toLowerCase()) {
            return false
        }
    }
}

function isLoginEmpty() {

    if (loginPassword.value == "" || loginEmail.value == "") {
        return false
    } else {
        return true
    }
}

var username = sessionStorage.getItem('SessionUsername')
if (username) {
    document.getElementById('logedinusername').innerHTML = "Welcome " + username
}