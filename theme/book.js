"use strict";

// Fix back button cache problem
window.onunload = function () { };

(function sidebar() {
    var body = document.querySelector("body");
    var sidebar = document.getElementById("sidebar");
    var sidebarLinks = document.querySelectorAll('#sidebar a');
    var sidebarToggleButton = document.getElementById("sidebar-toggle");
    var sidebarResizeHandle = document.getElementById("sidebar-resize-handle");
    var firstContact = null;

    function showSidebar() {
        body.classList.remove('sidebar-hidden')
        body.classList.add('sidebar-visible');
        Array.from(sidebarLinks).forEach(function (link) {
            link.setAttribute('tabIndex', 0);
        });
        sidebarToggleButton.setAttribute('aria-expanded', true);
        sidebar.setAttribute('aria-hidden', false);
        try { localStorage.setItem('mdbook-sidebar', 'visible'); } catch (e) { }
    }

    function hideSidebar() {
        body.classList.remove('sidebar-visible')
        body.classList.add('sidebar-hidden');
        Array.from(sidebarLinks).forEach(function (link) {
            link.setAttribute('tabIndex', -1);
        });
        sidebarToggleButton.setAttribute('aria-expanded', false);
        sidebar.setAttribute('aria-hidden', true);
        try { localStorage.setItem('mdbook-sidebar', 'hidden'); } catch (e) { }
    }

    // Toggle sidebar
    sidebarToggleButton.addEventListener('click', function sidebarToggle() {
        if (body.classList.contains("sidebar-hidden")) {
            var current_width = parseInt(
                document.documentElement.style.getPropertyValue('--sidebar-width'), 10);
            if (current_width < 150) {
                document.documentElement.style.setProperty('--sidebar-width', '150px');
            }
            showSidebar();
        } else if (body.classList.contains("sidebar-visible")) {
            hideSidebar();
        } else {
            if (getComputedStyle(sidebar)['transform'] === 'none') {
                hideSidebar();
            } else {
                showSidebar();
            }
        }
    });

    sidebarResizeHandle.addEventListener('mousedown', initResize, false);

    function initResize(e) {
        window.addEventListener('mousemove', resize, false);
        window.addEventListener('mouseup', stopResize, false);
        body.classList.add('sidebar-resizing');
    }
    function resize(e) {
        var pos = (e.clientX - sidebar.offsetLeft);
        if (pos < 20) {
            hideSidebar();
        } else {
            if (body.classList.contains("sidebar-hidden")) {
                showSidebar();
            }
            pos = Math.min(pos, window.innerWidth - 100);
            document.documentElement.style.setProperty('--sidebar-width', pos + 'px');
        }
    }
    //on mouseup remove windows functions mousemove & mouseup
    function stopResize(e) {
        body.classList.remove('sidebar-resizing');
        window.removeEventListener('mousemove', resize, false);
        window.removeEventListener('mouseup', stopResize, false);
    }

    document.addEventListener('touchstart', function (e) {
        firstContact = {
            x: e.touches[0].clientX,
            time: Date.now()
        };
    }, { passive: true });

    document.addEventListener('touchmove', function (e) {
        if (!firstContact)
            return;

        var curX = e.touches[0].clientX;
        var xDiff = curX - firstContact.x,
            tDiff = Date.now() - firstContact.time;

        if (tDiff < 250 && Math.abs(xDiff) >= 150) {
            if (xDiff >= 0 && firstContact.x < Math.min(document.body.clientWidth * 0.25, 300))
                showSidebar();
            else if (xDiff < 0 && curX < 300)
                hideSidebar();

            firstContact = null;
        }
    }, { passive: true });
})();

(function chapterNavigation() {
    document.addEventListener('keydown', function (e) {
        if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) { return; }
        if (window.search && window.search.hasFocus()) { return; }
        var html = document.querySelector('html');

        function next() {
            var nextButton = document.querySelector('.nav-chapters.next');
            if (nextButton) {
                window.location.href = nextButton.href;
            }
        }
        function prev() {
            var previousButton = document.querySelector('.nav-chapters.previous');
            if (previousButton) {
                window.location.href = previousButton.href;
            }
        }
        switch (e.key) {
            case 'ArrowRight':
                e.preventDefault();
                if (html.dir == 'rtl') {
                    prev();
                } else {
                    next();
                }
                break;
            case 'ArrowLeft':
                e.preventDefault();
                if (html.dir == 'rtl') {
                    next();
                } else {
                    prev();
                }
                break;
        }
    });
})();

