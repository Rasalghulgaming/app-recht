// Existing store and in-app URLs can point into a collapsed legal document.
function revealLinkedDocument() {
  let id;
  try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  const disclosure = target.closest('details') || target.querySelector('details');
  if (disclosure) {
    disclosure.open = true;
    requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }));
  }
}
window.addEventListener('hashchange', revealLinkedDocument);
revealLinkedDocument();
