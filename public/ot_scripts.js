function createCircularMenuForRow(row) {
    // Create nav element
    let navElement = document.createElement('nav');
    navElement.classList.add('circular-menu');

    // Create circle div
    let circleDiv = document.createElement('div');
    circleDiv.classList.add('circle');

    // Array of icon classes with their respective events and listeners
    let iconClasses = [
        { class: 'fa-copy', event: 'click', listener: copyFunction },
        { class: 'fa-arrow-circle-o-up', event: 'click', listener: upFunction },
        { class: 'fa-arrow-circle-o-down', event: 'click', listener: downFunction },
        { class: 'fa-cut', event: 'click', listener: cutFunction },
        { class: 'fa-paste', event: 'click', listener: pasteFunction },
        { class: 'fa-trash-o', event: 'click', listener: deleteFunction },
        { class: 'fa-arrow-circle-up', event: 'click', listener: arrowUpFunction },
        { class: 'fa-arrow-circle-down', event: 'click', listener: arrowDownFunction }
    ];

    // Loop through the iconClasses array and create elements with corresponding classes and event listeners
    iconClasses.forEach((iconObj, index) => {
        let iconLink = document.createElement('a');
        iconLink.setAttribute('href', '#');
        iconLink.classList.add('fa', iconObj.class); // Add "fa" class and specific icon class
        iconLink.addEventListener(iconObj.event, function(event) {
            // Call the listener function and pass the row element
            iconObj.listener(event, row);
        });
        circleDiv.appendChild(iconLink);

        // Position the menu items
        let angle = -0.5 * Math.PI - 2 * (1 / iconClasses.length) * index * Math.PI;
        let left = (50 - 20 * Math.cos(angle)).toFixed(2) + "%";
        let top = (50 + 20 * Math.sin(angle)).toFixed(2) + "%";
        iconLink.style.left = left;
        iconLink.style.top = top;
    });

    // Create menu button element
    let menuButton = document.createElement('a');
    menuButton.setAttribute('href', '#');
    menuButton.classList.add('menu-button', 'fa', 'fa-bars');

    // Append circle div and menu button to nav element
    navElement.appendChild(circleDiv);
    navElement.appendChild(menuButton);

    // Create table cell
    let cell = document.createElement('td');
    cell.appendChild(navElement);

    // Append the cell to the row
    row.appendChild(cell);

    // Toggle functionality for opening/closing the menu
    menuButton.onclick = function(e) {
        e.preventDefault();
        circleDiv.classList.toggle('open');
    };
}


function copyFunction(event, row) {
    console.log('Copy function called!');
    console.log(row);
}

function upFunction() {
    console.log('Up function called!');
}

function downFunction() {
    console.log('Down function called!');
}

function cutFunction() {
    console.log('Cut function called!');
}

function pasteFunction() {
    console.log('Paste function called!');
}

function deleteFunction() {
    console.log('Delete function called!');
}

function arrowUpFunction() {
    console.log('Arrow up function called!');
}

function arrowDownFunction() {
    console.log('Arrow down function called!');
}