async function auth(form) {
  let cred = {
    email: form.email.value,
    password: form.password.value,
  };

  let req = 'login';
  if (!$('#signin').is(':checked')) {
    req = 'register';
    cred.username = form.username.value;
  }
  toastr.options.positionClass = 'toast-top-right';
  await fetch(`http://localhost:8080/auth/${req}`, {
    method: 'POST',
    body: JSON.stringify(cred),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res['token'] === undefined) {
        if (res[0] === undefined) {
          toastr.error(res['message']);
          return false;
        }
        toastr.error(res[0]);
        return false;
      }
      Cookies.set('token', res['token']);
      window.location.href = '/';
    });
}

document.addEventListener('DOMContentLoaded', logInOut);
function logInOut() {
  if (Cookies.get('token') === undefined) {
    $('#sign-in').css('display', 'block');
    $('#sign-out').css('display', 'none');
  } else {
    $('#sign-in').css('display', 'none');
  }
}

function logout() {
  Cookies.remove('token');
  location.reload();
}
