// Minimal client-side handler used by the three registration pages.
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('regForm');
  if (!form) return;

  // Clear-choice buttons: allow users to clear selected radio options inside the same radio-block
  document.querySelectorAll('.clear-choice').forEach(btn => {
    btn.addEventListener('click', function () {
      const block = btn.closest('.radio-block');
      if (!block) return;
      block.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
      // For accessibility, return focus to the first radio option (if present)
      const first = block.querySelector('input[type="radio"]');
      if (first) first.focus();
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const payload = {};
    for (const [k, v] of data.entries()) payload[k] = v;

    // For this static demo, show an in-page success message.
    const card = form.closest('.form-card');
    const msg = document.createElement('div');
    msg.className = 'success';
    msg.innerHTML = `<strong>Thanks!</strong> We've received your submission.`;
    card.appendChild(msg);

    // Disable the form to prevent duplicate submits
    form.querySelectorAll('input, select, button').forEach(el => el.disabled = true);

    // Log to console for developer debugging.
    console.log('Form submitted (client-only):', payload);
  });
});
