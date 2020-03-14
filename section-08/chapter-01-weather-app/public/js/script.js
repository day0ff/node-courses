const url = window.location.href;

window.onload = () => {
    const content = document.getElementById('content');
    const input = document.getElementsByName('address')[0];
    const button = document.getElementsByTagName('button')[0];

    button.addEventListener('click', (event) => {
        event.preventDefault();
        content.innerHTML = `<p>Loading...</p>`;
        getForecast(input.value);
    })

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords;
            getForecast(`${longitude},${latitude}`);
        });
    } else {
        content.innerHTML = `<p>Please, enter the <b>address</b> where you want to find out the <b>weather</b>.</p>`;
    }

};

function getForecast(data) {
    fetch(`${url}forecast?data=${data}`)
        .then(resp => resp.text())
        .then(resp => {
            content.innerHTML = resp;
        });
}
