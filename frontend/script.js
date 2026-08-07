// ============================================================
// REPLACE the placeholder below with your real EC2 public IP
// after deployment, e.g.: http://54.123.45.67:3000
// ============================================================
const BACKEND_URL = 'http://EC2-PUBLIC-IP:3000';

const btn       = document.getElementById('callApiBtn');
const resultBox = document.getElementById('result');
const errorBox  = document.getElementById('error');
const msgEl     = document.getElementById('message');
const tsEl      = document.getElementById('timestamp');

btn.addEventListener('click', async () => {
  // Reset UI
  resultBox.classList.add('hidden');
  errorBox.classList.add('hidden');
  btn.disabled = true;
  btn.textContent = 'Calling…';

  try {
    const response = await fetch(`${BACKEND_URL}/api/message`);

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();

    msgEl.textContent = data.message;
    tsEl.textContent  = new Date(data.timestamp).toLocaleString();
    resultBox.classList.remove('hidden');

  } catch (err) {
    errorBox.textContent = `Error: ${err.message}. Make sure the EC2 backend is running and BACKEND_URL is set correctly.`;
    errorBox.classList.remove('hidden');

  } finally {
    btn.disabled = false;
    btn.textContent = 'Call API';
  }
});
