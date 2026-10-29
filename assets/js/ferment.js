(function () {
  var el = document.querySelector('.daycount[data-started]');
  if (!el) return;
  var hide = function () { el.parentNode.classList.add('no-day'); };
  var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(el.getAttribute('data-started'));
  if (!m) return hide();
  var start = new Date(+m[1], +m[2] - 1, +m[3]);
  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var days = Math.round((today - start) / 86400000);
  if (days < 0) return hide();
  el.textContent = 'Day ' + (days + 1);
})();
