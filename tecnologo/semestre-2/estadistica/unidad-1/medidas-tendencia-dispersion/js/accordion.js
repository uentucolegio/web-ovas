document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.accordion-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const target = document.querySelector(this.dataset.target);
            if (!target) return;
            const isOpen = this.classList.contains('open');
            document.querySelectorAll('.accordion-panel').forEach(p => { p.style.maxHeight = null; });
            document.querySelectorAll('.accordion-btn').forEach(b => b.classList.remove('open'));
            if (!isOpen) {
                this.classList.add('open');
                target.style.maxHeight = target.scrollHeight + 'px';
            }
        });
    });
});
