/* =========================================================
   Piloto OVA en diapositivas · Bucles iterativos
   Reveal.js (diapositivas) + GSAP (animación)
   ========================================================= */
(() => {
    'use strict';

    const MOVIMIENTO = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.registerPlugin(MotionPathPlugin);
    // Sin movimiento: todas las animaciones terminan de inmediato.
    if (!MOVIMIENTO) gsap.globalTimeline.timeScale(1000);

    const $ = (sel, raiz = document) => raiz.querySelector(sel);
    const $$ = (sel, raiz = document) => [...raiz.querySelectorAll(sel)];

    /* =====================================================
       ESTADO Y GAMIFICACIÓN (XP, descubrimientos, insignias)
       ===================================================== */
    const CLAVE = 'piloto-bucles-iterativos-v1';
    const XP_MAX = 160;
    const DESCUBRIMIENTOS = ['formas', 'para', 'escalera', 'mientras', 'repetir', 'comparar', 'arbol'];
    const DESC_CUENTAN = 6; // 'formas' es solo de visita; cuentan los 6 interactivos
    const nuevoEstado = () => ({ xp: 0, misiones: {}, descubrimientos: {}, insignias: {} });
    const estado = (() => {
        try { return Object.assign(nuevoEstado(), JSON.parse(localStorage.getItem(CLAVE)) || {}); }
        catch { return nuevoEstado(); }
    })();
    const guardar = () => { try { localStorage.setItem(CLAVE, JSON.stringify(estado)); } catch { /* sin almacenamiento */ } };

    function cuantosDescubrimientos() {
        return DESCUBRIMIENTOS.filter(d => d !== 'formas' && estado.descubrimientos[d]).length;
    }

    function refrescarProgreso() {
        $$('[data-xp]').forEach(e => { e.textContent = estado.xp; });
        $$('[data-xp-barra]').forEach(e => { e.style.width = Math.min(100, estado.xp / XP_MAX * 100) + '%'; });
        const n = cuantosDescubrimientos();
        $$('[data-desc-cuenta]').forEach(e => { e.textContent = `🔎 Descubrimientos ${n}/${DESC_CUENTAN}`; });
        $$('[data-desc-numero]').forEach(e => { e.textContent = n; });
        $$('[data-insignia]').forEach(e => e.classList.toggle('ganada', !!estado.insignias[e.dataset.insignia]));
        $$('[data-mision-estado]').forEach(e => {
            const id = e.dataset.misionEstado;
            e.classList.toggle('hecha', id === 'desc' ? n === DESC_CUENTAN : !!estado.misiones[id]);
        });
    }

    function celebrar(origen, texto) {
        const r = (origen && origen.getBoundingClientRect) ? origen.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 2, width: 0 };
        const x = r.left + r.width / 2, y = r.top;
        const f = document.createElement('div');
        f.className = 'flotante'; f.textContent = texto;
        f.style.left = x + 'px'; f.style.top = y + 'px';
        document.body.appendChild(f);
        gsap.fromTo(f, { xPercent: -50, y: 0, opacity: 0, scale: .6 },
            { y: -70, opacity: 1, scale: 1, duration: .5, ease: 'back.out(2)', onComplete: () => gsap.to(f, { opacity: 0, y: -110, duration: .6, delay: .5, onComplete: () => f.remove() }) });
        if (!MOVIMIENTO) return;
        const colores = ['#22c55e', '#fbbf24', '#16a34a', '#f59e0b', '#86efac'];
        for (let k = 0; k < 18; k++) {
            const c = document.createElement('div');
            c.className = 'chispa'; c.style.background = colores[k % colores.length];
            c.style.left = x + 'px'; c.style.top = y + 'px';
            document.body.appendChild(c);
            const ang = Math.random() * Math.PI * 2, dist = 60 + Math.random() * 90;
            gsap.to(c, { x: Math.cos(ang) * dist, y: Math.sin(ang) * dist - 30, rotation: Math.random() * 360, opacity: 0, duration: .9 + Math.random() * .4, ease: 'power2.out', onComplete: () => c.remove() });
        }
    }

    function sumarXP(n, origen) { estado.xp += n; guardar(); refrescarProgreso(); celebrar(origen, `+${n} XP`); }

    function ganarInsignia(id, origen) {
        if (estado.insignias[id]) return;
        estado.insignias[id] = true; guardar(); refrescarProgreso();
        setTimeout(() => celebrar(origen, '🏅 ¡Insignia!'), 700);
    }

    function descubrir(id, origen) {
        if (estado.descubrimientos[id]) return;
        estado.descubrimientos[id] = true;
        if (id === 'formas') { guardar(); return; }
        sumarXP(10, origen);
        if (cuantosDescubrimientos() === DESC_CUENTAN) ganarInsignia('explorador', origen);
    }
    document.addEventListener('piloto:descubrir', e => descubrir(e.detail.id, e.detail.origen));

    /* =====================================================
       ANIMACIONES POR DIAPOSITIVA
       ===================================================== */
    let activas = [];                    // líneas de tiempo de la diapositiva visible
    const registrar = tl => { activas.push(tl); return tl; };
    const detenerActivas = () => { activas.forEach(t => t.kill()); activas = []; };

    function animPortada(slide) {
        const ruta = $('#anillo', slide), bola = $('.anillo-bola', slide), numero = $('[data-portada-i]', slide);
        let i = 1; numero.textContent = i;
        registrar(gsap.to(bola, {
            motionPath: { path: ruta, align: ruta, alignOrigin: [0.5, 0.5] },
            duration: 2.4, ease: 'none', repeat: -1,
            onRepeat: () => { i = i >= 9 ? 1 : i + 1; numero.textContent = i; gsap.fromTo(numero, { opacity: .15 }, { opacity: 1, duration: .45, ease: 'power2.out' }); }
        }));
        registrar(gsap.fromTo($('.portada-bucle', slide), { scale: .7, rotation: -40, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: 'back.out(1.6)' }));
    }

    function animUsos(slide) {
        registrar(gsap.fromTo($$('.uso', slide), { scale: .5, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, duration: .6, stagger: .15, ease: 'back.out(1.8)', delay: .2, clearProps: 'transform,opacity' }));
    }

    function animFormas(slide) {
        // Reinicio visual
        $$('.caja, .rombo', slide).forEach(c => c.classList.remove('on'));
        $$('.vaso', slide).forEach(v => v.classList.remove('lleno'));
        const txt = $('[data-iter-txt]', slide); txt.textContent = 'Persona 0 de 5';
        const tl = registrar(gsap.timeline({ delay: .4 }));

        // Secuencial: la ficha baja de caja en caja, una sola vez
        const fs = $('[data-ficha="sec"]', slide);
        gsap.set(fs, { attr: { cy: 24 } });
        [24, 84, 144].forEach((cy, k) => {
            tl.to(fs, { attr: { cy }, duration: k ? .6 : .01, ease: 'power2.inOut' }, k ? '>' : 0)
              .add(() => $(`[data-sec="${k}"]`, slide).classList.add('on'));
        });

        // Condicional: de la pregunta al camino "Sí"
        const fc = $('[data-ficha="cond"]', slide);
        gsap.set(fc, { attr: { cx: 110, cy: 44 } });
        tl.add(() => $('[data-cond="rombo"]', slide).classList.add('on'), 0)
          .to(fc, { attr: { cx: 14 }, duration: .6, ease: 'power1.inOut' }, .5)
          .to(fc, { attr: { cy: 145 }, duration: .6, ease: 'power1.inOut' })
          .to(fc, { attr: { cx: 48 }, duration: .3 })
          .add(() => $('[data-cond="si"]', slide).classList.add('on'));

        // Iterativa: cinco vueltas, un vaso por vuelta
        const fi = $('[data-ficha="iter"]', slide), ruta = $('#ruta-iter', slide), vasos = $$('.vaso', slide);
        vasos.forEach((v, k) => {
            tl.to(fi, { motionPath: { path: ruta, align: ruta, alignOrigin: [0.5, 0.5] }, duration: .9, ease: 'none' }, k ? '>' : 0)
              .add(() => {
                  v.classList.add('lleno');
                  txt.textContent = `Persona ${k + 1} de 5`;
                  gsap.fromTo(v, { scaleY: .2, transformOrigin: '50% 100%' }, { scaleY: 1, duration: .35, ease: 'back.out(2)' });
              });
        });
        tl.add(() => descubrir('formas'));
    }

    function animAnatomia(slide) {
        $$('[data-parte]', slide).forEach(p => p.classList.remove('on'));
    }

    const ANIMACIONES = { portada: animPortada, usos: animUsos, 'tres-formas': animFormas, anatomia: animAnatomia };

    function alEntrar(slide) {
        detenerActivas();
        const entra = $$('.entra', slide);
        // fromTo (y no from): si la animación anterior se cortó a medias, igual termina visible.
        if (entra.length) registrar(gsap.fromTo(entra, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .55, stagger: .09, ease: 'power2.out', clearProps: 'transform,opacity' }));
        const fn = ANIMACIONES[slide.dataset.anim];
        if (fn) fn(slide);
        document.dispatchEvent(new CustomEvent('piloto:diapositiva', { detail: { slide } }));
    }

    /* =====================================================
       VISUALIZADOR PASO A PASO (traza de ejecución)
       ===================================================== */
    const PROGRAMAS = {
        'para-tabla5': {
            lineas: [
                '<span class="kw">Para</span> i ← 1 <span class="kw">Hasta</span> 10 <span class="kw">Con Paso</span> 1 <span class="kw">Hacer</span>',
                '    <span class="kw">Escribir</span> <span class="str">"5 x "</span>, i, <span class="str">" = "</span>, 5 * i',
                '<span class="kw">FinPara</span>'
            ],
            condicion: i => `¿${i} ≤ 10?`,
            pasos() {
                const p = [];
                for (let i = 1; ; i++) {
                    const ok = i <= 10;
                    p.push({ linea: 0, vars: { i }, cond: ok, nota: i === 1 ? 'i empieza en 1. ¿1 ≤ 10? Sí: entra al ciclo.' : (ok ? `El actualizador suma 1: i = ${i}. ¿${i} ≤ 10? Sí.` : 'i = 11. ¿11 ≤ 10? No: el ciclo termina.') });
                    if (!ok) break;
                    p.push({ linea: 1, vars: { i }, salida: `5 x ${i} = ${5 * i}`, vuelta: i, nota: `Vuelta ${i}: escribe 5 x ${i} = ${5 * i}.` });
                }
                p.push({ linea: 2, vars: { i: 11 }, fin: true, nota: '✅ Fin: el ciclo dio exactamente 10 vueltas, como indicaba «Hasta 10».' });
                return p;
            }
        },
        'mientras-1a5': {
            lineas: [
                '<span class="kw">Inicio</span>',
                'i ← 1',
                '<span class="kw">Mientras</span> i &lt;= 5 <span class="kw">Hacer</span>',
                '    <span class="kw">Escribir</span> <span class="str">"Número: "</span>, i',
                '    i ← i + 1',
                '<span class="kw">FinMientras</span>',
                '<span class="kw">Fin</span>'
            ],
            condicion: i => `¿${i} ≤ 5?`,
            pasos() {
                const p = [{ linea: 0, nodo: 'inicio', vars: {}, nota: 'Comienza el algoritmo.' }, { linea: 1, nodo: 'asig', vars: { i: 1 }, nota: 'i toma el valor 1.' }];
                let i = 1;
                for (;;) {
                    const ok = i <= 5;
                    p.push({ linea: 2, nodo: 'cond', vars: { i }, cond: ok, nota: ok ? `¿${i} ≤ 5? Sí: entra al bloque.` : `¿${i} ≤ 5? No: sale del ciclo.` });
                    if (!ok) break;
                    p.push({ linea: 3, nodo: 'cuerpo', vars: { i }, salida: `Número: ${i}`, vuelta: i, nota: `Escribe «Número: ${i}».` });
                    i++;
                    p.push({ linea: 4, nodo: 'incr', vars: { i }, nota: `i aumenta a ${i} y vuelve a la condición.` });
                }
                p.push({ linea: 6, nodo: 'fin', vars: { i }, fin: true, nota: '✅ Fin: con i = 6 la condición fue falsa.' });
                return p;
            }
        }
    };

    class Traza {
        constructor(raiz) {
            this.raiz = raiz;
            this.prog = PROGRAMAS[raiz.dataset.programa];
            this.flujo = raiz.closest('section').querySelector('[data-flujo]');
            this.codigo = $('[data-codigo]', raiz);
            this.codigo.innerHTML = this.prog.lineas.map((l, n) => `<span class="linea" data-n="${n}">${l}</span>`).join('');
            this.temporizador = null;
            $$('[data-traza]', raiz).forEach(b => b.addEventListener('click', () => this[b.dataset.traza]()));
            this.reiniciar();
        }
        reiniciar() {
            this.pausar();
            this.pasos = this.prog.pasos(); this.k = 0;
            $$('.linea', this.codigo).forEach(l => l.classList.remove('activa'));
            $('[data-var="i"]', this.raiz).textContent = '—';
            const c = $('[data-cond]', this.raiz); c.className = ''; c.textContent = this.prog.condicion('i');
            const v = $('[data-vuelta]', this.raiz); if (v) v.textContent = '0';
            $('[data-consola]', this.raiz).innerHTML = '';
            $('[data-nota]', this.raiz).innerHTML = 'Pulsa <b>Paso</b> para ejecutar una instrucción o <b>Reproducir</b> para verlo completo.';
            if (this.flujo) { $$('.nodo', this.flujo).forEach(n => n.classList.remove('on', 'si', 'no')); this.moverFicha('inicio', true); }
            $('[data-traza="paso"]', this.raiz).disabled = false;
        }
        paso() {
            if (this.k >= this.pasos.length) return;
            const s = this.pasos[this.k++];
            $$('.linea', this.codigo).forEach(l => l.classList.toggle('activa', +l.dataset.n === s.linea));
            const linea = $(`.linea[data-n="${s.linea}"]`, this.codigo);
            gsap.fromTo(linea, { x: -6 }, { x: 0, duration: .3, ease: 'power2.out' });
            if (s.vars.i !== undefined) {
                const vi = $('[data-var="i"]', this.raiz);
                if (vi.textContent !== String(s.vars.i)) { vi.textContent = s.vars.i; gsap.fromTo(vi, { scale: 1.8, color: '#f59e0b' }, { scale: 1, color: '#166534', duration: .5, ease: 'back.out(3)' }); }
            }
            const c = $('[data-cond]', this.raiz);
            if (s.cond !== undefined) { c.textContent = `${this.prog.condicion(s.vars.i)} ${s.cond ? '✔' : '✘'}`; c.className = s.cond ? 'si' : 'no'; gsap.fromTo(c, { scale: 1.25 }, { scale: 1, duration: .4 }); }
            if (s.vuelta) { const v = $('[data-vuelta]', this.raiz); if (v) v.textContent = s.vuelta; }
            if (s.salida) {
                const consola = $('[data-consola]', this.raiz);
                const d = document.createElement('div'); d.textContent = '> ' + s.salida; consola.appendChild(d);
                consola.scrollTop = consola.scrollHeight;
                gsap.from(d, { x: 30, opacity: 0, duration: .35, ease: 'power2.out' });
            }
            $('[data-nota]', this.raiz).textContent = s.nota;
            if (this.flujo && s.nodo) this.marcarNodo(s);
            if (s.fin) {
                this.pausar();
                $('[data-traza="paso"]', this.raiz).disabled = true;
                descubrir(this.raiz.dataset.descubrimiento, $('[data-nota]', this.raiz));
            }
        }
        reproducir() {
            if (this.temporizador) { this.pausar(); return; }
            if (this.k >= this.pasos.length) this.reiniciar();
            $('[data-traza="reproducir"]', this.raiz).textContent = '⏸ Pausar';
            this.paso();
            this.temporizador = setInterval(() => this.paso(), MOVIMIENTO ? 750 : 400);
        }
        pausar() {
            clearInterval(this.temporizador); this.temporizador = null;
            const b = $('[data-traza="reproducir"]', this.raiz); if (b) b.textContent = '⏵ Reproducir';
        }
        moverFicha(nodo, inmediato) {
            const n = $(`[data-nodo="${nodo}"]`, this.flujo), f = $('[data-ficha="flujo"]', this.flujo);
            if (!n) return;
            const b = n.getBBox();
            const destino = { cx: b.x + b.width / 2, cy: b.y + b.height / 2 };
            if (inmediato) gsap.set(f, { attr: destino }); else gsap.to(f, { attr: destino, duration: .45, ease: 'power2.inOut' });
        }
        marcarNodo(s) {
            $$('.nodo', this.flujo).forEach(n => n.classList.remove('on', 'si', 'no'));
            const n = $(`[data-nodo="${s.nodo}"]`, this.flujo);
            n.classList.add(s.cond === undefined ? 'on' : (s.cond ? 'si' : 'no'));
            this.moverFicha(s.nodo);
        }
    }
    const trazas = $$('.traza').map(t => new Traza(t));

    /* ---------- Resaltar las partes del ciclo Para con los fragmentos ---------- */
    function resaltarParte(frag, encender) {
        const parte = frag.dataset.resalta; if (!parte) return;
        const span = $(`[data-parte="${parte}"]`, frag.closest('section'));
        if (!span) return;
        span.classList.toggle('on', encender);
        if (encender) gsap.fromTo(span, { scale: 1.25 }, { scale: 1, duration: .5, ease: 'back.out(3)' });
    }

    /* =====================================================
       SIMULADOR: REPETIR MIENTRAS QUE
       ===================================================== */
    const rep = {
        entrada: $('[data-rep-entrada]'), consola: $('[data-rep-consola]'), vueltas: $('[data-rep-vueltas]'), n: 0, listo: false,
        nodo(id, clase) { const e = $(`[data-rnodo="${id}"]`); e.classList.add(clase); setTimeout(() => e.classList.remove(clase), 1100); },
        linea(t) { const d = document.createElement('div'); d.textContent = t; this.consola.appendChild(d); this.consola.scrollTop = this.consola.scrollHeight; gsap.from(d, { x: 30, opacity: 0, duration: .35 }); },
        enviar(boton) {
            if (this.listo) return;
            const v = this.entrada.value.trim();
            if (v === '') { this.entrada.focus(); this.entrada.classList.add('mal'); return; }
            const numero = Number(v);
            this.n++; this.vueltas.textContent = this.n;
            gsap.fromTo(this.vueltas, { scale: 1.8 }, { scale: 1, duration: .5, ease: 'back.out(3)' });
            this.linea(`> Ingrese un número mayor que cero: ${numero}`);
            this.nodo('leer', 'on');
            setTimeout(() => {
                if (numero > 0) {
                    this.nodo('cond', 'si'); this.nodo('valido', 'si');
                    this.linea(`> Número válido ingresado: ${numero}`);
                    this.entrada.classList.remove('mal'); this.entrada.classList.add('ok');
                    this.listo = true;
                    descubrir('repetir', boton);
                } else {
                    this.nodo('cond', 'no'); this.nodo('vuelta', 'on');
                    this.entrada.classList.add('mal');
                    this.linea(`  (¿${numero} > 0? No → el ciclo se repite)`);
                    this.entrada.select();
                }
            }, MOVIMIENTO ? 500 : 0);
        },
        reiniciar() { this.n = 0; this.listo = false; this.vueltas.textContent = '0'; this.consola.innerHTML = ''; this.entrada.value = ''; this.entrada.classList.remove('ok', 'mal'); }
    };
    rep.entrada.addEventListener('keydown', e => { if (e.key === 'Enter') rep.enviar(e.target); });

    /* =====================================================
       COMPARATIVA: MIENTRAS vs REPETIR
       ===================================================== */
    function comparar(boton) {
        const m = $('[data-carril="mientras"]'), r = $('[data-carril="repetir"]');
        $$('.carril-pasos span').forEach(s => s.className = '');
        $$('[data-ejec]').forEach(e => { e.textContent = '…'; });
        const concl = $('[data-comparar-conclusion]'); concl.hidden = true;
        boton.disabled = true;
        const p = (c, paso) => $(`[data-paso="${paso}"]`, c);
        const tl = registrar(gsap.timeline({ onComplete: () => { boton.disabled = false; descubrir('comparar', boton); } }));
        tl.add(() => p(m, 'cond').classList.add('no'))
          .from(p(m, 'cond'), { scale: 1.3, duration: .4 }, '<')
          .add(() => p(m, 'cuerpo').classList.add('salta'), '+=.3')
          .add(() => { $('[data-ejec]', m).textContent = '0'; }, '+=.2')
          .add(() => p(r, 'cuerpo').classList.add('si'), '+=.4')
          .from(p(r, 'cuerpo'), { scale: 1.3, duration: .4 }, '<')
          .add(() => p(r, 'cond').classList.add('si'), '+=.4')
          .from(p(r, 'cond'), { scale: 1.3, duration: .4 }, '<')
          .add(() => { $('[data-ejec]', r).textContent = '1'; }, '+=.2')
          .add(() => { concl.hidden = false; gsap.from(concl, { y: 20, opacity: 0, duration: .5 }); }, '+=.3');
    }

    /* =====================================================
       ÁRBOL DE DECISIÓN
       ===================================================== */
    const RESULTADOS = {
        para: '🔢 Usa el ciclo <b>Para</b>: el número de repeticiones se conoce de antemano.',
        mientras: '🔃 Usa el ciclo <b>Mientras</b>: depende de una condición y puede que no se ejecute nunca.',
        repetir: '🔂 Usa <b>Repetir Mientras Que</b>: garantiza al menos una ejecución antes de validar.'
    };
    function arbol(boton) {
        const op = boton.dataset.arbol;
        const paso2 = $('[data-arbol-paso="2"]'), res = $('[data-arbol-resultado]'), otra = $('[data-arbol="reiniciar"]');
        if (op === 'reiniciar') { paso2.hidden = true; res.hidden = true; otra.hidden = true; return; }
        if (op === '2') { paso2.hidden = false; gsap.from(paso2, { x: -40, opacity: 0, duration: .45, ease: 'power2.out' }); return; }
        res.innerHTML = RESULTADOS[op]; res.hidden = false; otra.hidden = false;
        gsap.from(res, { scale: .8, opacity: 0, duration: .5, ease: 'back.out(2)' });
        descubrir('arbol', res);
    }

    /* =====================================================
       MISIONES
       ===================================================== */
    function completarMision(id, insignia, xp, origen) {
        if (estado.misiones[id]) return false;
        estado.misiones[id] = true; guardar();
        sumarXP(xp, origen); ganarInsignia(insignia, origen);
        return true;
    }
    const retro = (id, ok, html) => { const r = $(`[data-retro="${id}"]`); r.className = 'retro ' + (ok ? 'ok' : 'mal'); r.innerHTML = html; gsap.from(r, { y: 10, opacity: 0, duration: .35 }); };
    const norm = s => s.replace(/\s+/g, '').replace(/×/g, '*').toLowerCase();

    function mision1(boton) {
        const esperado = { ini: v => norm(v) === '1', fin: v => norm(v) === '10', paso: v => norm(v) === '1', expr: v => ['7*i', 'i*7'].includes(norm(v)) };
        let bien = 0;
        $$('[data-m1]').forEach(inp => { const ok = esperado[inp.dataset.m1](inp.value); inp.classList.toggle('ok', ok); inp.classList.toggle('mal', !ok); if (ok) bien++; else gsap.fromTo(inp, { x: -6 }, { x: 0, duration: .4, ease: 'elastic.out(1, .3)' }); });
        if (bien === 4) {
            const nueva = completarMision('m1', 'contador', 30, boton);
            retro('m1', true, nueva ? '¡Perfecto! El ciclo va de 1 a 10 con paso 1 y escribe 7 * i.' : '¡Correcto! Ya habías completado esta misión.');
        } else retro('m1', false, `Tienes ${bien} de 4. Pista: la tabla va del 1 al 10 y en cada vuelta se escribe 7 multiplicado por i.`);
    }

    function mision2(boton) {
        const resp = [5, 5, 3]; let bien = 0;
        $$('[data-m2]').forEach(inp => {
            const k = +inp.dataset.m2, ok = inp.value !== '' && Number(inp.value) === resp[k];
            inp.classList.toggle('ok', ok); inp.classList.toggle('mal', !ok); if (ok) bien++;
            const ex = $(`[data-explica="${k}"]`); if (inp.value !== '') { ex.hidden = false; }
        });
        if (bien === 3) {
            const nueva = completarMision('m2', 'detective', 30, boton);
            retro('m2', true, nueva ? '¡Excelente rastreo de vueltas!' : '¡Correcto! Ya habías completado esta misión.');
        } else retro('m2', false, `Tienes ${bien} de 3. Lee la explicación de cada caso y vuelve a intentarlo.`);
    }

    function mision3(boton) {
        const caso = boton.closest('.m3-caso');
        if (caso.classList.contains('resuelto')) return;
        $$('button', caso).forEach(b => b.classList.remove('mal'));
        if (boton.dataset.m3 === caso.dataset.correcta) {
            boton.classList.add('ok'); caso.classList.add('resuelto');
            gsap.fromTo(caso, { scale: 1.04 }, { scale: 1, duration: .4 });
        } else {
            boton.classList.add('mal');
            gsap.fromTo(caso, { x: -8 }, { x: 0, duration: .5, ease: 'elastic.out(1, .3)' });
        }
        const resueltos = $$('.m3-caso.resuelto').length;
        if (resueltos === 4) {
            const nueva = completarMision('m3', 'arquitecto', 40, boton);
            retro('m3', true, nueva ? '¡Elegiste bien los cuatro ciclos!' : '¡Correcto! Ya habías completado esta misión.');
        } else retro('m3', boton.classList.contains('ok'), `${resueltos} de 4 situaciones resueltas.`);
    }

    /* =====================================================
       EVALUACIÓN (cuestionario del OVA original, una pregunta a la vez)
       ===================================================== */
    const quizData = [
        { question: 'En programación, una iteración se utiliza principalmente para:', options: ['Garantizar que una instrucción se ejecute solo una vez', 'Repetir un conjunto de instrucciones hasta cumplir una condición', 'Declarar variables dentro de un bloque de código', 'Establecer una relación entre dos valores lógicos'], correct: 1 },
        { question: "Analiza: Para i = 1 Hasta 5 Con Paso 1 Hacer: resultado = 3 * i; Escribir 'i, resultado'. ¿Cuántas veces se ejecutará el ciclo y cuál será la última línea mostrada?", options: ["4 veces – '3 x 4 = 12'", "5 veces – '3 x 5 = 15'", "6 veces – '3 x 6 = 18'", "3 veces – '3 x 3 = 9'"], correct: 1 },
        { question: '¿Qué ocurrirá con un ciclo Mientras x <= 4 Hacer que escribe x y luego hace x = x + 1, iniciando en x = 1?', options: ['Imprimirá los números del 1 al 3', 'Imprimirá los números del 1 al 4', 'Se ejecutará infinitamente', 'No imprimirá nada'], correct: 1 },
        { question: '¿Cuál es la característica principal de un ciclo Repetir Mientras Que?', options: ['Se ejecuta solo si la condición inicial es verdadera', 'Evalúa la condición antes de ejecutar el bloque', 'Se ejecuta al menos una vez antes de verificar la condición', 'No puede incluir lecturas de datos'], correct: 2 },
        { question: '¿Cuál de los siguientes ciclos es más adecuado si no se sabe cuántas veces se repetirá la acción, pero debe ejecutarse mientras una condición siga siendo verdadera?', options: ['Ciclo Para', 'Ciclo Mientras', 'Ninguno de los anteriores', 'Condicional Si-Entonces'], correct: 1 }
    ];
    const quiz = { k: 0, aciertos: 0, puntos: $('[data-quiz-puntos]'), tarjeta: $('[data-quiz-tarjeta]') };

    function quizPintarPuntos() {
        quiz.puntos.innerHTML = quizData.map((_, n) => `<span class="${n === quiz.k ? 'actual' : (quiz.resultados[n] === undefined ? '' : (quiz.resultados[n] ? 'ok' : 'mal'))}"></span>`).join('');
    }
    function quizIniciar() { quiz.k = 0; quiz.aciertos = 0; quiz.resultados = []; quizMostrar(); }
    function quizMostrar() {
        quizPintarPuntos();
        if (quiz.k >= quizData.length) return quizFinal();
        const q = quizData[quiz.k];
        quiz.tarjeta.innerHTML = '';
        const h = document.createElement('h3'); h.textContent = `${quiz.k + 1}. ${q.question}`;
        const ops = document.createElement('div'); ops.className = 'quiz-opciones';
        q.options.forEach((t, n) => {
            const b = document.createElement('button'); b.type = 'button'; b.className = 'quiz-opcion';
            b.textContent = `${String.fromCharCode(65 + n)}. ${t}`;
            b.addEventListener('click', () => quizResponder(n, b));
            ops.appendChild(b);
        });
        const pie = document.createElement('div'); pie.className = 'fila-centro'; pie.innerHTML = '<p class="retro" data-quiz-retro aria-live="polite"></p>';
        quiz.tarjeta.append(h, ops, pie);
        gsap.fromTo(quiz.tarjeta, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: .45, ease: 'power2.out' });
    }
    function quizResponder(n, boton) {
        const q = quizData[quiz.k], ok = n === q.correct;
        const ops = $$('.quiz-opcion', quiz.tarjeta);
        ops.forEach(b => { b.disabled = true; });
        ops[q.correct].classList.add('ok');
        if (!ok) { boton.classList.add('mal'); gsap.fromTo(boton, { x: -8 }, { x: 0, duration: .5, ease: 'elastic.out(1, .3)' }); }
        else gsap.fromTo(boton, { scale: 1.04 }, { scale: 1, duration: .4 });
        quiz.resultados[quiz.k] = ok; if (ok) quiz.aciertos++;
        const r = $('[data-quiz-retro]', quiz.tarjeta);
        r.className = 'retro ' + (ok ? 'ok' : 'mal');
        r.textContent = ok ? '¡Correcto!' : `La respuesta correcta es la ${String.fromCharCode(65 + q.correct)}.`;
        const sig = document.createElement('button'); sig.type = 'button'; sig.className = 'btn';
        sig.textContent = quiz.k === quizData.length - 1 ? 'Ver resultado' : 'Siguiente →';
        sig.addEventListener('click', () => { quiz.k++; quizMostrar(); });
        r.parentElement.appendChild(sig); sig.focus();
        quizPintarPuntos();
    }
    function quizFinal() {
        const pct = Math.round(quiz.aciertos / quizData.length * 100);
        const estrellas = pct >= 80 ? 3 : pct >= 60 ? 2 : pct > 0 ? 1 : 0;
        quiz.tarjeta.innerHTML = `<div class="quiz-final">
            <div class="estrellas" aria-hidden="true">${'⭐'.repeat(estrellas)}${'☆'.repeat(3 - estrellas)}</div>
            <h3>Obtuviste ${quiz.aciertos} de ${quizData.length} (${pct}%)</h3>
            <p>${pct >= 80 ? '¡Dominas los bucles iterativos!' : pct >= 60 ? 'Vas bien: repasa los ciclos en los que fallaste.' : 'Repasa el contenido y vuelve a intentarlo.'}</p>
            <button type="button" class="btn" data-quiz-otra>↺ Intentar de nuevo</button></div>`;
        $('[data-quiz-otra]', quiz.tarjeta).addEventListener('click', quizIniciar);
        gsap.from($$('.quiz-final > *', quiz.tarjeta), { y: 30, opacity: 0, duration: .5, stagger: .12, ease: 'back.out(1.6)' });
        if (pct >= 60) celebrar($('.estrellas', quiz.tarjeta), `${pct}%`);
    }

    /* =====================================================
       EVENTOS DE BOTONES
       ===================================================== */
    document.addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        if (b.dataset.ir !== undefined) return Reveal.slide(+b.dataset.ir, 0);
        if (b.dataset.arbol) return arbol(b);
        if (b.dataset.m3) return mision3(b);
        switch (b.dataset.accion) {
            case 'repetir-formas': detenerActivas(); return animFormas(b.closest('section'));
            case 'repetir-enviar': return rep.enviar(b);
            case 'repetir-reiniciar': return rep.reiniciar();
            case 'comparar': return comparar(b);
            case 'm1': return mision1(b);
            case 'm2': return mision2(b);
        }
    });

    /* =====================================================
       REVEAL.JS
       ===================================================== */
    function marcarNav(h) { $$('.barra-nav button').forEach(b => b.setAttribute('aria-current', String(+b.dataset.ir === h))); }

    Reveal.initialize({
        embedded: true,
        hash: true,
        width: 1280,
        height: 720,
        margin: 0.04,
        center: false,
        controls: true,
        controlsTutorial: true,
        progress: true,
        transition: MOVIMIENTO ? 'slide' : 'none',
        backgroundTransition: MOVIMIENTO ? 'fade' : 'none',
        autoAnimate: MOVIMIENTO,
        autoAnimateDuration: 0.8,
        scrollActivationWidth: 700
    }).then(() => {
        refrescarProgreso();
        quizIniciar();
        marcarNav(Reveal.getIndices().h);
        alEntrar(Reveal.getCurrentSlide());
    });
    Reveal.on('slidechanged', e => {
        marcarNav(e.indexh);
        trazas.forEach(t => t.pausar());
        alEntrar(e.currentSlide);
    });
    Reveal.on('fragmentshown', e => resaltarParte(e.fragment, true));
    Reveal.on('fragmenthidden', e => resaltarParte(e.fragment, false));
})();
