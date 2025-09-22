#!/bin/sh
set -eu

curl -Lo mdbook.tar.gz https://github.com/rust-lang/mdBook/releases/download/v0.4.43/mdbook-v0.4.43-x86_64-unknown-linux-musl.tar.gz
tar -xvzf mdbook.tar.gz

# Determine branch name from Vercel or git as a fallback
BRANCH_NAME="${VERCEL_GIT_COMMIT_REF:-}"
if [ -z "$BRANCH_NAME" ] && command -v git >/dev/null 2>&1; then
	BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
fi

# If this is the testing branch, generate a head partial that injects a banner
if [ "$BRANCH_NAME" = "testing" ]; then
	mkdir -p theme
	cat > theme/head.hbs <<'EOF'
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
			// Insert near the top of the sidebar
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
fi

./mdbook build