const body = document.body;
const urlParam = window.location.search.substring(1);
const login = (urlParam.split(('='))[1]);
let url = 'https://api.github.com/users/voytov93';
if (login) {
  url = `https://api.github.com/users/${login}`;
}

else {url = 'https://api.github.com/users/voytov93}';
}

fetch(url)
  .then(response => {
    if (response.status != 404) {
      return response.json();
    } else {
      let err = new Error(response.statusText + ' ' + response.status);
      err.response = response;
      throw err;
    }
  })

  .then(json => {
    let ava = new Image();
    ava.src = json.avatar_url;
    body.append(ava);

    let name = document.createElement('p');
    name.classList.add('link');
    name.addEventListener("click", () => window.location = json.html_url);
    if (json.name != null) {
      name.innerHTML = json.name;
    } else {
      name.innerHTML = 'Информация о пользователe недоступна';
    }
    body.append(name);

    let bio = document.createElement('p');
    if (json.bio != null) {
      bio.innerHTML = json.bio;
    } else {
      bio.innerHTML = 'Пользователь не заполнил данное поле';
    }
    body.append(bio);
  })

  .catch(error => document.body.innerHTML = `Пользователь не найден.<br> ${error}`);