(function scrollToTop () {
    var menuTitle = document.querySelector('.menu-title');

    menuTitle.addEventListener('click', function () {
        document.scrollingElement.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

(function controllMenu() {
    var menu = document.getElementById('menu-bar');

    (function controllPosition() {
        var scrollTop = document.scrollingElement.scrollTop;
        var prevScrollTop = scrollTop;
        var minMenuY = -menu.clientHeight - 50;
        // When the script loads, the page can be at any scroll (e.g. if you reforesh it).
        menu.style.top = scrollTop + 'px';
        // Same as parseInt(menu.style.top.slice(0, -2), but faster
        var topCache = menu.style.top.slice(0, -2);
        menu.classList.remove('sticky');
        var stickyCache = false; // Same as menu.classList.contains('sticky'), but faster
        document.addEventListener('scroll', function () {
            scrollTop = Math.max(document.scrollingElement.scrollTop, 0);
            // `null` means that it doesn't need to be updated
            var nextSticky = null;
            var nextTop = null;
            var scrollDown = scrollTop > prevScrollTop;
            var menuPosAbsoluteY = topCache - scrollTop;
            if (scrollDown) {
                nextSticky = false;
                if (menuPosAbsoluteY > 0) {
                    nextTop = prevScrollTop;
                }
            } else {
                if (menuPosAbsoluteY > 0) {
                    nextSticky = true;
                } else if (menuPosAbsoluteY < minMenuY) {
                    nextTop = prevScrollTop + minMenuY;
                }
            }
            if (nextSticky === true && stickyCache === false) {
                menu.classList.add('sticky');
                stickyCache = true;
            } else if (nextSticky === false && stickyCache === true) {
                menu.classList.remove('sticky');
                stickyCache = false;
            }
            if (nextTop !== null) {
                menu.style.top = nextTop + 'px';
                topCache = nextTop;
            }
            prevScrollTop = scrollTop;
        }, { passive: true });
    })();
    (function controllBorder() {
        function updateBorder() {
            if (menu.offsetTop === 0) {
                menu.classList.remove('bordered');
            } else {
                menu.classList.add('bordered');
            }
        }
        updateBorder();
        document.addEventListener('scroll', updateBorder, { passive: true });
    })();
})();

// Custom TOC toggle for Genesys chapters
setTimeout(() => {
    const sidebar = document.querySelector('mdbook-sidebar-scrollbox');
    if (!sidebar) return;

    const ol = sidebar.querySelector('ol.chapter');
    if (!ol) return;

    // Renumber visible top-level chapters consecutively
    function renumberChapters() {
        let count = 1;
        for (const li of ol.children) {
            const strong = li.classList.contains('chapter-item') && 
                          li.style.display !== 'none' && 
                          !li.classList.contains('keep-chapter')
                ? li.querySelector('a strong') 
                : null;
            if (strong) {
                strong.textContent = count + '.';
                count++;
            }
        }
    }

    // Create filter dropdown
    const filterContainer = document.createElement('div');
    filterContainer.className = 'chapter-filter-container';
    filterContainer.innerHTML = `
        <div class="chapter-filter-header">
            <svg class="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>
            </svg>
            <span>Filter Combos</span>
            <span class="filter-arrow">▼</span>
        </div>
        <div class="chapter-filter-options">
            <div class="filter-option">
                <input type="checkbox" id="filter-genesys">
                <label for="filter-genesys">Only Genesys-compatible combos</label>
            </div>
        </div>
    `;
    ol.parentNode.insertBefore(filterContainer, ol);

    const filterHeader = filterContainer.querySelector('.chapter-filter-header');
    const filterOptions = filterContainer.querySelector('.chapter-filter-options');
    const filterArrow = filterContainer.querySelector('.filter-arrow');
    const genesysCheckbox = filterContainer.querySelector('#filter-genesys');

    // Toggle dropdown
    filterHeader.addEventListener('click', () => {
        filterOptions.classList.toggle('expanded');
        filterArrow.classList.toggle('expanded');
    });

    // Find and modify chapters with $Genesys$ and $keep$
    ol.querySelectorAll('li.chapter-item').forEach(li => {
        const a = li.querySelector('a');
        if (a && a.textContent.includes('$Genesys$')) {
            const strong = a.querySelector('strong');
            const numberText = strong ? strong.textContent : '';
            const titleText = a.textContent.replace('$Genesys$', '').trim().replace(/^\d+\.\s*/, '');
            a.innerHTML = `<strong aria-hidden="true">${numberText}</strong> ${titleText}`;
            li.classList.add('genesys-chapter');
        } else if (a && a.textContent.includes('$keep$')) {
            const strong = a.querySelector('strong');
            const numberText = strong ? strong.textContent : '';
            const titleText = a.textContent.replace('$keep$', '').trim().replace(/^\d+\.\s*/, '');
            a.innerHTML = `<strong aria-hidden="true">${numberText}</strong> ${titleText}`;
            li.classList.add('keep-chapter');
        } else {
            li.classList.add('non-genesys-chapter');
        }
    });

    // Hide $Genesys$ from combo dropdown options
    document.querySelectorAll('select#comboDropdown option').forEach(option => {
        if (option.textContent.includes('$Genesys$')) {
            option.dataset.hasGenesys = 'true';
            option.textContent = option.textContent.replace('$Genesys$', '').trim();
        }
    });

    // Remove tags from page title
    document.title = document.title.replace(/\$keep\$|\$Genesys\$/g, '').trim();

    // Function to apply filter state
    function applyFilterState(showOnlyGenesys) {
        if (showOnlyGenesys) {
            // Hide all non-Genesys chapters (except keep-chapter) and their sub-chapters
            ol.querySelectorAll('li.non-genesys-chapter').forEach(li => {
                if (!li.classList.contains('keep-chapter')) {
                    li.style.display = 'none';
                    // Hide sub-chapters if present
                    let next = li.nextElementSibling;
                    while (next && !next.querySelector('ol')) next = next.nextElementSibling;
                    if (next) next.style.display = 'none';
                }
            });
            
            // Hide part titles that have no visible chapters
            ol.querySelectorAll('li.part-title').forEach(partTitle => {
                let hasVisibleChapters = false;
                let next = partTitle.nextElementSibling;
                
                while (next && !next.classList.contains('part-title')) {
                    if (next.classList.contains('chapter-item') && 
                        next.style.display !== 'none' && 
                        !next.classList.contains('keep-chapter')) {
                        hasVisibleChapters = true;
                        break;
                    }
                    next = next.nextElementSibling;
                }
                
                partTitle.style.display = hasVisibleChapters ? '' : 'none';
            });
        } else {
            // Show all chapters and part titles
            ol.querySelectorAll('li').forEach(li => {
                li.style.display = '';
            });
        }
        renumberChapters();
        
    // Filter combo dropdown options
    document.querySelectorAll('select#comboDropdown').forEach(select => {
        if (showOnlyGenesys) {
            // Remove options without genesys
            const optionsToRemove = [];
            select.querySelectorAll('option').forEach(option => {
                if (!option.dataset.hasGenesys) {
                    optionsToRemove.push(option);
                }
            });
            optionsToRemove.forEach(option => {
                if (!select._removedOptions) select._removedOptions = [];
                select._removedOptions.push({option, parent: option.parentNode, nextSibling: option.nextSibling});
                option.remove();
            });
            // Remove optgroups with no options
            select.querySelectorAll('optgroup').forEach(optgroup => {
                if (optgroup.querySelectorAll('option').length === 0) {
                    if (!select._removedOptgroups) select._removedOptgroups = [];
                    select._removedOptgroups.push({optgroup, nextSibling: optgroup.nextSibling});
                    optgroup.remove();
                }
            });
        } else {
            // Add back optgroups first
            if (select._removedOptgroups) {
                select._removedOptgroups.forEach(({optgroup, nextSibling}) => {
                    if (nextSibling) {
                        select.insertBefore(optgroup, nextSibling);
                    } else {
                        select.appendChild(optgroup);
                    }
                });
                select._removedOptgroups = [];
            }
            // Add back options
            if (select._removedOptions) {
                select._removedOptions.forEach(({option, parent, nextSibling}) => {
                    if (nextSibling) {
                        parent.insertBefore(option, nextSibling);
                    } else {
                        parent.appendChild(option);
                    }
                });
                select._removedOptions = [];
            }
        }
    });
    }

    // Restore filter state from sessionStorage
    const savedState = sessionStorage.getItem('genesys-filter');
    if (savedState === 'only') {
        genesysCheckbox.checked = true;
        applyFilterState(true);
    }
    updateFilterIndicator();
    
    // Make sidebar visible after filtering is applied
    document.documentElement.style.removeProperty('--sidebar-visibility');

    // Function to update filter indicator
    function updateFilterIndicator() {
        const activeFilters = filterOptions.querySelectorAll('input[type="checkbox"]:checked').length;
        const labelSpan = filterHeader.querySelector('span');
        labelSpan.textContent = activeFilters > 0 ? `Filter Combos (${activeFilters})` : 'Filter Combos';
        filterHeader.classList.toggle('active', activeFilters > 0);
    }

    // Handle checkbox change
    genesysCheckbox.addEventListener('change', () => {
        const showOnlyGenesys = genesysCheckbox.checked;
        sessionStorage.setItem('genesys-filter', showOnlyGenesys ? 'only' : 'all');
        applyFilterState(showOnlyGenesys);
        updateFilterIndicator();
    });
}, 100);
