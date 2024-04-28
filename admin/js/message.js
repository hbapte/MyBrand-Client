
var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");
var sidebarCloseIcon = document.getElementById("sidebarIcon");

function toggleSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar_responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar_responsive");
    sidebarOpen = false;
  }
}


function toggleSidebar() {
    if (!sidebarOpen) {
      sidebar.classList.add("sidebar_responsive");
      sidebarOpen = true;
    } else {
      sidebar.classList.remove("sidebar_responsive");
      sidebarOpen = false;
    }
  }
  


// Function to fetch and display messages from API
async function fetchAndDisplayMessages() {
    try {
        // Show loader
        const loader = document.getElementById('loader');
        loader.style.display = 'block';

        const response = await fetch('https://my-brand-oxuh.onrender.com/api/contact');
        const messages = await response.json();
        const messagesBody = document.getElementById('messagesBody');
        const messageCountBadge = document.getElementById('messageCountBadge');
        messagesBody.innerHTML = ''; 

        messages.forEach(message => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${message.names}</td>
                <td>${message.email}</td>
                <td>${message.message}</td>
                <td>${new Date(message.sentAt).toLocaleString()}</td>
                <td><button onclick="deleteMessage('${message._id}')">Delete</button></td>
            `;
            messagesBody.appendChild(row);
        });

        // Update message count badge
        messageCountBadge.textContent = messages.length;

        // Hide loader
        loader.style.display = 'none';

    } catch (error) {
        console.error('Error fetching messages:', error);
      
        const loader = document.getElementById('loader');
        loader.style.display = 'none';
    }
}

// Call the function when the page loads
window.addEventListener('load', () => {
    fetchAndDisplayMessages();
});


// Function to delete a message
async function deleteMessage(messageId) {
    try {
        const response = await fetch(`https://my-brand-oxuh.onrender.com/api/contact/${messageId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            // Refresh the messages after deleting
            fetchAndDisplayMessages();
        } else {
            console.error('Failed to delete message');
        }
    } catch (error) {
        console.error('Error deleting message:', error);
    }
}

// Call the function when the page loads
window.addEventListener('load', () => {
    fetchAndDisplayMessages();
});