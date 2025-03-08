const repo = "abdurrehman1129/SE-NOTES"; // Replace with your GitHub repo
const notesContainer = document.getElementById("notes-list");
const courseNameElement = document.getElementById("course-name");

const urlParams = new URLSearchParams(window.location.search);
const courseName = urlParams.get('course');
courseNameElement.textContent = courseName;

async function fetchNotes(courseName) {
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/courses/${courseName}/NOTES`);
    const data = await response.json();

    data.forEach((note, index) => {
        if (note.type === "file") {
            const noteDiv = document.createElement("div");
            noteDiv.classList.add("note", "animate__animated", "animate__fadeInUp");
            noteDiv.style.animationDelay = `${index * 0.2}s`;

            const noteLink = document.createElement("a");
            noteLink.href = note.download_url;
            noteLink.textContent = note.name;
            noteLink.classList.add("note-link");

            const downloadButton = document.createElement("a");
            downloadButton.href = note.download_url;
            downloadButton.textContent = "Download";
            downloadButton.classList.add("download-button");

            noteDiv.appendChild(noteLink);
            noteDiv.appendChild(downloadButton);
            notesContainer.appendChild(noteDiv);
        }
    });
}

fetchNotes(courseName);