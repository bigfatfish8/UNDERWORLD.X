// upload.js

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const consoleLog = document.getElementById('consoleLog');

// Simple logger
function log(msg, color='#0f0') {
  const line = document.createElement('div');
  line.textContent = msg;
  line.style.color = color;
  line.className = 'log-line';
  consoleLog.appendChild(line);
  consoleLog.scrollTop = consoleLog.scrollHeight;
}

// Handle file upload simulation
function handleFile(file) {
  log(`[INFO] File selected: ${file.name}`);
  setTimeout(() => log('[INFO] Upload started…'), 500);
  let pct = 0;
  const interval = setInterval(() => {
    pct += 25;
    log(`[INFO] Uploading… ${pct}%`);
    if (pct >= 100) {
      clearInterval(interval);
      log('[OK] Upload complete!', '#0ff');
    }
  }, 400);
}

// Drag & Drop
dropZone.addEventListener('dragover', e => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});
dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});
dropZone.addEventListener('drop', e => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file) handleFile(file);
});

// Browse button
browseBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) handleFile(file);
});

// (Profile form can be handled similarly in JS when ready)
