// Popup functionality for new website notification
document.addEventListener('DOMContentLoaded', function() {
    const popupOverlay = document.getElementById('popup-overlay');
    const closePopup = document.getElementById('close-popup');
    
    // Check if user has previously closed the popup (once per session)
    if (!sessionStorage.getItem('popupClosed')) {
        setTimeout(() => {
            popupOverlay.style.display = 'flex';
        }, 1000); // Show after 1 second delay
    }
    
    // Close popup and remember for this session
    closePopup.addEventListener('click', function() {
        popupOverlay.style.display = 'none';
        sessionStorage.setItem('popupClosed', 'true');
    });
    
    // Close when clicking outside popup
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            popupOverlay.style.display = 'none';
            sessionStorage.setItem('popupClosed', 'true');
        }
    });

    // Your existing course fetching code
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
});
