function requestNewCode(url_data) {
    fetch('http://127.0.0.1:8000/new/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                url: url_data
            })
        }).then(response => response.json())
        .then(json_data =>json_data.code)
        .then(newHref)
        .catch(error =>console.log("ha pasado un error: ",error));
}

function getUrlAndRequestNewCode(){
    var url_input = document.getElementById('url');
    requestNewCode(url_input.value);
}

function requestRanking(limit, callback){
    fetch(`http://127.0.0.1:8000/ranking/${limit}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            }).then(response => response.json())
            .then(callback);
}

function renderTable(data){
    data.ranking.forEach(createNewElement);
}

function createNewElement(ranking_element){
    let new_element = document.createElement("TR");
    new_element.innerHTML = `<tr>
      <td>${ranking_element.full_url}</td>
      <td>${ranking_element.clicks}</td>
      <td>${ranking_element.url_code}</td>
      <td>${ranking_element.created_at.slice(2,10)}</td>
    </tr>`;
    document.querySelector("#table").appendChild(new_element);
}

function newHref(code){
    let Href_element = 
    `<a id="code" href=${window.location.protocol}//${window.location.hostname}:8000/${code}> ${window.location.hostname}/${code}</a>
<button class="btn btn-secondary btn-sm" onclick="copy()">Copy</button>`;
    document.querySelector("#url_shorter").innerHTML = Href_element;
}

function copy() {
  var copyText = document.getElementById("code");
  Clipboard_CopyTo(copyText.textContent);
  alert("Copied the text: " + copyText.textContent);
}

function Clipboard_CopyTo(value) {
  var tempInput = document.createElement("input");
  tempInput.value = value;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}


