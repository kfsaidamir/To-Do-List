document.addEventListener('DOMContentLoaded', function () {
  const registrationForm = document.querySelector('.registrationForm');
  const rainSound = document.getElementById('rainSound');

  // Воспроизведение звука дождя при загрузке страницы
  rainSound.play();

  document.querySelector('.username').value = '';
  document.querySelector('.password').value = '';

  registrationForm.addEventListener('submit', function (event) {
    event.preventDefault(); 

    const username = document.querySelector('.username').value;
    const password = document.querySelector('.password').value;

    if (username && password) {
      if (localStorage.getItem('username') && localStorage.getItem('password')) {
        if (username === localStorage.getItem('username') && password === localStorage.getItem('password')) {
          showMessage('Login successful! Redirecting to index2.html.');
          document.querySelector('.main').style.opacity = 0;
          setTimeout(function () {
            window.location.href = 'index2.html';
          }, 500);
        } else {
          showMessage('Incorrect username or password.');
        }
      } else {
        showMessage('No user found. Please register.');
      }
    } else {
      showMessage('Please fill in all fields.');
    }
  });

  function showMessage(message) {
    const messageElement = document.querySelector('.message');
    messageElement.textContent = message;
  }
});

// Регистрация новой учетной записи
function registerUser(username, password) {
  // Проверяем, есть ли уже пользователь с таким именем
  if (!localStorage.getItem(username)) {
    // Сохраняем учетные данные
    localStorage.setItem(username, password);
    return true; // Регистрация успешна
  } else {
    return false; // Пользователь с таким именем уже существует
  }
}

// Проверка учетных данных при входе
function loginUser(username, password) {
  const savedPassword = localStorage.getItem(username);
  if (savedPassword === password) {
    return true; // Вход успешен
  } else {
    return false; // Неправильное имя пользователя или пароль
  }
}

// Обработчик формы регистрации
registrationForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const username = document.querySelector('.username').value;
  const password = document.querySelector('.password').value;

  if (username && password) {
    if (registerUser(username, password)) {
      showMessage('Registration successful! Please login.');
    } else {
      showMessage('Username already exists. Please choose another one.');
    }
  } else {
    showMessage('Please fill in all fields.');
  }
});

// Обработчик формы входа
loginForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const username = document.querySelector('.username').value;
  const password = document.querySelector('.password').value;

  if (username && password) {
    if (loginUser(username, password)) {
      showMessage('Login successful! Redirecting to index2.html.');
      // Дополнительные действия после успешного входа
    } else {
      showMessage('Incorrect username or password.');
    }
  } else {
    showMessage('Please fill in all fields.');
  }
});
