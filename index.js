const link = "http://localhost:8035/api/features";
const $jsContent = document.querySelector(".js_content");

// https://first-azure-project.azurewebsites.net/api/features
// 

fetch(link)
  .then((data) => data.json())
  .then((features) => {
    $jsContent.innerHTML = ``;
    features.map(
      ({ id, feature, version, year }) =>
        ($jsContent.innerHTML += `
        <li class="feature">${id}
          <ul>
            <li>${feature}</li>
            <li>${version}</li>
            <li>${year}</li>
          </ul>
        </li>`)
    );
  });

