// Variables
let about = document.getElementById("about");
let socials = document.getElementById("socials");
let projects = document.getElementById("projects");

let smallAbout = document.getElementById("smallAbout");
let smallSocials = document.getElementById("smallSocials");
let smallProjects = document.getElementById("smallProjects");

let client = new XMLHttpRequest();

let content = document.getElementById("content");

let navItems = document.querySelectorAll("#bigNav li");


// Functions
function getNavIndices(items) {
    let itemIndices = [];

    for (let index = 0; index < items.length; index++) {
        itemIndices.push(index);
    }

    return itemIndices;
}

let navIndices = getNavIndices(navItems);
function UrlExists(url) {
    client.open("HEAD", url, false);
    client.send();
    return client.status != 404;
}

function getContentAccordingToResource(element, pathToResource) {
    element.addEventListener("mousedown", () => {
        if (!UrlExists(pathToResource)) {
            return;
        }

        client.open("GET", pathToResource);
        client.send();
    });
}

function showWelcomeMessage() {
    if (UrlExists("/resources/introduction.html")) {
        client.open("GET", "/resources/introduction.html");
        client.send();
    }
}

// For desktop view
showWelcomeMessage();
getContentAccordingToResource(about, "/resources/about.html");
getContentAccordingToResource(socials, "/resources/socials.html");
getContentAccordingToResource(projects, "/resources/projects.html");

// For mobile view
getContentAccordingToResource(smallAbout, "/resources/about.html");
getContentAccordingToResource(smallSocials, "/resources/socials.html");
getContentAccordingToResource(smallProjects, "/resources/projects.html");


// Show content
client.onreadystatechange = function (e) {

    let contentTextIsEmpty = content.innerText === "";

    if (contentTextIsEmpty) {
        content.style.background = "none";
        content.style.boxShadow = "none";
        content.innerText = "No content available // Kein Inhalt verfügbar";
        return;
    }

    // Get age
    let currentYear = new Date().getFullYear();
    let age = currentYear - 2001;

    let replacedContent = client.responseText.replace("[AGE]", age.toString());
    content.style.boxShadow = "0px 0px 20px 00px black";
    content.style.background = "rgba(0, 0, 0, 0.3)";
    content.innerHTML = replacedContent;
};