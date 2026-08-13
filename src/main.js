const API_KEY = import.meta.env.VITE_API_KEY;

document.querySelector("#app").innerHTML = "<p>Loading...</p>";

fetch(`https://api.unsplash.com/photos/random?client_id=${API_KEY}`)
       .then(response => response.json())
       .then(data => {
    document.querySelector("#app").innerHTML = `  
      <img src="${data.urls.full}" alt="${data.alt_description || "Cozy background"}">
      <div id="clock"></div>
      <div id="date"></div>
      <input id="search" type="text" placeholder="Search the web...">
      <div id="shortcuts">
      <a href="https://www.youtube.com" target="_blank">
      <img src="https://www.google.com/s2/favicons?domain=youtube.com&sz=64" alt="Youtube">
      </a>
      <a href="https://www.hackclub.com" target="_blank">
      <img src="https://www.google.com/s2/favicons?domain=hackclub.com&sz=64" alt="Hackclub">
      </a>
      <a href="https://www.github.com" target="_blank">
      <img src="https://cdn.simpleicons.org/github" alt="Github">
      </a>
      <a href="https://www.Linkedin.com" target="_blank">
      <img src="https://www.google.com/s2/favicons?domain=linkedin.com&sz=64" alt="LinkedIn">
      </a>
      <a href="https://www.instagram.com" target="_blank">
      <img src="https://www.google.com/s2/favicons?domain=instagram.com&sz=64" alt="Instagram">
      </a>
      </div>
      <div id="quick-note">
       <h2>📝 Quick note</h2>
       <textarea id="note" placeholder="Write something..."></textarea>
       <button id="clear-note">Clear</button>
      </div>
   `;

   updateClock();
   updateDate();
   setInterval(updateClock, 1000);

   document.querySelector("#search").addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
        const query = event.target.value;

        if (query.trim()) {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
     }
    }
  });
  const note = document.querySelector("#note");
  const clearNote = document.querySelector("#clear-note");
  note.value = localStorage.getItem("quickNote") || "";
  note.addEventListener("input", () => {
    localStorage.setItem("quickNote", note.value);
  });
  clearNote.addEventListener("click", () => {
    note.value = "";
    localStorage.removeItem("#quickNote");
  });
  });
 function updateClock() {
  const now = new Date();

  document.querySelector("#clock").textContent =
  now.toLocaleTimeString([],  {
    hour: "2-digit",
    minute: "2-digit"
  });
 }
 function updateDate() {
  const now = new Date();

  document.querySelector("#date").textContent =
    now.toLocaleDateString([], {
      weekday: "long",
      month: "long" ,
      day: "numeric"
    });
 }
