#!/usr/bin/env bash
set -eu

# Local dev helper: show the testing banner while running `mdbook serve`.
# This mirrors the Vercel build behavior without requiring the Vercel env.

mkdir -p "$(dirname "$0")/../theme"
cat > "$(dirname "$0")/../theme/head.hbs" <<'EOF'
<script>
  // Insert a testing build notice into the sidebar as early as possible
  document.addEventListener('DOMContentLoaded', function () {
    try {
      var sidebar = document.getElementById('sidebar');
      if (!sidebar) return;
      var box = document.createElement('div');
      box.className = 'testing-banner';
      box.setAttribute('role', 'note');
      box.textContent = 'You are viewing a testing build. Content and layout may change.';
      var scrollbox = sidebar.querySelector('.sidebar-scrollbox');
      if (scrollbox) {
        scrollbox.insertAdjacentElement('afterbegin', box);
      } else {
        sidebar.insertAdjacentElement('afterbegin', box);
      }
    } catch (e) { /* no-op */ }
  });
</script>
EOF

cd "$(dirname "$0")/.."
exec mdbook serve --open
