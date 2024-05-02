

const form = document.querySelector('form');
const input = document.querySelector('input');
const list = document.querySelector('.list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

const addTodo = () => {
    list.innerHTML = '';
    todos.forEach((todo, index) => {
        list.innerHTML += `
            <p>${index}  ${todo}</p>
        `;
    });
};

addTodo();


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = input.value.trim();

    const regex = /\S+\s*/g;
    const wordCount = (value.match(regex) || []).length;

    if (value !== '' && wordCount >= 4) {
        todos.push(value);
        localStorage.setItem('todos', JSON.stringify(todos));
        input.value = '';
        addTodo();
        const newTodoElement = list.lastElementChild;
        newTodoElement.scrollIntoView({ behavior: 'smooth' });
    } else if (value === '') {
        alert('Write something');
    } else {
        input.style.borderColor = 'red';
    }
});


input.addEventListener('input', () => {
    input.style.borderColor = '';
});



list.addEventListener('click', (e) => {
    if (e.target.tagName === 'P') {
        const targetElement = e.target;

        targetElement.style.opacity = 0;
        targetElement.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            targetElement.remove();

            const index = Array.from(list.children).indexOf(targetElement);
            todos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
        }, 300);
    }
});
