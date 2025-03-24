document
    .getElementById('comboDropdown')
    .addEventListener('change', function () {
        'use strict';
        var vis = document.querySelector('.vis'),
            target = document.getElementById(this.value);
        if (vis !== null) {
            vis.className = 'inv';
        }
        if (target !== null) {
            target.className = 'vis';
        }
    });