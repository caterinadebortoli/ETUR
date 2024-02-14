document.addEventListener('DOMContentLoaded', function() {
    const createButton = document.getElementById('createButton');
    const createClientFields = document.getElementById('createClientFields');
    const submitButton = document.getElementById('submitButton'); // Get the submit button
    
    createButton.addEventListener('click', function() {
        createClientFields.style.display = 'block';
    });

    submitButton.addEventListener('click', function() {
        const id = document.getElementById('id').value;
        const name = document.getElementById('name').value;

        // Construct the data object to be sent in the POST request
        const data = {
            name: name,
            id: id
        };

        // Send a POST request to your API endpoint
        fetch('http://127.0.0.1:3000/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create customer');
            }
            return response.json();
        })
        .then(data => {
            // Handle the response data if needed
            console.log('Customer created successfully:', data);
            
        })
        .catch(error => {
            // Handle any errors
            console.error('Error creating customer:', error);
        });
        addCustomerCard(data)
    });
});

function addCustomerCard(customer) {
    const container = document.querySelector('.container');

    // Create a new div element for the customer card
    const card = document.createElement('div');
    card.classList.add('client-card');

    // Populate the card with customer information
    card.innerHTML = `
        <div class="client-number">${customer.id}</div>
        <div class="client-name">${customer.name}</div>
    `;

    // Append the card to the container
    container.appendChild(card);
}
