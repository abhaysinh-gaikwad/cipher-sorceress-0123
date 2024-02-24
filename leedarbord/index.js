var typed = new Typed('.text', {
  strings: ["Final Standings", "Top 10 Teams"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});


const users = [
    { name: 'John', creations: 8 },
    { name: 'Alice', creations: 6 },
    { name: 'Bob', creations: 10 },
    { name: 'Emma', creations: 5 },
    { name: 'Sam', creations: 12 },
    { name: 'John', creations: 4 },
    { name: 'Sam', creations: 7 }
  ];
  
  // Sort users based on the number of CodePen creations
  users.sort((a, b) => b.creations - a.creations);
  
  // Get the users container
  const usersContainer = document.getElementById('users-container');
  
  // Create the heading for the leaderboard
  const heading = document.createElement('div');
  heading.classList.add('user');
  heading.innerHTML = '<span>Rank</span><span>Name</span><span>Total Creations</span>';
  usersContainer.appendChild(heading);
  
  // Populate the leaderboard
  users.slice(0, 10).forEach((user, index) => {
    const userDiv = document.createElement('div');
    userDiv.classList.add('user');
    userDiv.innerHTML = `
      <span>${index + 1}</span>
      <span>${user.name}</span>
      <span>${user.creations}</span>
    `;
    usersContainer.appendChild(userDiv);
  });
  