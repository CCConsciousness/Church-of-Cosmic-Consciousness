const installButton = document.getElementById('install');
const installHelp = document.getElementById('install-help');
let installRequest;
function markInstalled() {
  installRequest = null;
  installButton.textContent = 'App installed';
  installButton.disabled = true;
  installHelp.hidden = true;
}
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  installRequest = event;
  installHelp.hidden = true;
});
window.addEventListener('appinstalled', markInstalled);
if (matchMedia('(display-mode: standalone)').matches) markInstalled();
installButton.addEventListener('click', async () => {
  if (!installRequest) {
    installHelp.hidden = false;
    return;
  }
  const request = installRequest;
  installRequest = null;
  try {
    await request.prompt();
    await request.userChoice;
  } catch {
    installHelp.hidden = false;
  }
});
