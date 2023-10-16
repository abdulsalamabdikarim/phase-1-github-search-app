document.addEventListener("DOMContentLoaded", populatePage);

function populatePage(){
    const form = document.querySelector('#github-form');
    const search = document.querySelector('#search');
    form.addEventListener('submit',(e) => {
        e.preventDefault();
        console.log(`${search.value}`);
        fetch(`https://api.github.com/search/users?q=${search.value}`)
        .then(response => response.json())
        .then (data => {
            const usersArray = data.items;
            console.log(usersArray);
            const userList = document.querySelector('#user-list');
            userList.innerHTML = '';
            const repoUl = document.querySelector('#repos-list');
            repoUl.innerHTML = '';
            //search.value = '';
            usersArray.forEach(element => {
                const list = document.createElement('li');
                list.innerHTML = `<img src = \'${element.avatar_url}\' width = \'100px\' height = \'100px\' /> Username: ${element.login} =><a href = ${element.html_url}> Github Profile </a>`;
                userList.appendChild(list);
                list.addEventListener('click', repoSearch);
            });
            
        });
        })
}

function repoSearch(){
    const search = document.querySelector('#search');
    fetch(`https://api.github.com/users/${search.value}/repos`)
    .then(response => response.json())
    .then (data => {
        //console.log(data[1].name);
        const repoUl = document.querySelector('#repos-list');
        repoUl.innerHTML = '';
        data.forEach(element => {
            const repoList = document.createElement('li');
            repoList.textContent = element.name;
            repoUl.appendChild(repoList);
        })
    })
}