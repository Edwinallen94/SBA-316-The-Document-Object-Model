// Menu data structure
const menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

// Cache elements using DOM selectors for form, buttons, and menu
let userInput = document.getElementById("username");
let form = document.getElementsByTagName("form")[0];
let welcomeBtn = document.getElementById("welcome");
let goodByeBtn = document.getElementById("goodBye");
let body = document.getElementsByTagName("body")[0];

let mainEl = document.querySelector("main");
mainEl.style.backgroundColor = "var(--main-bg)";
mainEl.classList.add("flex-ctr");

let topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

// Create top-level menu items
menuLinks.forEach((link) => {
  let newLink = document.createElement("a");
  newLink.setAttribute("href", link.href);
  newLink.textContent = link.text;
  topMenuEl.appendChild(newLink);
});

let subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

// Select and cache all top menu links after they've been added
let topMenuLinks = topMenuEl.querySelectorAll("a");

// Handle menu clicks
topMenuEl.addEventListener("click", function (e) {
  e.preventDefault();

  // Ensure the clicked element is an anchor tag
  if (e.target.tagName !== "A") return;

  // Remove active class from all links
  topMenuLinks.forEach((link) => link.classList.remove("active"));

  // Add active class to clicked link
  e.target.classList.add("active");

  // Find the clicked link's object in the menuLinks array
  const clickedLink = menuLinks.find(
    (link) => link.text === e.target.textContent
  );

  // If the clicked link has subLinks, build the submenu
  if (clickedLink && clickedLink.subLinks) {
    subMenuEl.style.top = "100%"; // Show submenu
    buildSubMenu(clickedLink.subLinks);
  } else {
    subMenuEl.style.top = "0"; // Hide submenu
    subMenuEl.innerHTML = ""; // Clear submenu
  }
});


Function to build the submenu
function buildSubMenu(subLinks) {
  subMenuEl.innerHTML = ""; // Clear any existing sublinks

  // Create and append sublinks
  subLinks.forEach((link) => {
    let subLinkEl = document.createElement("a");
    subLinkEl.setAttribute("href", link.href);
    subLinkEl.textContent = link.text;
    subMenuEl.appendChild(subLinkEl);
  });
}

// Handle form inputs
userInput.addEventListener("change", () => {
  console.log(`I am typing ${userInput.value}`);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Submitted Form");
});

// Handle buttons
welcomeBtn.addEventListener("click", handleClick);

function handleClick() {
  // Remove any existing <h1> before adding a new one
  let existingHeader = body.querySelector("h1");
  if (existingHeader) {
    existingHeader.remove();
  }

  let newHead = document.createElement("h1");
  newHead.textContent = "Welcome!";
  body.appendChild(newHead);
}

goodByeBtn.addEventListener("click", handleGoodbye);

function handleGoodbye() {
  // Remove any existing <h1> before adding a new one
  let existingHeader = body.querySelector("h1");
  if (existingHeader) {
    existingHeader.remove();
  }

  let newHead = document.createElement("h1");
  newHead.textContent = "Goodbye!";
  body.appendChild(newHead);

  // Disable the 'Click Me!' button after saying goodbye
  welcomeBtn.removeEventListener("click", handleClick);
}
