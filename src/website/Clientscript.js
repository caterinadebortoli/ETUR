document.getElementById('report_btn').addEventListener('click', function() {
var newDiv = document.createElement('div');
newDiv.className = 'window';
newDiv.innerHTML = `
<div class="window-header">
    <input type="text" placeholder="   Kategorie" id="category" class="category">
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
});});



document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('send');
    
    sendButton.addEventListener('click', function() {
        const Id = document.getElementById('id').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('catgory').value
        const customerId = document.getElementById('customerId').value
    

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