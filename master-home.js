(() => {
  if (document.getElementById('master-home-orb')) return;
  const home = document.createElement('a');
  home.id = 'master-home-orb';
  home.href = 'https://ccconsciousness.github.io/Church-of-Cosmic-Consciousness/young-masters/';
  home.title = 'Young Master’s Board Games homepage';
  home.setAttribute('aria-label', home.title);
  home.style.cssText = 'position:fixed;z-index:2147483646;width:44px;height:44px;display:grid;place-items:center;text-decoration:none;border-radius:50%;padding:0;background:transparent;border:0';
  const orb = document.createElement('span');
  orb.setAttribute('aria-hidden','true');
  orb.textContent = '⌂';
  orb.style.cssText = 'display:grid;place-items:center;box-sizing:border-box;width:27px;height:27px;border:2px solid #dfbb67;border-radius:50%;background:radial-gradient(circle at 30% 22%,#b6ddb4,#37775f 35%,#0c3129 76%);color:#fff6cc;font:bold 18px/1 Georgia,serif;box-shadow:inset 0 1px 2px #fff9,0 3px 4px #0008';
  home.append(orb);
  document.body.append(home);
  function place() {
    const left = Math.random() < 0.5;
    home.style.left = left ? 'env(safe-area-inset-left,0px)' : 'auto';
    home.style.right = left ? 'auto' : 'env(safe-area-inset-right,0px)';
    home.style.top = (12 + Math.random()*65) + '%';
  }
  place();
  window.addEventListener('hashchange', place);
  window.addEventListener('popstate', place);
})();