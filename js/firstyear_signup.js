// ============================================
// FIRST YEAR STUDENT REGISTRATION JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  try {
    // ------------------ Virtual Advisor ------------------
    const advisorBtn = document.getElementById('advisorBtn');
    const advisorChat = document.getElementById('advisorChat');
    const sendBtn = document.getElementById('sendBtn');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    // Only initialize advisor UI if required elements exist
    if (advisorBtn && advisorChat) {
      advisorBtn.addEventListener('click', () => {
        advisorChat.style.display = advisorChat.style.display === 'none' ? 'block' : 'none';
      });
    }

    if (sendBtn && chatInput && chatMessages) {
      sendBtn.addEventListener('click', sendMessage);
      chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });
    }

    function sendMessage() {
      try {
        const message = (chatInput && chatInput.value || '').trim();
        if (!message) return;
        appendMessage('user', message);
        if (chatInput) chatInput.value = '';
        setTimeout(() => {
          appendMessage('bot', "I am reviewing your query. This is a demo response.");
        }, 800);
      } catch (err) {
        console.error('sendMessage error:', err);
      }
    }

    function appendMessage(sender, text) {
      if (!chatMessages) return;
      const div = document.createElement('div');
      div.className = `message ${sender}`;
      div.style.marginBottom = '12px';
      div.innerHTML = sender === 'bot' ? `<strong>Advisor:</strong> ${text}` : `<strong>You:</strong> ${text}`;
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    window.handleQuickReply = function (text) {
      if (!chatInput) return;
      chatInput.value = text;
      sendMessage();
    }

    // ------------------ Address Modal ------------------
    const addAddressBtn = document.querySelector('.add-address');
    const addressModal = document.getElementById('addressModal');
    const closeModalBtns = document.querySelectorAll('.close-modal') || [];
    const saveAddressBtn = document.getElementById('saveAddress');

    if (addAddressBtn && addressModal) {
      addAddressBtn.addEventListener('click', () => {
        addressModal.style.display = 'block';
        addressModal.setAttribute('aria-hidden', 'false');
      });
    }

    if (closeModalBtns.length && addressModal) {
      closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          addressModal.style.display = 'none';
          addressModal.setAttribute('aria-hidden', 'true');
        });
      });
    }

    if (saveAddressBtn && addressModal && addAddressBtn) {
      saveAddressBtn.addEventListener('click', () => {
        const getVal = name => (addressModal.querySelector(`input[name="${name}"]`) || {}).value || '';
        const street = getVal('street');
        const city = getVal('city');
        const state = getVal('state');
        const postal = getVal('postal');
        const country = getVal('country');

        if (!street || !city || !state || !postal || !country) {
          alert('Please fill all address fields.');
          return;
        }

        addAddressBtn.insertAdjacentHTML('beforebegin', `
          <p class="saved-address">${street}, ${city}, ${state}, ${postal}, ${country}</p>
        `);

        addressModal.style.display = 'none';
        addressModal.setAttribute('aria-hidden', 'true');
        addressModal.querySelectorAll('input').forEach(input => input.value = '');
      });
    }

    // ------------------ Form Submission ------------------
    const regForm = document.getElementById('firstYearForm');

    if (regForm) {
      regForm.addEventListener('submit', evt => {
        evt.preventDefault();

        const formData = new FormData(regForm);
        const email = (formData.get('email') || '').toString().trim();
        const email2 = (formData.get('email2') || '').toString().trim();
        const password = formData.get('password') || '';
        const password2 = formData.get('password2') || '';
        const agree = formData.get('agree');

        // Basic validations
        if (email !== email2) {
          alert('Email addresses do not match.');
          return;
        }

        if (password !== password2) {
          alert('Passwords do not match.');
          return;
        }

        if (!agree) {
          alert('You must agree to the terms.');
          return;
        }

        // POST to server register endpoint
        const payload = {
          email,
          password,
          name: formData.get('name') || '',
          role: 'student'
        };

        fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).then(async res => {
          if (res.status === 201) {
            const data = await res.json();
            // store minimal user and redirect to home (or auto-login)
            const user = { id: data.id, email: data.email, name: data.name, role: data.role };
            localStorage.setItem('user', JSON.stringify(user));
            alert('Account created successfully! Redirecting to home...');
            window.location.href = 'index.html';
          } else {
            const err = await res.json().catch(()=>({message:'Registration failed'}));
            alert(err.message || 'Registration failed');
          }
        }).catch(err => {
          console.error('register error', err);
          alert('Registration failed — please try again later.');
        });
      });
    }

    // ------------------ Clear Radio Choice ------------------
    const clearChoiceBtn = document.querySelector('.clear-choice');
    if (clearChoiceBtn && regForm) {
      clearChoiceBtn.addEventListener('click', () => {
        regForm.querySelectorAll('input[name="year_type"]').forEach(r => r.checked = false);
      });
    }

  } catch (err) {
    console.error('firstyear_signup initialization failed:', err);
  }
});
