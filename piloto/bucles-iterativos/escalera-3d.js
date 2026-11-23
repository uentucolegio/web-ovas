/* =========================================================
   Escena 3D: "Cada vuelta, un escalón" (Three.js)
   Una escalera en espiral de 10 escalones; la esfera sube uno
   por cada vuelta del ciclo Para i ← 1 Hasta 10 y muestra 5 × i.
   Solo se crea y se dibuja mientras su diapositiva está visible.
   ========================================================= */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const contenedor = document.getElementById('escalera-3d');
const MOVIMIENTO = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ESCALONES = 10;
// Con sizeAttenuation:false la escala es una fracción de la altura de la vista.
const ESCALA_ETIQUETA = { x: 0.16, y: 0.06 };
const VERDES = ['#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534', '#14532d', '#0f766e', '#115e59'];

let iniciado = false, activo = false, animando = false, paso = 0;
let renderer, escena, camara, controles, bola, sombraBola, grupo;
const escalones = [];

const ui = {
    i: document.querySelector('[data-esc-i]'),
    r: document.querySelector('[data-esc-r]'),
    subir: document.querySelector('[data-accion="escalera-subir"]'),
    alternativa: document.querySelector('[data-escalera-alternativa]')
};

function soportaWebGL() {
    try { const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl'))); }
    catch { return false; }
}

/** Posición (centro superior) del escalón k, de 1 a 10; k = 0 es el suelo. */
function posicion(k) {
    if (k === 0) return new THREE.Vector3(3.2, 0.32, 0);
    const ang = (k - 1) * 0.62;
    return new THREE.Vector3(Math.cos(ang) * 2.2, k * 0.62 + 0.32, Math.sin(ang) * 2.2);
}

function etiqueta(texto) {
    const c = document.createElement('canvas'); c.width = 256; c.height = 96;
    const g = c.getContext('2d');
    g.fillStyle = 'rgba(255,255,255,.92)';
    g.beginPath(); g.roundRect(8, 12, 240, 72, 20); g.fill();
    g.fillStyle = '#166534'; g.font = '700 40px Poppins, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(texto, 128, 50);
    // depthTest:false + renderOrder: la etiqueta nunca queda tapada por un escalón o la esfera
    // sizeAttenuation:false: mismo tamaño en pantalla aunque el escalón esté al fondo
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false, depthTest: false, sizeAttenuation: false }));
    sprite.renderOrder = 10;
    sprite.scale.set(ESCALA_ETIQUETA.x, ESCALA_ETIQUETA.y, 1);
    return sprite;
}

function iniciar() {
    if (iniciado) return;
    iniciado = true;
    if (!soportaWebGL()) { ui.alternativa.hidden = false; ui.subir.disabled = true; return; }

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    contenedor.appendChild(renderer.domElement);

    escena = new THREE.Scene();
    camara = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camara.position.set(8.5, 7.5, 10);

    escena.add(new THREE.HemisphereLight(0xffffff, 0xdcfce7, 1.6));
    const sol = new THREE.DirectionalLight(0xffffff, 1.4); sol.position.set(6, 12, 8); escena.add(sol);

    grupo = new THREE.Group(); escena.add(grupo);

    // Suelo y columna central
    const suelo = new THREE.Mesh(new THREE.CircleGeometry(4.6, 64), new THREE.MeshStandardMaterial({ color: 0xf0fdf4, roughness: 1 }));
    suelo.rotation.x = -Math.PI / 2; grupo.add(suelo);
    const columna = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, ESCALONES * 0.62 + 0.8, 32), new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: .6 }));
    columna.position.y = (ESCALONES * 0.62 + 0.8) / 2; grupo.add(columna);

    // Escalones con su etiqueta 5 × i
    for (let k = 1; k <= ESCALONES; k++) {
        const ang = (k - 1) * 0.62;
        const mat = new THREE.MeshStandardMaterial({ color: VERDES[k - 1], roughness: .45, metalness: .05, emissive: 0xf59e0b, emissiveIntensity: 0 });
        const esc = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.22, 1.05), mat);
        const p = posicion(k);
        esc.position.set(Math.cos(ang) * 1.45, p.y - 0.43, Math.sin(ang) * 1.45);
        esc.rotation.y = -ang;
        grupo.add(esc);
        const et = etiqueta(`5×${k}=${5 * k}`);
        // Debajo del borde exterior del escalón: la esfera (arriba) queda siempre despejada
        et.position.set(Math.cos(ang) * 3.4, p.y - 0.8, Math.sin(ang) * 3.4);
        et.visible = false;
        grupo.add(et);
        escalones.push({ esc, et });
    }

    // Esfera (el valor de i) y su sombra
    bola = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 24), new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: .3, emissive: 0xf59e0b, emissiveIntensity: .25 }));
    bola.position.copy(posicion(0)); grupo.add(bola);
    sombraBola = new THREE.Mesh(new THREE.CircleGeometry(0.3, 24), new THREE.MeshBasicMaterial({ color: 0x0f172a, transparent: true, opacity: .15 }));
    sombraBola.rotation.x = -Math.PI / 2; sombraBola.position.set(bola.position.x, 0.01, bola.position.z); grupo.add(sombraBola);

    controles = new OrbitControls(camara, renderer.domElement);
    controles.target.set(0, 3, 0);
    controles.enableDamping = true; controles.enablePan = false;
    controles.minDistance = 7; controles.maxDistance = 20;
    controles.maxPolarAngle = Math.PI * 0.49;
    controles.autoRotate = MOVIMIENTO; controles.autoRotateSpeed = 0.6;

    new ResizeObserver(ajustar).observe(contenedor);
    ajustar();
}

