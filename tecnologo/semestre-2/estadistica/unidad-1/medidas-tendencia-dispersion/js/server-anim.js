document.addEventListener('DOMContentLoaded', function () {
    const dataA = [128, 130, 129, 131, 132, 130];
    const dataB = [80, 195, 100, 170, 60, 175];

    function renderBars(containerId, data, color) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        const max = 220;
        data.forEach((v, i) => {
            const bar = document.createElement('div');
            bar.className = 'bar-item';
            bar.style.backgroundColor = color;
            bar.style.height = '0px';
            bar.innerHTML = `<span class="bar-label">${v}</span>`;
            container.appendChild(bar);
            setTimeout(() => {
                bar.style.height = (v / max * 140) + 'px';
            }, 60 * i + 50);
        });
    }

    document.getElementById('animate-servers-btn')?.addEventListener('click', function () {
        renderBars('bars-server-a', dataA, '#15803d');
        renderBars('bars-server-b', dataB, '#dc2626');
        document.getElementById('servers-result').classList.remove('hidden');
    });
});
