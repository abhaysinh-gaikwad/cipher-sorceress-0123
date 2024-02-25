document.addEventListener('DOMContentLoaded', () => {

    fetch('http://localhost:4000/users')

        .then(response => response.json())
        .then(data => {
            document.getElementById('userCount').innerText = data.length;

            const userTable = document.getElementById('userTable');
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${user.username}</td><td>${user.email}</td><td>${user.role}</td><td><button onClick="deleteUser()">Delete</button></td>`;
                userTable.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });


        fetch('http://localhost:4000/code')
        .then(response => response.json())
        .then(data => {
            document.getElementById('codeCount').innerText = data.length;
        })
        .catch(error => {
            console.error('Error fetching code data:', error);
        });

        const deleteUser = (userId) => {
            fetch(`http://localhost:4000/users/${userId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete user');
                }
                return response.json();
            })
            .then(() => {
                location.reload();
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
        };
});
