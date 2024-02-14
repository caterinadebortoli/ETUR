document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('send');
    const createClientFields = document.getElementById('createClientFields');
    const submitButton = document.getElementById('submitButton'); // Get the submit button
    
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

   
