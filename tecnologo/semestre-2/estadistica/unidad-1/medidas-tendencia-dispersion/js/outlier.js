document.addEventListener('DOMContentLoaded', function () {
    const base = [120, 135, 128, 142, 130, 125, 138, 122];

    function calcular() {
        const slider = document.getElementById('outlier-slider');
        const valor = parseInt(slider.value);
        document.getElementById('outlier-valor').textContent = valor;

        const datos = base.concat([valor]);
        const n = datos.length;
        const media = datos.reduce((a, b) => a + b, 0) / n;

        const ordenados = datos.slice().sort((a, b) => a - b);
        const mediana = ordenados[(n - 1) / 2];

        document.getElementById('outlier-media').textContent = media.toFixed(1) + ' ms';
        document.getElementById('outlier-mediana').textContent = mediana.toFixed(1) + ' ms';

        const despMedia = Math.abs(media - 130);
        const despMediana = Math.abs(mediana - 130);
        document.getElementById('outlier-media-bar').style.width = Math.min(despMedia, 100) + '%';
        document.getElementById('outlier-mediana-bar').style.width = Math.min(despMediana, 100) + '%';

        document.getElementById('outlier-conclusion').textContent =
            despMedia > despMediana + 3
                ? 'La media se movió mucho más que la mediana: el dato está distorsionando el promedio.'
                : 'Con este valor, ambas medidas se mantienen relativamente cercanas a 130 ms.';
    }

    document.getElementById('outlier-slider')?.addEventListener('input', calcular);
    if (document.getElementById('outlier-slider')) calcular();
});