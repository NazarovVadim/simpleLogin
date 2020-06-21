const username = document.querySelector('.username'),
    registerUser = document.querySelector('.registerUser'),
    login = document.querySelector('.login'),
    list = document.querySelector('.list');

const usersData = JSON.parse(localStorage.getItem('usersData')) || [];
const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];


const render = () => {
    list.innerHTML = '';

    usersData.forEach(item => {
        const li = document.createElement('li'),
            reg = `${item.regDate}`,
            liStr = `Имя: ${item.firstname}, Фамилия ${item.lastname}, Дата регистрации: ${item.regDate}`;

        li.innerHTML = `${liStr}  <button class="delete">X</button>`;
        list.append(li);

        const removeBtn = li.querySelector('.delete');

        removeBtn.addEventListener('click', (e) => {
            usersData.forEach(item => {
                if(item.regDate === reg){
                    usersData.splice(usersData.indexOf(item), 1);
                }
            });

            localStorage.setItem('usersData', JSON.stringify(usersData));
            render();
        });
        localStorage.setItem('usersData', JSON.stringify(usersData));
    });
};

const addUser = () => {
    let name;
    do{
        name = prompt('Введите имя и фамилию через пробел');
    } while (name.split(' ').length-1 > 1);

    name = name.split(' ');
    let login = prompt('Введите ваш логин');
    let password = prompt('Введите ваш пароль');

    let now = new Date();
    let hrs = now.getHours(), mins = now.getMinutes(), secs = now.getSeconds();
    hrs = (hrs < 10) ? hrs = '0' + hrs : hrs; 
    mins = (mins < 10) ? mins = '0' + mins : mins; 
    secs = (secs < 10) ? secs = '0' + secs : secs; 

    let regDate = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} г., ${hrs}:${mins}:${secs}`;

    usersData.push({
        firstname: name[0].trim(),
        lastname: name[1].trim(),
        login: login,
        password: password,
        regDate : regDate
    });

    localStorage.setItem('usersData', JSON.stringify(usersData));
    render();
};

const Autorize = () => {
    let myLogin = prompt('Логин'),
        myPass = prompt('Пароль'),
        autorizeStatus = false;


    usersData.forEach(item => {
        if(item.login === myLogin && item.password === myPass){
            username.textContent = item.firstname;
            autorizeStatus = true;
        }
    });

    if (!autorizeStatus){
        alert('Неправильный логин или пароль!');
    }

};

render();

registerUser.addEventListener('click', addUser);
login.addEventListener('click', Autorize);