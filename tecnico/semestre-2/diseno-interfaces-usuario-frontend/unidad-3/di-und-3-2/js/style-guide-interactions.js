document.addEventListener('DOMContentLoaded', () => {
    const flipContainer = document.querySelector('.sg-flip-container');
    if (flipContainer) {
        flipContainer.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    }

    const chartBars = document.querySelectorAll('.sg-chart-bar');
    const infoCards = document.querySelectorAll('.sg-chart-info > div');

    chartBars.forEach(bar => {
        bar.addEventListener('mouseenter', () => {
            const targetId = bar.getAttribute('data-target-info');
            
            chartBars.forEach(b => {
                if(b !== bar) b.style.opacity = '0.5';
            });
            bar.style.opacity = '1';

            infoCards.forEach(card => {
                card.classList.remove('active');
                if(card.id === targetId) {
                    card.classList.add('active');
                }
            });
        });

        bar.addEventListener('mouseleave', () => {
            chartBars.forEach(b => b.style.opacity = '1');
            infoCards.forEach(card => card.classList.remove('active'));
        });
    });
});
