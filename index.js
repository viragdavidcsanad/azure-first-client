const link = "https://first-azure-project.azurewebsites.net/api/features";
const $jsContent = document.querySelector(".js_content");

//
// http://localhost:8901/api/features

const headers = new Headers();
headers.append("Accept", "application/json");
const request = new Request(link, {
  method: "POST",
  headers,
  mode: "cors",
});

const fresh = fetch(request)
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

fresh;
