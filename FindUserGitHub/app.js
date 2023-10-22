//const APIURL = "https://api.github.com/users/"; file:///C:/Users/PC/Documents/users.json
const APIURL = "https://api.github.com/users/";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
async function getUser(username) {
  try {
    const { data } = await axios(APIURL + username);
    createUserCard(data);
    getRepos(username);
  } catch (err) {
    if (err.response.status == 404) {
      createErrorCard("No hay usuarios que cumplan con el criterio de búsqueda");
    }
  }
}
async function getRepos(username) {
  try {
    const { data } = await axios(APIURL + username + "/repos?sort=created");

  } catch (err) {
    createErrorCard("Ocurrio un problema al consultar los repositorios");
  }
}
function createUserCard(user) {
  const userLogin = user.login || "Usuario Desconocido";  
  const useravatar = user.avatar_url; 
  const userTwitter = user.twitter_username || "Sin Twitter";
  const userCreate = user.created_at || "Fecha Desconocida";
  const userID = user.name || user.login;
  const lugar = user.location || "Ubicación Desconocida";
  const userBio = user.bio = `<div class="image-with-text">
  <p>${lugar}</p>
</div>
<div class="image-with-text-t">
  <p class="link">${userTwitter}</p>
</div>
<div class="image-with-text-link">
  <a href="${useravatar}">${useravatar}</a>
</div>
<div class="container-cara">
    <div class="column">
      <div class="item ">REPOS</div>
      <div class="item reposi"></div>
      <div class="item">${user.public_repos}</div>
    </div>
    <div class="column">
      <div class="item">FOLLOWERS</div>
      <div class="item ses"></div>
      <div class="item">${user.followers || 0}</div>
    </div>
    <div class="column">
      <div class="item">FOLLOWING</div>
      <div class="item foty"></div>
      <div class="item">${user.following || 0}</div>
    </div>` 
  ;

  const cardHTML = `
<div class="card left-side">
  <div class="vertical-container">
    <p class="user-login vertical-item">${userLogin}</p>
    <img src="${useravatar}" alt="${user.name}" class="avatar vertical-item">
    <h2 class="user-loginDate vertical-item">${userCreate}</h2>
  </div>
  <div class="user-info">
    <h3 class="titulo">${userID}</h3>
    ${userBio}
    <div id="repos"></div>
  </div>
</div>
<div class="image-with-text-t">
  <p class="link">${userTwitter}</p>
</div>
<div class="image-with-text-link">
  <a href="${useravatar}">${useravatar}</a>
</div>
<div class="container-cara">
    <div class="column">
      <div class="item ">REPOS</div>
      <div class="item reposi"></div>
      <div class="item">${user.public_repos}</div>
    </div>
    <div class="column">
      <div class="item">FOLLOWERS</div>
      <div class="item ses"></div>
      <div class="item">${user.followers || 0}</div>
    </div>
    <div class="column">
      <div class="item">FOLLOWING</div>
      <div class="item foty"></div>
      <div class="item">${user.following || 0}</div>
    </div>`;
  
  main.innerHTML = cardHTML;
}

function createErrorCard(msg) {
  const cardHTML = `
<div class="card">
<h1>${msg}</h1>
</div>
`;
  main.innerHTML = cardHTML;
}

form.addEventListener("input", (e) => {
  e.preventDefault();
  const user = search.value.toUpperCase() ;
  if (user) {
    getUser(user);
    //search.value = "";
  }
});

const userLogin = document.getElementById("user-login");

