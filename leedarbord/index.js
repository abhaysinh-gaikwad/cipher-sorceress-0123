var typed = new Typed('.text', {
  strings: ["Final Standings", "Top 10 Teams"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop:true
});

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://localhost:4000/code/top-users');
    if (!response.ok) {
      throw new Error('Failed to fetch leaderboard data');
    }
    const data = await response.json();
    const usersContainer = document.getElementById('users-container');
    // Clear existing content
    usersContainer.innerHTML = '';
    // Create the heading for the leaderboard
    const heading = document.createElement('div');
    heading.classList.add('user');
    heading.innerHTML = '<span>Rank</span><span>Name</span><span>Total Creations</span>';
    usersContainer.appendChild(heading);


    const isLoggedIn = localStorage.getItem("token") !== null;

  // Select the element with class "register" which contains the login link
  const loginLink = document.querySelector(".register a");

  if (isLoggedIn) {
      // Get the username from localStorage
      const username = localStorage.getItem("username");

      // If the username exists, change the text to the username
      if (username) {
          loginLink.textContent = username;
      } else {
          // If the username doesn't exist, keep the text as "Login"
          loginLink.textContent = "Login";
      }

      // Redirect user to profile page when clicking on username button
      loginLink.addEventListener("click", (event) => {
          event.preventDefault(); // Prevent default anchor tag behavior
          window.location.href = "../newProfile_page/profile.html";
      });
  } else {
      // If the user is not logged in, keep the text as "Login"
      loginLink.textContent = "Login";
  }

  
  
    // Populate the leaderboard with fetched data
    data.forEach((user, index) => {
      const userDiv = document.createElement('div');
      userDiv.classList.add('user');
      userDiv.innerHTML = `
        <span>${index + 1}</span>
        <span>${user.userName}</span>
        <span>${user.count}</span>
      `;
      usersContainer.appendChild(userDiv);
    });

    // // Check if the user is logged in
    // const isLoggedIn = true; // Change this to your actual logic to determine if the user is logged in
    // if (isLoggedIn) {
    //   const logoutButton = document.querySelector('.register a');
    //   logoutButton.textContent = 'John Doe'; // Replace 'John Doe' with the actual name of the logged-in user
    // }


  } catch (error) {
    console.error(error);
    // Handle error - Display an error message on the page
    const usersContainer = document.getElementById('users-container');
    usersContainer.innerHTML = '<div class="error-message">Failed to fetch leaderboard data</div>';
  }
});


