document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.sg-tab');
    const contents = document.querySelectorAll('.sg-tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.classList.remove('active', 'font-bold', 'text-slate-800', 'border-green-500');
                t.classList.add('font-medium', 'text-slate-500', 'border-transparent');
            });

            tab.classList.add('active', 'font-bold', 'text-slate-800', 'border-green-500');
            tab.classList.remove('font-medium', 'text-slate-500', 'border-transparent');

            contents.forEach(content => {
                content.classList.remove('block', 'opacity-100');
                content.classList.add('hidden', 'opacity-0');
            });

            const targetId = tab.getAttribute('data-sg-target');
            const targetContent = document.getElementById(targetId);
            if(targetContent) {
                targetContent.classList.remove('hidden');
                setTimeout(() => {
                    targetContent.classList.remove('opacity-0');
                    targetContent.classList.add('block', 'opacity-100');
                }, 50);
            }
        });
    });
});
