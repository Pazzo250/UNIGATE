document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('addressModal');
    const addAddressBtn = document.querySelector('.add-address');
    const closeButtons = document.querySelectorAll('.close-modal');
    const saveAddressBtn = document.getElementById('saveAddress');

    // Show modal
    addAddressBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    // Close modal function
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Close with close button or cancel button
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Close when clicking outside the modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Handle save address
    saveAddressBtn.addEventListener('click', () => {
        const street = modal.querySelector('[name="street"]').value;
        const city = modal.querySelector('[name="city"]').value;
        const state = modal.querySelector('[name="state"]').value;
        const postal = modal.querySelector('[name="postal"]').value;
        const country = modal.querySelector('[name="country"]').value;

        // Format the address
        const formattedAddress = [
            street,
            [city, state, postal].filter(Boolean).join(', '),
            country
        ].filter(Boolean).join('\n');

        // Create a hidden input to store the address
        let addressInput = document.querySelector('[name="full_address"]');
        if (!addressInput) {
            addressInput = document.createElement('input');
            addressInput.type = 'hidden';
            addressInput.name = 'full_address';
            document.querySelector('.address-field').appendChild(addressInput);
        }
        addressInput.value = formattedAddress;

        // Add visual confirmation
        const addAddressBtn = document.querySelector('.add-address');
        addAddressBtn.innerHTML = '<span class="plus">✓</span> Address Added';
        addAddressBtn.style.borderColor = '#4CAF50';
        addAddressBtn.style.color = '#4CAF50';

        closeModal();
    });
});