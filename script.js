const container = document.querySelector(".body ul");
const newNoteBtn = document.querySelector(".add-note");
const totalNote = document.querySelector(".total");
const moon = document.querySelector(".moon");
const homeIcon = document.querySelector(".home-icon");
const navbar = document.querySelector(".navbar");

// Load notes from localStorage
function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  container.innerHTML = "";
  notes.forEach(note => createNote(note.title, note.content, note.bg, note.fg, note.font, false));
  updateTotal();
}

// Save notes to localStorage
function saveNotes() {
  const notes = [...document.querySelectorAll(".note-containar")].map(note => ({
    title: note.querySelector(".note-title p").innerText,
    content: note.querySelector(".note-field p").innerText,
    bg: note.querySelector(".note-field p").style.backgroundColor,
    fg: note.querySelector(".note-field p").style.color,
    font: note.querySelector(".note-field p").style.fontSize
  }));
  localStorage.setItem("notes", JSON.stringify(notes));
}

function updateTotal() {
  totalNote.textContent = document.querySelectorAll(".note-containar").length;
}

// Create note
function createNote(title = "Title", content = "Write something...", bg = "white", fg = "black", font = "14px", save = true) {
  const noteHTML = document.createElement("li");
  noteHTML.innerHTML = `
    <div class="note-containar">
      <div class="note-title">
        <p contenteditable="true" class="title" style="background-color:${bg}; color:${fg}; font-size:${font};">${title}</p>
      </div>
      <hr>
      <div class="note-field">
        <p contenteditable="true" class="note" style="background-color:${bg}; color:${fg}; font-size:${font};">${content}</p>
      </div>
      <div class="manage-note">
        <label>BG</label>
        <select class="bg-color">
          <option value="white">white</option>
          <option value="black">black</option>
          <option value="green">green</option>
          <option value="blue">blue</option>
        </select>
        <label>FG</label>
        <select class="fg-color">
          <option value="black">black</option>
          <option value="white">white</option>
          <option value="green">green</option>
          <option value="blue">blue</option>
        </select>
        <label>Font</label>
        <select class="font-size">
          <option value="12px">12</option>
          <option value="14px" selected>14</option>
          <option value="16px">16</option>
          <option value="18px">18</option>
        </select>
        <button class="delete">Delete</button>
      </div>
    </div>
  `;

  const note = noteHTML.querySelector(".note-containar");

  // Delete note
  note.querySelector(".delete").addEventListener("click", () => {
    noteHTML.remove();
    updateTotal();
    saveNotes();
  });

  // Update colors and font
  note.querySelectorAll(".bg-color, .fg-color, .font-size").forEach(select => {
    select.addEventListener("change", () => {
      const titleP = note.querySelector(".note-title p");
      const noteP = note.querySelector(".note-field p");
      const bg = note.querySelector(".bg-color").value;
      const fg = note.querySelector(".fg-color").value;
      const font = note.querySelector(".font-size").value;

      [titleP, noteP].forEach(el => {
        el.style.backgroundColor = bg;
        el.style.color = fg;
        el.style.fontSize = font;
      });
      saveNotes();
    });
  });

  // Save on text edit
  note.querySelectorAll("p").forEach(p => p.addEventListener("input", saveNotes));

  container.appendChild(noteHTML);
  updateTotal();
  if (save) saveNotes();
}

// Add new note
newNoteBtn.addEventListener("click", () => createNote());

// Dark mode toggle
let dark = false;
moon.addEventListener("click", () => {
  dark = !dark;
  document.body.style.backgroundColor = dark ? "#2b2929" : "rgb(180,177,177)";
  document.body.style.color = dark ? "white" : "black";
  moon.src = dark ? "iccon/brightnes.png" : "iccon/moon.png";
});

// Navbar text toggle (hide text only)
let collapsed = false;
homeIcon.addEventListener("click", () => {
  collapsed = !collapsed;
  navbar.classList.toggle("collapsed", collapsed);
});

// Load on page start
loadNotes();