function ajustar() {
    if (!renderer) return;
    const w = contenedor.clientWidth, h = contenedor.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camara.aspect = w / h; camara.updateProjectionMatrix();
}

function dibujar() {
    if (!activo) return;
    controles.update();
    sombraBola.position.x = bola.position.x; sombraBola.position.z = bola.position.z;
    sombraBola.position.y = paso === 0 ? 0.01 : posicion(paso).y - 0.31;
    renderer.render(escena, camara);
    requestAnimationFrame(dibujar);
}

function mostrarEstado(k) {
    ui.i.textContent = k;
    ui.r.textContent = k ? 5 * k : '—';
    if (window.gsap) window.gsap.fromTo([ui.i, ui.r], { scale: 1.6 }, { scale: 1, duration: .45, ease: 'back.out(3)' });
}

function subir() {
    if (!renderer || animando || paso >= ESCALONES) return;
    animando = true; ui.subir.disabled = true;
    const gsap = window.gsap;
    const tl = gsap.timeline({
        onComplete: () => {
            animando = false;
            document.dispatchEvent(new CustomEvent('piloto:descubrir', { detail: { id: 'escalera', origen: ui.subir } }));
        }
    });
    for (let k = paso + 1; k <= ESCALONES; k++) {
        const destino = posicion(k);
        const desde = posicion(k - 1);
        const alto = Math.max(desde.y, destino.y) + 0.7;
        // Salto en arco: sube, avanza y cae sobre el escalón
        tl.to(bola.position, { x: (desde.x + destino.x) / 2, z: (desde.z + destino.z) / 2, y: alto, duration: MOVIMIENTO ? .28 : .01, ease: 'power1.out' })
          .to(bola.position, { x: destino.x, z: destino.z, y: destino.y, duration: MOVIMIENTO ? .28 : .01, ease: 'power1.in' })
          .add(() => {
              paso = k;
              const { esc, et } = escalones[k - 1];
              // Destello ámbar al pisar el escalón; luego vuelve a su verde
              esc.material.emissiveIntensity = .55;
              gsap.to(esc.material, { emissiveIntensity: 0, duration: 1.2 });
              // Las etiquetas anteriores se atenúan y achican: la del escalón actual manda
              escalones.slice(0, k - 1).forEach(({ et: previa }) => {
                  previa.renderOrder = 10;
                  gsap.to(previa.material, { opacity: .6, duration: .3 });
                  gsap.to(previa.scale, { x: ESCALA_ETIQUETA.x * .75, y: ESCALA_ETIQUETA.y * .75, duration: .3 });
              });
              et.visible = true; et.renderOrder = 20; et.material.opacity = 1;
              gsap.fromTo(et.scale, { x: ESCALA_ETIQUETA.x * .2, y: ESCALA_ETIQUETA.y * .2 }, { x: ESCALA_ETIQUETA.x, y: ESCALA_ETIQUETA.y, duration: .4, ease: 'back.out(2.5)' });
              mostrarEstado(k);
          })
          .to({}, { duration: MOVIMIENTO ? .25 : 0 });
    }
}

function reiniciar() {
    if (!renderer) return;
    window.gsap.killTweensOf(bola.position);
    animando = false; paso = 0; ui.subir.disabled = false;
    bola.position.copy(posicion(0));
    escalones.forEach(({ esc, et }) => {
        esc.material.emissiveIntensity = 0;
        et.visible = false; et.material.opacity = 1; et.scale.set(ESCALA_ETIQUETA.x, ESCALA_ETIQUETA.y, 1);
    });
    mostrarEstado(0); ui.r.textContent = '—';
}

document.addEventListener('click', e => {
    const b = e.target.closest('[data-accion]'); if (!b) return;
    if (b.dataset.accion === 'escalera-subir') subir();
    if (b.dataset.accion === 'escalera-reiniciar') reiniciar();
});

// Arranca y se detiene según la diapositiva visible
document.addEventListener('piloto:diapositiva', e => {
    const visible = e.detail.slide.contains(contenedor);
    if (visible) {
        iniciar();
        if (renderer && !activo) { activo = true; ajustar(); dibujar(); }
    } else {
        activo = false;
    }
});
// Por si la presentación abrió directamente en esta diapositiva
if (window.Reveal && Reveal.isReady && Reveal.isReady() && Reveal.getCurrentSlide().contains(contenedor)) {
    document.dispatchEvent(new CustomEvent('piloto:diapositiva', { detail: { slide: Reveal.getCurrentSlide() } }));
}
