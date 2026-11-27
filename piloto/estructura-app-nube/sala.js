/* =========================================================
   Piloto OVA en diapositivas · Familia 🛡️ Sala de máquinas
   "Cómo se estructura una app en la nube"
   Reveal.js (diapositivas) + GSAP (animación) + figura isométrica
   (skill Anatomy) en figura/rack.html, que se maneja con postMessage.
   ========================================================= */
(() => {
    'use strict';

    const MOVIMIENTO = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Sin movimiento: todas las animaciones terminan de inmediato.
    if (!MOVIMIENTO) gsap.globalTimeline.timeScale(1000);

    const $ = (sel, raiz = document) => raiz.querySelector(sel);
    const $$ = (sel, raiz = document) => [...raiz.querySelectorAll(sel)];
    const miles = n => n.toLocaleString('es-CO');

    /* =====================================================
       ESTADO Y GAMIFICACIÓN (XP, descubrimientos, insignias)
       ===================================================== */
    const CLAVE = 'piloto-estructura-app-nube-v1';
    const XP_MAX = 170;
    const DESCUBRIMIENTOS = ['viaje', 'taller', 'atajos', 'escalado', 'clasificar', 'terminal'];
    const nuevoEstado = () => ({ xp: 0, misiones: {}, descubrimientos: {}, insignias: {} });
    const estado = (() => {
        try { return Object.assign(nuevoEstado(), JSON.parse(localStorage.getItem(CLAVE)) || {}); }
        catch { return nuevoEstado(); }
    })();
    const guardar = () => { try { localStorage.setItem(CLAVE, JSON.stringify(estado)); } catch { /* sin almacenamiento */ } };
    const cuantosDescubrimientos = () => DESCUBRIMIENTOS.filter(d => estado.descubrimientos[d]).length;

    function refrescarProgreso() {
        $$('[data-xp]').forEach(e => { e.textContent = estado.xp; });
        $$('[data-xp-barra]').forEach(e => { e.style.width = Math.min(100, estado.xp / XP_MAX * 100) + '%'; });
        const n = cuantosDescubrimientos();
        $$('[data-desc-cuenta]').forEach(e => { e.textContent = `🔎 Descubrimientos ${n}/${DESCUBRIMIENTOS.length}`; });
        $$('[data-desc-numero]').forEach(e => { e.textContent = n; });
        $$('[data-insignia]').forEach(e => e.classList.toggle('ganada', !!estado.insignias[e.dataset.insignia]));
        $$('[data-mision-estado]').forEach(e => {
            const id = e.dataset.misionEstado;
            e.classList.toggle('hecha', id === 'desc' ? n === DESCUBRIMIENTOS.length : !!estado.misiones[id]);
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
        const colores = ['#0e7490', '#22d3ee', '#16a34a', '#fbbf24', '#67e8f9'];
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
        sumarXP(10, origen);
        if (cuantosDescubrimientos() === DESCUBRIMIENTOS.length) ganarInsignia('explorador', origen);
    }

    /* =====================================================
       LA FIGURA ISOMÉTRICA (iframe figura/rack.html)
       ===================================================== */
    const racks = $$('[data-rack]');
    const ordenRack = (iframe, msg) => { if (iframe && iframe.contentWindow) iframe.contentWindow.postMessage(Object.assign({ destino: 'rack' }, msg), '*'); };
    function cargarRack(iframe) { if (!iframe.src) iframe.src = iframe.dataset.src; }
    /** Solo anima la figura de la diapositiva visible. */
    function activarRacks(slide) {
        racks.forEach(f => {
            const visible = !!slide && slide.contains(f);
            if (visible) cargarRack(f);
            ordenRack(f, { tipo: 'activo', valor: visible });
        });
    }
    const rackDe = fuente => racks.find(f => f.contentWindow === fuente);

    window.addEventListener('message', e => {
        const m = e.data; if (!m || m.fuente !== 'rack') return;
        const f = rackDe(e.source); if (!f) return;
        if (m.tipo === 'alto') f.style.height = m.px + 'px';
        if (m.tipo === 'listo') {
            const slide = MOVIL ? null : Reveal.getCurrentSlide();
            if (!MOVIL) ordenRack(f, { tipo: 'activo', valor: slide && slide.contains(f) });
            if (f.hasAttribute('data-escalado')) escala.enviar();
        }
        if (f.hasAttribute('data-viaje')) viajeMensaje(m, f);
        if (f.hasAttribute('data-taller')) tallerMensaje(m);
        if (f.hasAttribute('data-escalado') && m.tipo === 'servidores') { escala.servidores = m.n; escala.pintar(); }
    });

    /* ---------- La vida de una petición ---------- */
    const viajeRack = $('[data-viaje]');
    function viajeMensaje(m, f) {
        if (m.tipo === 'fase') {
            $$('[data-paso]').forEach(li => {
                const n = +li.dataset.paso;
                li.classList.toggle('actual', n === m.fase);
                li.classList.toggle('hecho', m.fase >= 0 && n < m.fase);
            });
            const li = $(`[data-paso="${m.fase}"]`);
            if (li) gsap.fromTo(li, { x: -10 }, { x: 0, duration: .35, ease: 'power2.out' });
            $('[data-viaje-ms]').textContent = (m.ms || 0) + ' ms';
        }
        if (m.tipo === 'fin') {
            $$('[data-paso]').forEach(li => { li.classList.remove('actual'); li.classList.add('hecho'); });
            $('[data-viaje-ms]').textContent = m.ms + ' ms';
            gsap.fromTo('[data-viaje-ms]', { scale: 1.6 }, { scale: 1, duration: .5, ease: 'back.out(3)' });
            descubrir('viaje', $('[data-viaje-ms]'));
        }
    }

    /* ---------- Taller: desarmar e inspeccionar ---------- */
    const tallerRack = $('[data-taller]');
    const ICONOS = {
        navegador: '🖥️', router: '📡', region: '🌎', rack: '🗄️', bandeja: '🔌', balanceador: '⚖️', 'red-lb': '🔀',
        servidor: '🖥️', cpu: '🧠', ram: '💾', ssd: '💽', ventiladores: '🌀', fuente: '⚡', nic: '🔗',
        bd: '🗃️', discos: '🗄️', controlador: '🎛️'
    };
    const encontradas = new Set();
    function tallerMensaje(m) {
        if (m.tipo === 'desarmado') $('[data-accion="taller-desarmar"]').textContent = m.valor ? '🧱 Armar' : '🔧 Desarmar';
        if (m.tipo !== 'seleccion') return;
        const p = m.parte, caja = $('[data-ficha]');
        if (!p) {
            $('[data-ficha-icono]').textContent = '🔧';
            $('[data-ficha-capa]').textContent = 'Taller';
            $('[data-ficha-nombre]').textContent = 'Elige una pieza';
            $('[data-ficha-texto]').textContent = 'Toca cualquier pieza de la figura. También puedes usar las flechas del teclado sobre ella.';
            caja.classList.remove('activa');
            return;
        }
        $('[data-ficha-icono]').textContent = ICONOS[p.clase] || '🔧';
        $('[data-ficha-capa]').textContent = p.capa;
        $('[data-ficha-nombre]').textContent = p.nombre;
        $('[data-ficha-texto]').textContent = p.texto;
        caja.classList.add('activa');
        gsap.fromTo(caja, { x: 18, opacity: .4 }, { x: 0, opacity: 1, duration: .4, ease: 'power2.out' });
        const chip = $(`[data-busca="${p.clase}"]`);
        if (chip && !encontradas.has(p.clase)) {
            encontradas.add(p.clase); chip.classList.add('hallada');
            gsap.fromTo(chip, { scale: 1.3 }, { scale: 1, duration: .45, ease: 'back.out(3)' });
            if (encontradas.size === $$('[data-busca]').length) descubrir('taller', chip);
        }
    }

    /* ---------- Simulador de escalado ---------- */
    const escala = {
        rack: $('[data-escalado]'), usuarios: 1000, servidores: 1, CAP: 3000, VIS: 12000,
        enviar() { ordenRack(this.rack, { tipo: 'carga', usuarios: this.usuarios }); ordenRack(this.rack, { tipo: 'servidores', n: this.servidores }); },
        pintar() {
            const cap = this.servidores * this.CAP, enLinea = this.usuarios <= cap;
            $('[data-esc-usuarios]').textContent = miles(this.usuarios);
            $('[data-esc-capacidad]').textContent = miles(cap);
            $('[data-esc-servidores]').textContent = this.servidores;
            $('[data-esc-barra-carga]').style.width = Math.min(100, this.usuarios / this.VIS * 100) + '%';
            $('[data-esc-barra-cap]').style.width = Math.min(100, cap / this.VIS * 100) + '%';
            const e = $('[data-esc-estado]');
            e.classList.toggle('mal', !enLinea);
            e.textContent = enLinea ? '✅ App EN LÍNEA' : '🔥 App SOBRECARGADA: ¡añade servidores!';
            if (enLinea && this.usuarios >= this.VIS) descubrir('escalado', e);
        },
        accion(tipo, boton) {
            if (tipo === 'carga') { this.usuarios = Math.min(this.VIS, this.usuarios + 3000); gsap.fromTo('[data-esc-usuarios]', { scale: 1.4 }, { scale: 1, duration: .4 }); }
            if (tipo === 'mas') this.servidores = Math.min(4, this.servidores + 1);
            if (tipo === 'menos') this.servidores = Math.max(1, this.servidores - 1);
            if (tipo === 'reiniciar') { this.usuarios = 1000; this.servidores = 1; }
            this.enviar(); this.pintar();
            if (tipo === 'carga' && this.usuarios >= this.VIS) boton.disabled = true;
            if (tipo === 'reiniciar') $('[data-accion="esc-carga"]').disabled = false;
        }
    };

    /* =====================================================
       ANIMACIONES POR DIAPOSITIVA
       ===================================================== */
    let activas = [];
    const registrar = tl => { activas.push(tl); return tl; };
    const detenerActivas = () => { activas.forEach(t => t.kill()); activas = []; };

    function animEscalar(slide) {
        const v = $('[data-vertical]', slide), vt = $('[data-vertical-txt]', slide);
        const tamanos = [['2 CPU · 4 GB', 50], ['4 CPU · 8 GB', 80], ['8 CPU · 32 GB', 112], ['¡no cabe más!', 136]];
        const tl = registrar(gsap.timeline({ repeat: -1, repeatDelay: 1, delay: .4 }));
        tamanos.forEach(([txt, h], k) => {
            tl.to(v, { attr: { y: 170 - h, height: h }, duration: .7, ease: 'back.out(1.6)' }, k ? '+=.6' : 0)
              .add(() => { vt.textContent = txt; v.style.stroke = k === 3 ? 'var(--rojo-500)' : ''; }, '<');
        });
        tl.to(v, { attr: { y: 120, height: 50 }, duration: .5, ease: 'power2.inOut' }, '+=1')
          .add(() => { vt.textContent = '2 CPU · 4 GB'; v.style.stroke = ''; }, '<');
        // Horizontal: los servidores entran uno a uno; el tráfico se reparte
        const h = $('[data-horizontal]', slide);
        const srv = $$('.srv', h), enl = $$('.enlace', h);
        const tl2 = registrar(gsap.timeline({ repeat: -1, repeatDelay: 1.6, delay: .4 }));
        tl2.set([...srv, ...enl], { opacity: 0 }).set([srv[0], enl[0]], { opacity: 1 });
        for (let k = 1; k < srv.length; k++) {
            tl2.fromTo(srv[k], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .5, ease: 'back.out(2)' }, '+=.9')
               .to(enl[k], { opacity: 1, duration: .3 }, '<.2');
        }
        tl2.to(enl, { strokeDashoffset: -40, duration: 1.6, ease: 'none' });
    }

    function animMonolito() { /* el monolito empieza unido */ monolito(false); }
    function animHerramientas() { /* la terminal arranca con el botón */ }
    function animCadena() { }

    const ANIMACIONES = { escalar: animEscalar, monolito: animMonolito, herramientas: animHerramientas, cadena: animCadena };

    function alEntrar(slide) {
        detenerActivas();
        const entra = $$('.entra', slide);
        // fromTo (y no from): si la animación anterior se cortó a medias, igual termina visible.
        if (entra.length) registrar(gsap.fromTo(entra, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .55, stagger: .08, ease: 'power2.out', clearProps: 'transform,opacity' }));
        const fn = ANIMACIONES[slide.dataset.anim];
        if (fn) fn(slide);
        activarRacks(slide);
    }

    /* =====================================================
       ATAJOS: CDN y caché
       ===================================================== */
    function voltear(b) {
        // Se cierra como una página (escala en X), cambia de cara y se abre
        gsap.to(b, { scaleX: 0, duration: .16, ease: 'power2.in', onComplete: () => {
            b.classList.toggle('volteada');
            gsap.to(b, { scaleX: 1, duration: .24, ease: 'back.out(2)', clearProps: 'transform' });
        } });
        b.dataset.vista = '1';
        if ($$('[data-atajo]').every(a => a.dataset.vista)) descubrir('atajos', b);
    }

    /* =====================================================
       MONOLITO vs MICROSERVICIOS
       ===================================================== */
    // Posiciones de los bloques: unidos (monolito) o separados (microservicios)
    const UNIDOS = [[40, 40], [150, 40], [40, 110], [150, 110]];
    const SEPARADOS = [[20, 20], [290, 20], [20, 120], [290, 120]];
    let separados = false;
    function monolito(separar) {
        separados = separar;
        const pos = separar ? SEPARADOS : UNIDOS;
        pos.forEach(([x, y], i) => {
            gsap.to(`[data-b="${i}"]`, { attr: { x, y }, duration: .8, ease: 'back.out(1.4)' });
            gsap.to(`[data-bt="${i}"]`, { attr: { x: x + 55, y: y + 40 }, duration: .8, ease: 'back.out(1.4)' });
        });
        $('[data-mono-etq]').textContent = separar ? 'Microservicios: cada uno se despliega y escala por separado' : 'Monolito: un solo bloque';
        $('[data-mono-etq]').setAttribute('x', separar ? 210 : 150);
        $('[data-accion="mono-alternar"]').textContent = separar ? '🧱 Volver a unir en un monolito' : '🔀 Separar en microservicios';
    }

    const ARQ = [
        { car: 'Todo el código vive en un solo bloque', correcta: 'Monolito' },
        { car: 'Cada parte se despliega y escala por separado', correcta: 'Microservicios' },
        { car: 'Más simple para empezar y para proyectos pequeños', correcta: 'Monolito' },
        { car: 'Equipos grandes trabajan en paralelo sin pisarse', correcta: 'Microservicios' },
        { car: 'Si una parte falla, puede caer todo el sistema', correcta: 'Monolito' },
        { car: 'Mayor complejidad de comunicación entre servicios', correcta: 'Microservicios' }
    ];
    const clasif = { hechos: new Set(), aciertos: 0 };
    $('[data-clasifica]').innerHTML = ARQ.map((a, i) => `<div><span>${a.car}</span><div><button type="button" data-arq="${i}" data-op="Monolito">Monolito</button><button type="button" data-arq="${i}" data-op="Microservicios">Microservicios</button></div></div>`).join('');
    function clasificar(b) {
        const i = +b.dataset.arq; if (clasif.hechos.has(i)) return;
        clasif.hechos.add(i);
        const fila = b.parentElement;
        if (b.dataset.op === ARQ[i].correcta) { b.classList.add('ok'); clasif.aciertos++; gsap.fromTo(b, { scale: 1.15 }, { scale: 1, duration: .35 }); }
        else { b.classList.add('mal'); $(`[data-op="${ARQ[i].correcta}"]`, fila).classList.add('ok'); gsap.fromTo(fila.parentElement, { x: -8 }, { x: 0, duration: .5, ease: 'elastic.out(1, .3)' }); }
        const r = $('[data-retro="clasifica"]');
        r.className = 'retro ' + (clasif.hechos.size === ARQ.length && clasif.aciertos >= 4 ? 'ok' : '');
        r.textContent = `${clasif.aciertos} de ${clasif.hechos.size} correctas` + (clasif.hechos.size === ARQ.length ? (clasif.aciertos === ARQ.length ? ' · ¡Perfecto!' : ' · Revisa las marcadas en verde.') : '');
        if (clasif.hechos.size === ARQ.length) descubrir('clasificar', r);
    }

    /* =====================================================
       TERMINAL (salida de ejemplo; 123456789012 es la cuenta de ejemplo de la documentación de AWS)
       ===================================================== */
    const SESION = [
        ['aws sts get-caller-identity', '{\n    "UserId": "AIDAEJEMPLOESTUDIANTE",\n    "Account": "123456789012",\n    "Arn": "arn:aws:iam::123456789012:user/estudiante"\n}'],
        ['aws ec2 describe-regions --query "Regions[].RegionName" --output table', '-------------------\n| DescribeRegions |\n+-----------------+\n|  sa-east-1      |\n|  us-east-1      |\n|  us-west-2      |\n|  eu-west-1      |\n|  …              |\n+-----------------+'],
        ['aws s3 ls', '2026-03-02 10:14:07 mi-app-estaticos']
    ];
    let terminalCorriendo = false;
    async function terminal(boton) {
        if (terminalCorriendo) return;
        terminalCorriendo = true; boton.disabled = true;
        const t = $('[data-terminal]'); t.innerHTML = '';
        const espera = ms => new Promise(r => setTimeout(r, MOVIMIENTO ? ms : 0));
        for (const [cmd, salida] of SESION) {
            const linea = document.createElement('div');
            linea.innerHTML = '<span class="prompt">[cloudshell-user ~]$ </span>';
            const c = document.createElement('span'); linea.appendChild(c); t.appendChild(linea);
            for (const ch of cmd) { c.textContent += ch; await espera(22); }
            await espera(350);
            const s = document.createElement('div'); s.className = 'salida'; s.textContent = salida; t.appendChild(s);
            t.scrollTop = t.scrollHeight;
            await espera(600);
        }
        const fin = document.createElement('div'); fin.className = 'prompt'; fin.textContent = '# Salida de ejemplo: tu cuenta mostrará sus propios datos.'; t.appendChild(fin);
        t.scrollTop = t.scrollHeight;
        terminalCorriendo = false; boton.disabled = false; boton.textContent = '↺ Ejecutar de nuevo';
        descubrir('terminal', boton);
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

    // Misión 1: ordenar el recorrido
    const RUTA = ['👤 Usuario', '🌍 CDN', '⚖️ Balanceador', '🧠 Backend/API', '⚡ Caché', '🗄️ Base de datos', '✅ Respuesta'];
    const m1 = { k: 0 };
    function m1Iniciar() {
        m1.k = 0;
        $('[data-m1-ruta]').innerHTML = '';
        const mezcla = [...RUTA].sort(() => Math.random() - .5);
        $('[data-m1-piezas]').innerHTML = mezcla.map(p => `<button type="button" data-m1="${RUTA.indexOf(p)}">${p}</button>`).join('');
        const r = $('[data-retro="m1"]'); r.className = 'retro'; r.textContent = '';
    }
    function m1Tocar(b) {
        const n = +b.dataset.m1;
        if (n !== m1.k) {
            b.classList.add('mal'); setTimeout(() => b.classList.remove('mal'), 600);
            gsap.fromTo(b, { x: -8 }, { x: 0, duration: .5, ease: 'elastic.out(1, .3)' });
            retro('m1', false, `Todavía no. Piensa: ¿qué pieza recibe la petición después de <b>${RUTA[m1.k - 1] || 'tu clic'}</b>?`);
            return;
        }
        b.disabled = true;
        const ruta = $('[data-m1-ruta]');
        if (m1.k) ruta.insertAdjacentHTML('beforeend', '<span class="flecha-ruta">→</span>');
        const ficha = document.createElement('span'); ficha.className = 'ficha-ruta'; ficha.textContent = RUTA[n]; ruta.appendChild(ficha);
        gsap.from(ficha, { scale: .4, opacity: 0, duration: .4, ease: 'back.out(2.5)' });
        m1.k++;
        if (m1.k === RUTA.length) {
            const nueva = completarMision('m1', 'rastreador', 30, ficha);
            retro('m1', true, nueva ? '¡Ruta completa! Así viaja tu petición de ida y vuelta.' : '¡Correcto! Ya habías completado esta misión.');
        } else retro('m1', true, `${m1.k} de ${RUTA.length}`);
    }

    // Misiones 2 y 3: elegir la opción correcta en cada caso
    const MISIONES_CASOS = { m2: { insignia: 'operador', xp: 30, ok: '¡Elegiste bien las cuatro herramientas!' }, m3: { insignia: 'escalador', xp: 50, ok: '¡Escalaste bien las cuatro situaciones!' } };
    function caso(boton) {
        const c = boton.closest('.m3-caso'), grupo = boton.closest('[data-mision-casos]'), id = grupo.dataset.misionCasos;
        if (c.classList.contains('resuelto')) return;
        $$('button', c).forEach(b => b.classList.remove('mal'));
        if (boton.dataset.opcion === c.dataset.correcta) {
            boton.classList.add('ok'); c.classList.add('resuelto');
            gsap.fromTo(c, { scale: 1.04 }, { scale: 1, duration: .4 });
        } else {
            boton.classList.add('mal');
            gsap.fromTo(c, { x: -8 }, { x: 0, duration: .5, ease: 'elastic.out(1, .3)' });
        }
        const total = $$('.m3-caso', grupo).length, resueltos = $$('.m3-caso.resuelto', grupo).length;
        if (resueltos === total) {
            const cfg = MISIONES_CASOS[id];
            const nueva = completarMision(id, cfg.insignia, cfg.xp, boton);
            retro(id, true, nueva ? cfg.ok : '¡Correcto! Ya habías completado esta misión.');
        } else retro(id, boton.classList.contains('ok'), `${resueltos} de ${total} situaciones resueltas.`);
    }

    /* =====================================================
       EVALUACIÓN (cuestionario del OVA original, una pregunta a la vez)
       ===================================================== */
    const quizData = [
        { question: 'Cuando haces clic en una app web, ¿cuál es el orden típico del recorrido de tu petición?', options: ['Base de datos → backend → usuario', 'Usuario → frontend/CDN → backend/API → base de datos y de vuelta', 'Usuario → base de datos → frontend', 'Solo el navegador, sin servidores'], correct: 1 },
        { question: '¿En qué consiste el escalado HORIZONTAL?', options: ['Hacer más grande un solo servidor (más CPU y RAM)', 'Añadir más servidores y repartir el tráfico entre ellos con un balanceador de carga', 'Borrar usuarios para reducir la carga', 'Cambiar de proveedor de nube'], correct: 1 },
        { question: '¿Qué componente reparte el tráfico entrante entre varias instancias del backend?', options: ['La base de datos', 'El balanceador de carga (load balancer)', 'El CDN', 'La cola de mensajes'], correct: 1 },
        { question: 'Una característica típica de una arquitectura de MICROSERVICIOS es:', options: ['Todo el código vive en un solo bloque', 'Cada parte se despliega y escala de forma independiente', 'Es siempre la mejor opción para proyectos pequeños', 'No necesita comunicación entre componentes'], correct: 1 },
        { question: '¿Cuál herramienta usarías para integrar un servicio de nube directamente desde el código de tu app en Node.js?', options: ['La consola web', 'El SDK del proveedor', 'El balanceador de carga', 'El navegador'], correct: 1 },
        { question: 'Para alguien que está aprendiendo, ¿cuál es la ruta recomendada para interactuar con la nube?', options: ['SDK → CLI → consola', 'Consola web → CLI → SDK', 'Solo usar la CLI desde el día uno', 'No usar ninguna herramienta'], correct: 1 }
    ];
    const quiz = { k: 0, aciertos: 0, resultados: [], puntos: $('[data-quiz-puntos]'), tarjeta: $('[data-quiz-tarjeta]') };
    function quizPintarPuntos() {
        quiz.puntos.innerHTML = quizData.map((_, n) => `<span class="${quiz.resultados[n] !== undefined ? (quiz.resultados[n] ? 'ok' : 'mal') : (n === quiz.k ? 'actual' : '')}"></span>`).join('');
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
            <p>${pct >= 80 ? '¡Ya sabes leer la arquitectura de una app en la nube!' : pct >= 60 ? 'Vas bien: repasa las preguntas en las que fallaste.' : 'Repasa el contenido y vuelve a intentarlo.'}</p>
            <button type="button" class="btn" data-quiz-otra>↺ Intentar de nuevo</button></div>`;
        $('[data-quiz-otra]', quiz.tarjeta).addEventListener('click', quizIniciar);
        gsap.from($$('.quiz-final > *', quiz.tarjeta), { y: 30, opacity: 0, duration: .5, stagger: .12, ease: 'back.out(1.6)' });
        if (pct >= 60) celebrar($('.estrellas', quiz.tarjeta), `${pct}%`);
    }

    /* =====================================================
       EVENTOS
       ===================================================== */
    const MOVIL = window.matchMedia('(max-width: 699px)').matches;
    const SECCIONES = $$('.reveal .slides > section');
    function irA(h) {
        if (MOVIL) SECCIONES[h].scrollIntoView({ behavior: MOVIMIENTO ? 'smooth' : 'auto', block: 'start' });
        else Reveal.slide(h, 0);
    }

    document.addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        if (b.dataset.ir !== undefined) return irA(+b.dataset.ir);
        if (b.dataset.atajo) return voltear(b);
        if (b.dataset.velocidad) {
            $$('[data-velocidad]').forEach(v => v.setAttribute('aria-pressed', String(v === b)));
            return ordenRack(viajeRack, { tipo: 'velocidad', valor: +b.dataset.velocidad });
        }
        if (b.dataset.arq !== undefined) return clasificar(b);
        if (b.dataset.m1 !== undefined) return m1Tocar(b);
        if (b.dataset.opcion) return caso(b);
        switch (b.dataset.accion) {
            case 'viaje-enviar': return ordenRack(viajeRack, { tipo: 'enviar' });
            case 'viaje-paso': return ordenRack(viajeRack, { tipo: 'paso' });
            case 'viaje-reiniciar': $$('[data-paso]').forEach(li => li.classList.remove('actual', 'hecho')); $('[data-viaje-ms]').textContent = '0 ms'; return ordenRack(viajeRack, { tipo: 'reiniciar' });
            case 'taller-desarmar': return ordenRack(tallerRack, { tipo: 'desarmar' });
            case 'taller-soltar': return ordenRack(tallerRack, { tipo: 'seleccionar', id: null });
            case 'esc-carga': return escala.accion('carga', b);
            case 'esc-mas': return escala.accion('mas', b);
            case 'esc-menos': return escala.accion('menos', b);
            case 'esc-reiniciar': return escala.accion('reiniciar', b);
            case 'mono-alternar': return monolito(!separados);
            case 'terminal': return terminal(b);
            case 'm1-reiniciar': return m1Iniciar();
        }
    });

    /* =====================================================
       ARRANQUE: diapositivas (escritorio/tableta) o página (celular)
       ===================================================== */
    function marcarNav(h) { $$('.barra-nav button').forEach(b => b.setAttribute('aria-current', String(+b.dataset.ir === h))); }
    function comun() { refrescarProgreso(); quizIniciar(); m1Iniciar(); escala.pintar(); }

    function iniciarMovil() {
        document.body.classList.add('modo-movil');
        $$('.fragment').forEach(f => f.classList.add('visible'));
        comun();
        marcarNav(0);
        // Cada lámina anima al entrar en pantalla (la primera vez) y activa su figura
        const animada = new WeakSet();
        const laminas = $$('.reveal .slides section').filter(s => !s.querySelector(':scope > section'));
        const io = new IntersectionObserver(entradas => entradas.forEach(e => {
            const s = e.target;
            $$('[data-rack]', s).forEach(f => { if (e.isIntersecting) cargarRack(f); ordenRack(f, { tipo: 'activo', valor: e.isIntersecting }); });
            if (!e.isIntersecting) return;
            marcarNav(SECCIONES.indexOf(s.closest('.slides > section')));
            if (!animada.has(s)) {
                animada.add(s);
                const fn = ANIMACIONES[s.dataset.anim]; if (fn) fn(s);
            }
        }), { threshold: 0.25 });
        laminas.forEach(s => io.observe(s));
    }

    function iniciarReveal() {
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
            scrollActivationWidth: 700
        }).then(() => {
            comun();
            marcarNav(Reveal.getIndices().h);
            alEntrar(Reveal.getCurrentSlide());
        });
        Reveal.on('slidechanged', e => { marcarNav(e.indexh); alEntrar(e.currentSlide); });
    }

    if (MOVIL) iniciarMovil(); else iniciarReveal();
})();
