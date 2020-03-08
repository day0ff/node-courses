window.onload = () => {
    const url = 'http://localhost:3000';
    const content = document.getElementById('content');
    const input = document.getElementsByName('address')[0];
    const button = document.getElementsByTagName('button')[0];
    button.addEventListener('click', (event) => {
        event.preventDefault();
        content.innerHTML = `<p>Loading...</p>`;
        fetch(`${url}/forecast?address=${input.value}`)
            .then(resp => resp.text())
            .then(resp => {
                content.innerHTML = resp;
            });
    })
};
