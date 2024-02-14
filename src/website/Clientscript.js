document.getElementById('report_btn').addEventListener('click', function() {
    var newDiv = document.createElement('div');
    newDiv.className = 'window';
    newDiv.innerHTML = `
    <div class="window-header">
        <div id="status" class="status" style="background-color: red;">
            <span style="visibility: hidden;">Unsichtbarer Text</span>
        </div>
        <select id="category" class="category">
            <option value="Bug">Bug</option>
            <option value="Feedback">Feedback</option>
            <option value="Systemcrash">Systemcrash</option>
        </select>
        <input type="text" placeholder="   Id" id="id" class="id">
        <input type="text" placeholder="   Customer-Id" id="customerId" class="customerId">
        <button class="minimize"> ^ </button>
    </div>
    <textarea placeholder="Neuer Eintrag" id="description" class="description"></textarea>
    <button id="send" class="send">Senden</button>
    `;

    document.getElementById('rest-area').appendChild(newDiv);
    newDiv.querySelector('.minimize').addEventListener('click', function() {
        var description = newDiv.querySelector('.description');
        var sendButton = newDiv.querySelector('.send');
        var windowHeader = newDiv.querySelector('.window-header');
        if (newDiv.style.height === '50px') {
            newDiv.style.height = '310px';
            description.style.display = 'block';
            sendButton.style.display = 'block';
        } else {
            newDiv.style.height = '50px';
            description.style.display = 'none';
            sendButton.style.display = 'none';
        }
    });

    newDiv.querySelector('.send').addEventListener('click', function() {
        const Id = newDiv.querySelector('.id').value;
        const description = newDiv.querySelector('.description').value;
        const category = newDiv.querySelector('.category').value;
        const customerId = newDiv.querySelector('.customerId').value;

        // Construct the data objectcate to be sent in the POST request
        const data = {
            Id: Id,
            customerId: customerId,
            description:description,
            category:category
        };

        // Send a POST request to your API endpoint
        fetch('http://127.0.0.1:3000/customer/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create report');
            }
            return response.json();
        })
        .then(data => {
            // Handle the response data if needed
            console.log('Report created successfully:', data);
        })
        .catch(error => {
            // Handle any errors
            console.error('Error creating report:', error);
        });
    });
});

var userPopup = document.getElementById('user_popup');
document.getElementById('user_btn').addEventListener('click', function() {
    if (userPopup.style.display === 'none' || userPopup.style.display === '') {
        userPopup.style.display = 'block';
    } else {
        userPopup.style.display = 'none';
    }
});
document.getElementById('logout_btn').addEventListener('click', function() {
    // Fügen Sie hier Ihren Code zum Abmelden des Benutzers ein
});
