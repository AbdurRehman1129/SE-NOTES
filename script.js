const repo = "abdurrehman1129/SE-NOTES"; // Replace with your GitHub repo
const coursesContainer = document.getElementById("course-list");

async function fetchCourses() {
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/courses`);
    const data = await response.json();

    data.forEach(course => {
        if (course.type === "dir") {
            const courseButton = document.createElement("button");
            courseButton.classList.add("course-button", "animate__animated", "animate__fadeInUp");
            courseButton.textContent = course.name;
            courseButton.onclick = () => window.location.href = `course.html?course=${course.name}`;
            coursesContainer.appendChild(courseButton);
        }
    });
}

fetchCourses();