window.onload = () => {
    const content = document.getElementById('content');
    const input = document.getElementsByName('address')[0];
    const button = document.getElementsByTagName('button')[0];

    button.addEventListener('click', (event) => {
        event.preventDefault();
        content.innerHTML = `<p>Loading...</p>`;
        getForecast(input.value);
    });

    navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords;
            getForecast(`${longitude},${latitude}`);
        },
        () => {
            content.innerHTML = `<p>Please, enter the <b>address</b> where you want to find out the <b>weather</b>.</p>`;
        },
        {enableHighAccuracy: false, timeout: 5000}
    );
};

function getForecast(data) {
    fetch(`/forecast?data=${data}`)
        .then(resp => resp.text())
        .then(resp => {
            content.innerHTML = resp;
        });
}
