const repo = "abdurrehman1129/SE-NOTES"; // Replace with your GitHub repo
const coursesContainer = document.getElementById("courses");

async function fetchCourses() {
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/courses`);
    const data = await response.json();

    data.forEach(course => {
        if (course.type === "dir") {
            const courseDiv = document.createElement("div");
            courseDiv.innerHTML = `<h2>${course.name}</h2>`;
            coursesContainer.appendChild(courseDiv);

            fetchNotes(course.name, courseDiv);
        }
    });
}

async function fetchNotes(courseName, courseDiv) {
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/courses/${courseName}/NOTES`);
    const data = await response.json();

    data.forEach(note => {
        if (note.type === "file") {
            const noteLink = document.createElement("a");
            noteLink.href = note.download_url;
            noteLink.textContent = note.name;
            noteLink.classList.add("note-link");
            courseDiv.appendChild(noteLink);
            courseDiv.appendChild(document.createElement("br"));
        }
    });
}

fetchCourses();