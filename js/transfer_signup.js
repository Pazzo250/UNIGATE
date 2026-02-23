document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('transferRegForm');
  if(!form) return;
  form.addEventListener('submit', async (evt)=>{
    evt.preventDefault();
    const fd = new FormData(form);
    const email = (fd.get('email')||'').toString().trim();
    const password = fd.get('password')||'';
    const confirm = fd.get('confirm_password')||'';
    if(!email || !password) { alert('Email and password required'); return; }
    if(password !== confirm){ alert('Passwords do not match'); return; }

    const payload = { email, password, name: fd.get('full_name')||'', role: 'student' };
    try{
      const res = await fetch('/api/auth/register', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) });
      if(res.status===201){
        const data = await res.json();
        localStorage.setItem('user', JSON.stringify({ id:data.id, email:data.email, name:data.name, role:data.role }));
        alert('Registration successful — redirecting to home');
        window.location.href = 'index.html';
      } else {
        const err = await res.json().catch(()=>({message:'Registration failed'}));
        alert(err.message || 'Registration failed');
      }
    }catch(e){ console.error(e); alert('Registration failed — server error'); }
  });
});
