document.addEventListener('DOMContentLoaded', () => {
  const transferForm = document.getElementById('transferForm');
  const modal = document.getElementById('addressModal');
  const addBtn = document.querySelector('.add-address');
  const closeBtns = document.querySelectorAll('.close-modal');
  const saveBtn = document.getElementById('saveAddress');

  // Open modal
  addBtn.addEventListener('click', () => modal.style.display = 'block');

  // Close modal
  closeBtns.forEach(btn => btn.addEventListener('click', () => modal.style.display = 'none'));
  window.addEventListener('click', e => {
    if(e.target === modal) modal.style.display = 'none';
  });

  // Save Address (dummy)
  saveBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Form submission
  transferForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = transferForm.email.value.trim();
    const email2 = transferForm.email2.value.trim();
    const pwd = transferForm.password.value;
    const pwd2 = transferForm.password2.value;

    if(email !== email2) {
      alert("Emails do not match!");
      return;
    }

    if(pwd !== pwd2) {
      alert("Passwords do not match!");
      return;
    }

    // Save to localStorage for demo login
    const user = {
      name: transferForm.name.value,
      email: email,
      previousSchool: transferForm.previousSchool.value
    };
    localStorage.setItem('user', JSON.stringify(user));

    alert("Account created successfully! Please log in.");
    window.location.href = "login.html";
  });
});
