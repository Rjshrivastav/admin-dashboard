const checkbox = document.getElementById("checkbox");

checkbox.addEventListener("change", () => {
    const sun = document.querySelector('.sun');
    const moon = document.querySelector('.moon');

    if (checkbox.checked) {
        // Dark mode (moon)
        sun.style.opacity = 0;
        moon.style.opacity = 1;
        document.documentElement.style.setProperty('--background-color', '#343a40');
        document.documentElement.style.setProperty('--text-color', 'white');
        document.documentElement.style.setProperty('--box-color', '#575b60');
    } else {
        // Light mode (sun)
        sun.style.opacity = 1;
        moon.style.opacity = 0;
        document.documentElement.style.setProperty('--background-color', '#edede9');
        document.documentElement.style.setProperty('--text-color', 'black');
        document.documentElement.style.setProperty('--box-color', 'white');
    }
});


const menu = document.querySelector('.left-container');
const hamburger = document.querySelector('#hamburger-menu');
const closeBtn = document.querySelector('.close');

hamburger.addEventListener('click', () => {
    menu.style.display = 'block'
})

closeBtn.addEventListener('click', () => {
    menu.style.display = 'none';
})



function logout() {
    fetch('/logout', {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                window.location.href = '/';
            } else {
                console.error('Logout failed');
            }
        })
        .catch(error => {
            console.error('Error during logout:', error)
        })
}