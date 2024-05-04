document.addEventListener('DOMContentLoaded', function () {
  const registrationForm = document.querySelector('.registrationForm');
  const loginButton = document.querySelector('.loginButton'); 

  const rainSound = document.getElementById('rainSound');
  rainSound.play();

  document.querySelector('.username').value = '';
  document.querySelector('.password').value = '';

  registrationForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.querySelector('.username').value;
    const password = document.querySelector('.password').value;

    if (username && password) {
      let users = localStorage.getItem('users');
      users = users ? JSON.parse(users) : {};

      if (users[username]) {
        showMessage('Username already exists. Please choose another one.');
      } else {
        // Запрашиваем подтверждение регистрации
        const confirmRegistration = confirm('Are you sure you want to register with the provided credentials?');
        if (confirmRegistration) {
          users[username] = password;
          localStorage.setItem('users', JSON.stringify(users));
          showMessage('Registration successful!');
          setTimeout(function () {
            window.location.href = 'index2.html';
          }, 3000);
        } else {
          showMessage('Registration cancelled. Please review your information.');
        }
      }
    } else {
      showMessage('Please fill in all fields.');
    }
  });

  loginButton.addEventListener('click', function () { 
    const username = document.querySelector('.username').value;
    const password = document.querySelector('.password').value;

    // Получаем данные пользователей из Local Storage
    let users = localStorage.getItem('users');
    users = users ? JSON.parse(users) : {};

    if (users[username] && users[username] === password) { 
      showMessage('Login successful!');
      setTimeout(function () {
        window.location.href = 'index2.html';
      }, 2000);
    } else {
      showMessage('Incorrect username or password. Please try again.');
    }
  });

  function showMessage(message) {
    const messageElement = document.querySelector('.message');
    messageElement.textContent = message;
  }
});
