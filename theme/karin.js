// Randomize the final list and then duplicate items for seamless scrolling
document.addEventListener('DOMContentLoaded', () => {
    const lists = document.querySelectorAll('.scrolling-list');
    if (!lists || lists.length === 0) return;

    lists.forEach((list) => {
        const items = Array.from(list.children);
        if (!items.length) return;

        // Find the item that must stay first
        const pinned = items.find(
            (li) => li.textContent.trim().toLowerCase() === 'project manager'
        );

        // Separate others and shuffle them
        const others = pinned ? items.filter((li) => li !== pinned) : items.slice();

        for (let i = others.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [others[i], others[j]] = [others[j], others[i]];
        }

        const finalOrder = pinned ? [pinned, ...others] : others;

        // Reorder DOM to the final order
        finalOrder.forEach((item) => list.appendChild(item));

        // Then duplicate each item to allow continuous scroll animation
        finalOrder.forEach((item) => list.appendChild(item.cloneNode(true)));
    });

    // After everything is ready, wait 2s after full window load before starting animation
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.querySelectorAll('.scrolling-list').forEach((ul) => {
                ul.style.animationPlayState = 'running';
            });
        }, 1500);
    });
});