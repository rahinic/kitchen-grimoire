(function () {
  var key = 'grimoire:' + location.pathname;
  function load() { try { return JSON.parse(localStorage.getItem(key)) || {}; } catch (e) { return {}; } }
  function save(s) { try { localStorage.setItem(key, JSON.stringify(s)); } catch (e) {} }
  var state = load(); state.ing = state.ing || []; state.steps = state.steps || [];

  // ingredient checklist (remembered on this device)
  var boxes = document.querySelectorAll('.checklist input');
  boxes.forEach(function (b, i) {
    b.checked = state.ing.indexOf(i) > -1;
    b.addEventListener('change', function () {
      state.ing = [].slice.call(boxes).map(function (x, j) { return x.checked ? j : -1; }).filter(function (j) { return j > -1; });
      save(state);
    });
  });

  // tap a step to mark it done
  var steps = [].slice.call(document.querySelectorAll('.steps li'));
  steps.forEach(function (li, i) {
    if (state.steps.indexOf(i) > -1) li.classList.add('done');
    li.addEventListener('click', function () {
      li.classList.toggle('done');
      state.steps = steps.map(function (x, j) { return x.classList.contains('done') ? j : -1; }).filter(function (j) { return j > -1; });
      save(state);
    });
  });

  // leaflet tabs
  var img = document.querySelector('.leaflet img'), link = document.querySelector('.leaflet-link');
  document.querySelectorAll('.leaflet-tabs button').forEach(function (btn, _, all) {
    btn.addEventListener('click', function () {
      all.forEach(function (b) { b.classList.remove('on'); });
      btn.classList.add('on'); img.src = btn.dataset.src; link.href = btn.dataset.src;
    });
  });

  // cook mode: one big step at a time, screen stays awake
  var overlay = document.querySelector('.cookmode');
  if (!overlay || !steps.length) return;
  var text = overlay.querySelector('.cm-step'), count = overlay.querySelector('.cm-count'),
      prev = overlay.querySelector('.cm-prev'), next = overlay.querySelector('.cm-next'), i = 0, lock = null;
  function show() {
    count.textContent = 'Step ' + (i + 1) + ' of ' + steps.length;
    text.textContent = steps[i].textContent.trim();
    prev.disabled = i === 0;
    next.textContent = i === steps.length - 1 ? 'Done ✓' : 'Next →';
  }
  function open() {
    i = 0; show(); overlay.hidden = false; document.body.style.overflow = 'hidden';
    if ('wakeLock' in navigator) navigator.wakeLock.request('screen').then(function (l) { lock = l; }).catch(function () {});
  }
  function close() {
    overlay.hidden = true; document.body.style.overflow = '';
    if (lock) { lock.release().catch(function () {}); lock = null; }
  }
  document.querySelector('.cookmode-btn').addEventListener('click', open);
  overlay.querySelector('.cm-close').addEventListener('click', close);
  prev.addEventListener('click', function () { if (i > 0) { i--; show(); } });
  next.addEventListener('click', function () { if (i < steps.length - 1) { i++; show(); } else close(); });
  document.addEventListener('keydown', function (e) {
    if (overlay.hidden) return;
    if (e.key === 'ArrowRight') next.click();
    if (e.key === 'ArrowLeft') prev.click();
    if (e.key === 'Escape') close();
  });
})();
