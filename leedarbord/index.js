var typed = new Typed(".text", {
  strings: ["Final Standings", "Top 10 Teams"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:4000/code/top-users");
    if (!response.ok) {
      throw new Error("Failed to fetch leaderboard data");
    }
    const data = await response.json();
    const usersContainer = document.getElementById("users-container");
    // Clear existing content
    usersContainer.innerHTML = "";
    // Create the heading for the leaderboard
    const heading = document.createElement("div");
    heading.classList.add("user");
    heading.innerHTML =
      "<span>Rank</span><span>Name</span><span>Total Creations</span>";
    usersContainer.appendChild(heading);
    // Populate the leaderboard with fetched data
    data.forEach((user, index) => {
      const userDiv = document.createElement("div");
      userDiv.classList.add("user");
      userDiv.innerHTML = `
        <span>${index + 1}</span>
        <span>${user.userName}</span>
        <span>${user.count}</span>
      `;
      usersContainer.appendChild(userDiv);
    });
  } catch (error) {
    console.error(error);
    // Handle error - Display an error message on the page
    const usersContainer = document.getElementById("users-container");
    usersContainer.innerHTML =
      '<div class="error-message">Failed to fetch leaderboard data</div>';
  }
});
