<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KPT AI - Kanthale Pagngnasiri Thero</title>
    <link href="https://i.ibb.co/xtC6WRZh/high-1742280125-modified.png" rel="icon" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.3/dist/tailwind.min.css" rel="stylesheet">
    <style>
        body { font-family: 'Poppins', sans-serif; }
        .chat-container { max-height: 500px; overflow-y: auto; background-color: #1e1e2f; border: 1px solid #333; border-radius: 8px; padding: 20px; }
        .input-container { position: relative; }
        .chat-input { width: 100%; padding: 10px; border: none; border-radius: 8px; background-color: #282841; color: white; }
        .chat-input:focus { outline: none; background-color: #3b3b5e; }
        .message { margin-bottom: 15px; padding: 10px; border-radius: 8px; background-color: #343451; color: white; }
        .user-message { background-color: #454667; }
        .spinner { border: 4px solid rgba(255, 255, 255, 0.3); width: 24px; height: 24px; border-radius: 50%; border-left-color: white; animation: spin 1s ease infinite; display: inline-block; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    </style>
</head>
<body class="bg-gray-900 text-white flex flex-col items-center justify-center min-h-screen p-3">
    
    <div id="authSection" class="w-full max-w-md mx-auto">
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 class="text-2xl font-bold">Login</h2>
            <input id="loginEmail" type="email" placeholder="Email" class="w-full p-2 my-2 rounded bg-gray-700">
            <input id="loginPassword" type="password" placeholder="Password" class="w-full p-2 my-2 rounded bg-gray-700">
            <button onclick="login()" class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Login</button>
            <p class="mt-2">Don't have an account? <a href="#" onclick="showSignup()" class="text-blue-400">Sign up</a></p>
        </div>
    </div>
    
    <div id="chatSection" class="hidden w-full max-w-md mx-auto">
        <div class="chat-container mb-4" id="chatContainer">
            <div class="message user-message">මම පඤ්ඤාසිරි පොඩි සාදු.</div>
            <div class="message user-message">මම ඔයාට කොහොමද උදව් කරන්න ඔනේ ඔයාගෙ ප්‍රශ්නය ENGLISH වලින් අහන්න කාරුණික වන්න..</div>
        </div>
        <div class="input-container flex">
            <input id="chatInput" type="text" class="chat-input" placeholder="Type a message...">
            <button id="sendBtn" class="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Send</button>
        </div>
    </div>

    <script>
        // Function to sign up a new user
        function signUp() {
            const fullName = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;

            if (!fullName || !email || !password) {
                alert("Please fill in all fields.");
                return;
            }

            // Save user data in localStorage
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password);

            alert("Signup successful! Please log in.");
            location.reload(); // Reload the page to show the login form
        }

        // Function to log in a user
        function login() {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // Get stored user credentials
            const storedEmail = localStorage.getItem("userEmail");
            const storedPassword = localStorage.getItem("userPassword");

            // Validate user credentials
            if (email === storedEmail && password === storedPassword) {
                document.getElementById('authSection').classList.add('hidden');
                document.getElementById('chatSection').classList.remove('hidden');
            } else {
                alert("Invalid email or password!"); // Prevent access if incorrect
            }
        }

        // Show signup form
        function showSignup() {
            document.getElementById('authSection').innerHTML = `
                <div class='bg-gray-800 p-6 rounded-lg shadow-lg text-center'>
                    <h2 class='text-2xl font-bold'>Sign Up</h2>
                    <input id='signupName' type='text' placeholder='Full Name' class='w-full p-2 my-2 rounded bg-gray-700'>
                    <input id='signupEmail' type='email' placeholder='Email' class='w-full p-2 my-2 rounded bg-gray-700'>
                    <input id='signupPassword' type='password' placeholder='Password' class='w-full p-2 my-2 rounded bg-gray-700'>
                    <button onclick='signUp()' class='w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded'>Sign Up</button>
                    <p class='mt-2'>Already have an account? <a href='#' onclick='location.reload()' class='text-blue-400'>Login</a></p>
                </div>`;
        }

        document.getElementById('sendBtn').addEventListener('click', sendMessage);
        function sendMessage() {
            const userMessage = document.getElementById('chatInput').value;
            if (userMessage.trim() !== '') {
                appendMessage(userMessage, 'user-message');
                document.getElementById('chatInput').value = '';
                appendSpinner();
                generateBotResponse(userMessage);
            }
        }
        function appendMessage(text, className) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${className}`;
            messageDiv.textContent = text;
            document.getElementById('chatContainer').appendChild(messageDiv);
        }
        function appendSpinner() {
            const spinnerDiv = document.createElement('div');
            spinnerDiv.className = 'spinner';
            spinnerDiv.id = 'spinner';
            document.getElementById('chatContainer').appendChild(spinnerDiv);
        }
        function removeSpinner() {
            const spinner = document.getElementById('spinner');
            if (spinner) spinner.remove();
        }
        async function generateBotResponse(userMessage) {
            try {
                const response = await fetch("https://backend.buildpicoapps.com/aero/run/llm-api?pk=v1-Z0FBQUFBQm4ySFNqbEkwV1Rndi1lVnBoRlJZMlRtSUt2T3UzUkxfMS1PdE5ELTJsa2llbV9ZVkxuRzBHYU00cHdaR09DbUV6YzZTQk1pTUlhSmkwUkIzWV9vR2RxRExiZXc9PQ==", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: userMessage })
                });
                const data = await response.json();
                removeSpinner();
                appendMessage(data.status === 'success' ? data.text : "I'm sorry, there was an error.");
            } catch (error) {
                removeSpinner();
                appendMessage("An error occurred while processing your request.");
            }
        }
    </script>
</body>
</html>
