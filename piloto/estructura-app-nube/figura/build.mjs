/* =========================================================
   Figura isométrica "Rack de la app" (skill Anatomy)
   Un rack de servidores sobre un banco: el balanceador arriba,
   hasta cuatro servidores que entran como cajones, una bandeja de
   cables, una base de datos de discos apilados, el router y el
   monitor del usuario.

   Se puede DESARMAR (cada conjunto se separa con su resorte) e
   INSPECCIONAR: al elegir un servidor o el balanceador se levanta
   su tapa y se ven sus piezas (CPU, RAM, discos, ventiladores,
   fuente, tarjeta de red); la base de datos separa sus discos.
   Una petición recorre los cables de ida y de vuelta.

   Genera rack.html (página autónoma, tema claro) que el piloto
   carga en un <iframe>:  node build.mjs
   Modos (?modo=): viaje (petición), escalado (simulador), taller (desarmar).
   Necesita el kit de Anatomy: ~/.claude/skills/anatomy o ANATOMY_KIT.
   ========================================================= */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const KIT = process.env.ANATOMY_KIT || join(homedir(), ".claude", "skills", "anatomy");
const k = await import(pathToFileURL(join(KIT, "kit", "iso-kit.mjs")).href);
const { kitScript } = await import(pathToFileURL(join(KIT, "scripts", "inline-kit.mjs")).href);

const WIDTH = 600;
const HEIGHT = 500;

/* ---------- Modelo: lo que la figura dice es verdad aquí ---------- */
const MODELO = {
  capacidadPorServidor: 3000,         // usuarios simultáneos por servidor (igual que el simulador del OVA)
  maxServidores: 4,
  latencia: { internet: 35, balanceador: 2, red: 1, api: 12, bd: 8 }, // ms ilustrativos de cada tramo
};
/* Despiece: cuánto se separa cada conjunto (unidades del mundo) */
const DESPIECE = {
  paso: 7,          // separación vertical entre unidades del rack al desarmar
  abrir: 16,        // lo que suben las unidades de encima cuando se abre una
  tapa: 13,         // lo que sube la tapa de la unidad abierta
  sacar: 30,        // lo que sale hacia adelante la unidad abierta (su tapa retrocede lo mismo)
  lateral: 13,      // lo que sale el panel lateral con la bandeja (+x)
  bdPaso: 4,        // separación entre discos de la base de datos al desarmar
  bdAbrir: 8,       // separación extra al inspeccionar la base de datos
  orden: ["techo", "lb", "srv-1", "srv-2", "srv-3", "srv-4", "lateral", "bd"], // el de afuera sale primero
  escalon: 0.06,    // s entre un conjunto y el siguiente
  resorte: { rigidez: 64, freno: 14.2 },
};

/* ---------- Mundo (x, y en el piso; z hacia arriba) ---------- */
const PLATE = { x: -64, y: -80, w: 190, d: 168, r: 8 };
const PLATE_H = 10, FOOT_H = 5;
const RACK = { x: -46, y: -60, w: 92, d: 56, r: 1.6 };
const FRONT = -4;                     // cara frontal de las unidades
const PLINTH_H = 6;
const SLOT_H = 15;                    // altura de cada servidor
const LB_H = 11;
const slotZ = (s) => PLINTH_H + (MODELO.maxServidores - s) * SLOT_H; // s = 1 (arriba) … 4 (abajo)
const LB_Z = PLINTH_H + MODELO.maxServidores * SLOT_H;               // 66
const CAP_Z = LB_Z + LB_H;                                           // 77
const CAP_H = 5;
const UNIT = { x: -42, y: -58, w: 84, d: 54, r: 0.6 };
const WALL = 1.2;
const PORT_X = [24, 28, 32, 36];      // puertos del balanceador, uno por servidor
const SLIDE = 30;                     // recorrido del cajón al entrar
const TRAY = { x: 46, y: -44, w: 3, d: 28, r: 0.5 };
const TRAY_H = 79;
const CABLE_X = 50.8;
const CLIENT_Y = -18;
const SERVER_Y = [-22, -26, -30, -34];
const DB_BLOCK = { x: 64, y: -46, w: 46, d: 38, r: 2 };
const DB_C = [91, -27];
const SOCKET_X = 68.5;
const MON = { x: -30, y: 41, w: 44, d: 5, r: 1.2 };
const MON_Z = 10, MON_TOP = 38;
const KEYB = { x: -27, y: 53, w: 38, d: 13, r: 1.4 };
const ROUTER = { x: 30, y: 22, w: 18, d: 12, r: 1.5 };
const ROUTER_H = 5;

const ALTO_MAX = CAP_Z + CAP_H + DESPIECE.paso * 6 + DESPIECE.abrir; // techo con todo desarmado y una unidad abierta
const P = k.fitProjection(
  [...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0), ...k.boxCorners(RACK, 0, ALTO_MAX), [DB_C[0] + 16, DB_C[1], 70]],
  WIDTH, HEIGHT, { pad: 22, azimuth: 52 },
);
// Encuadre del rack armado (modos sin despiece): recorta el aire de arriba
const TOPE_ARMADO = Math.min(...k.boxCorners(RACK, 0, CAP_Z + CAP_H).map((p) => k.iso(p, P)[1])) - 24;

const at = (p) => k.iso(p, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const poly = (pts, closed = false) => k.pathOf(pts.map(at), closed);
const depth = (p) => k.depthOf(p, P);
const byDepth = (pts) => [...pts].sort((a, b) => depth([a[0], a[1], 0]) - depth([b[0], b[1], 0]));
/** Rectángulo cerrado en una cara frontal (plano y = cte). */
const rectY = (y, x0, x1, z0, z1) => poly([[x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]], true);
/** Rectángulo cerrado en una cara lateral (plano x = cte). */
const rectX = (x, y0, y1, z0, z1) => poly([[x, y0, z0], [x, y1, z0], [x, y1, z1], [x, y0, z1]], true);
const fmt = (n) => Math.round(n * 10) / 10;
const circle = (p, r, attrs = "") => { const [x, y] = at(p); return `<circle cx="${fmt(x)}" cy="${fmt(y)}" r="${r}"${attrs}/>`; };
/** Una pieza que se puede elegir. `id` la identifica; `clase` busca su ficha. */
const parte = (id, clase, body) => `<g data-parte="${id}" data-clase="${clase}">${body}</g>`;
/** Un conjunto que se mueve con el despiece. */
const grupo = (g, body, extra = "") => `<g data-g="${g}"${extra}>${body}</g>`;
/** Varias piezas pequeñas ordenadas de atrás hacia adelante. */
const enOrden = (items) => items.sort((a, b) => a.k - b.k).map((i) => i.svg).join("");

/* ---------- Banco ---------- */
function banco() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(PLATE, 20))) {
    out.push(S(k.cylinder(x, y, 7, -PLATE_H - FOOT_H, 1.6, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 5.4, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: "mid" }));
  }
  out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.6), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 5), 0, P), { tone: "lo" }));
  const screws = k.corners(PLATE, 10);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));
  // Regla en el borde frontal
  const strip = { x: -50, y: PLATE.y + PLATE.d - 13, w: 150, d: 7, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const t = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.8, 0.6, [2, 3.6], P);
  out.push(L(t.minor, { tone: "lo" }), L(t.major, { tone: "mid" }));
  out.push(D([at([strip.x + 2, strip.y + 3.5, 0.6]), at([strip.x + strip.w - 2, strip.y + 3.5, 0.6])], { size: 0.45 }));
  return `<g class="fondo">${out.join("")}</g>`;
}

/** Placa de la región, con el único rótulo grabado de la figura. */
function region() {
  const out = [];
  const plate = { x: 84, y: 28, w: 30, d: 22, r: 1.2 };
  out.push(S(k.slabOf(plate, 0, 0.8, P, 4), { tone: "lo", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(plate, 1.6), 0.8, P, 4), { tone: "faint" }));
  out.push(k.faceTextSvg(k.topMatrix([plate.x + 4, plate.y + 7], 0.8, P, "x"), "sa-east-1", { size: 3.4, tone: "mid" }));
  [[4, 22], [4, 16], [4, 19]].forEach(([dx, len], i) => out.push(L(k.lineOnTop([plate.x + dx, plate.y + 11 + i * 3], [plate.x + dx + len, plate.y + 11 + i * 3], 0.8, P), { tone: "lo", free: true })));
  out.push(D([at([plate.x + 2.6, plate.y + 2.6, 0.8]), at([plate.x + plate.w - 2.6, plate.y + plate.d - 2.6, 0.8])], { size: 0.45 }));
  return parte("region", "region", out.join(""));
}

/* ---------- Cables: puntos 3D con el conjunto al que van sujetos ----------
   'f' fijo · 'lateral' panel y bandeja · 'lb' balanceador · 'srv-s' servidor s.
   El código vivo los redibuja cuando algo se mueve; el paquete los recorre. */
const MON_PORT = [15.4, 44, 15, "f"];
const tag = (pts, g) => pts.map((p) => (p.length === 4 ? p : [...p, g]));
const R_CLIENTE1 = tag([MON_PORT, [18.5, 44, 15], [18.5, 44, 0.6], [18.5, 28, 0.6], [ROUTER.x, 28, 0.6]], "f");
const R_CLIENTE2 = [
  [ROUTER.x + ROUTER.w + 1.4, 28, 2.4, "f"], [CABLE_X, 28, 2.4, "f"], [CABLE_X, 28, 0.6, "f"],
  [CABLE_X, CLIENT_Y, 0.6, "lateral"], [CABLE_X, CLIENT_Y, LB_Z + 5.5, "lateral"], [TRAY.x + TRAY.w + 1.4, CLIENT_Y, LB_Z + 5.5, "lateral"],
];
const portZ = (s) => slotZ(s) + 6.2;
const trayZ = (s) => slotZ(s) + 7.5;
const R_PATCH = [1, 2, 3, 4].map((s) => {
  const x = PORT_X[s - 1];
  return [[x, FRONT, LB_Z + 3, "lb"], [x, FRONT + 2.4, LB_Z + 2, "lb"], [x, FRONT + 2.4, portZ(s) + 1.2, `srv-${s}`], [x, FRONT, portZ(s), `srv-${s}`]];
});
const R_DB = [1, 2, 3, 4].map((s) => {
  const y = SERVER_Y[s - 1];
  return [[TRAY.x + TRAY.w + 1.4, y, trayZ(s), "lateral"], [CABLE_X, y, trayZ(s), "lateral"], [CABLE_X, y, 0.6, "lateral"], [DB_BLOCK.x, y, 0.6, "f"], [DB_BLOCK.x, y, PLINTH_H, "f"], [SOCKET_X - 1.4, y, PLINTH_H, "f"]];
});
const CABLES = [];
/** Un cable: se registra para el código vivo y se dibuja en su lugar del orden. */
function cable(id, pts, ends = "both", attrs = "") {
  CABLES.push({ id, pts, ends });
  const scr = pts.map((p) => at(p));
  const end = (p) => `<circle class="iso-wire-end" cx="${fmt(p[0])}" cy="${fmt(p[1])}" r="0.9"/>`;
  const dots = (ends === "both" || ends === "from" ? end(scr[0]) : "") + (ends === "both" || ends === "to" ? end(scr[scr.length - 1]) : "");
  return `<g class="cable iso-wire" data-tone="mid" data-cable="${id}"${attrs}><path class="iso-line" data-tone="mid" d="${k.pathOf(scr)}"/>${dots}</g>`;
}

/** Tramos de piso: se dibujan antes del rack (quedan delante y por debajo de todo). */
function cablesPiso() {
  const out = [cable("cli-piso", R_CLIENTE1.slice(2), "none"), cable("cli-piso2", R_CLIENTE2.slice(2, 4), "none")];
  R_DB.forEach((r, i) => out.push(cable(`bd-${i + 1}-piso`, r.slice(2, 5), "none", ` data-servidor-cable="${i + 1}"`)));
  return `<g class="fondo">${out.join("")}</g>`;
}

/* ---------- Rack: estructura ---------- */
function rackFondo() {
  const out = [`<path class="iso-halo" d="${k.haloOf(RACK, 0, CAP_Z, P)}" style="opacity:.25"/>`];
  out.push(S(k.slabOf(RACK, 0, PLINTH_H, P, 3, 0.5), { tone: "mid", inner: L(k.sideSeam(RACK, 2.4, P, 3), { tone: "faint" }) }));
  out.push(S(k.slabOf({ x: RACK.x, y: RACK.y, w: RACK.w, d: 2, r: 0.4 }, PLINTH_H, CAP_Z - PLINTH_H, P, 2), { tone: "lo" }));       // panel trasero
  out.push(S(k.slabOf({ x: RACK.x, y: RACK.y, w: 4, d: RACK.d, r: 0.4 }, PLINTH_H, CAP_Z - PLINTH_H, P, 2, 0.4), { tone: "mid" })); // panel izquierdo
  const holes = [];
  for (let z = PLINTH_H + 2; z < CAP_Z - 1; z += 3) holes.push(at([RACK.x + 2, FRONT, z]));
  out.push(D(holes, { size: 0.42, tone: "lo" }));
  return parte("rack", "rack", out.join(""));
}

function orejas(z0, h) {
  const out = [];
  for (const x of [UNIT.x, UNIT.x + UNIT.w - 3.4]) {
    out.push(S(k.slabOf({ x, y: FRONT, w: 3.4, d: 1, r: 0.3 }, z0 + 0.8, h - 1.6, P, 2), { tone: "mid", crease: "none" }));
    out.push(D([at([x + 1.7, FRONT + 1, z0 + 2.6]), at([x + 1.7, FRONT + 1, z0 + h - 2.6])], { size: 0.45, tone: "mid" }));
  }
  return out.join("");
}

/** Un chasis abierto: piso, paredes, piezas internas, frente y tapa (que sube al abrir). */
function chasis({ z0, h, interior, frente, tapaDetalles, lid }) {
  const top = z0 + h - 0.3, zf = z0 + 1.3, zw = top - 1.2;
  const out = [];
  out.push(S(k.slabOf(UNIT, z0 + 0.3, 1, P, 2), { tone: "mid", crease: "none" }));                                              // piso
  out.push(S(k.slabOf({ x: UNIT.x, y: UNIT.y, w: UNIT.w, d: WALL, r: 0.3 }, zf, zw - zf, P, 2), { tone: "mid", crease: "none" })); // pared trasera
  out.push(S(k.slabOf({ x: UNIT.x, y: UNIT.y, w: WALL, d: UNIT.d, r: 0.3 }, zf, zw - zf, P, 2), { tone: "mid", crease: "none" })); // pared izquierda
  out.push(interior(zf));
  out.push(S(k.slabOf({ x: UNIT.x + UNIT.w - WALL, y: UNIT.y, w: WALL, d: UNIT.d - WALL, r: 0.3 }, zf, zw - zf, P, 2), { tone: "hi", crease: "lo" })); // pared derecha
  out.push(S(k.slabOf({ x: UNIT.x, y: FRONT - WALL, w: UNIT.w, d: WALL, r: 0.3 }, zf, zw - zf, P, 2), { tone: "hi", crease: "lo" }));              // frente
  out.push(frente);
  const tapa = [S(k.slabOf(UNIT, zw, top - zw, P, 2, 0.4), { tone: "hi", crease: "lo" }), tapaDetalles(top)];
  out.push(grupo(lid, tapa.join("")));
  return out.join("");
}

/* Detalles de la tapa: placa con rótulos (líneas libres), ranuras y tornillos */
function detallesTapa(top) {
  const out = [];
  const placa = { x: -36, y: -54, w: 22, d: 10, r: 0.8 };
  out.push(L(k.planOutline(placa, top, P, 3), { tone: "lo" }));
  [14, 10, 12].forEach((len, i) => out.push(L(k.lineOnTop([placa.x + 2.4, placa.y + 2.6 + i * 2.4], [placa.x + 2.4 + len, placa.y + 2.6 + i * 2.4], top, P), { tone: "faint", free: true })));
  for (let i = 0; i < 5; i++) out.push(L(k.planOutline({ x: 6 + i * 6, y: -50, w: 2, d: 24, r: 1 }, top, P, 3), { tone: "lo" }));
  out.push(D(k.corners(UNIT, 2.6).map(([x, y]) => at([x, y, top])), { size: 0.45, tone: "mid" }));
  return out.join("");
}

/* ---------- Balanceador ---------- */
function balanceador() {
  const z0 = LB_Z;
  const frente = [];
  frente.push(L(rectY(FRONT, -34, -14, z0 + 1.8, z0 + 8.6), { tone: "mid" }));
  frente.push(`<g data-barras>${[0, 1, 2, 3].map((i) => L(poly([[-31 + i * 5, FRONT, z0 + 1.8], [-31 + i * 5, FRONT, z0 + 2.6]]), { tone: "lo", free: "end" })).join("")}</g>`);
  const vent = [];
  for (let x = -9; x <= 15; x += 2) for (let z = z0 + 2.4; z <= z0 + 8.4; z += 2) vent.push(at([x, FRONT, z]));
  frente.push(D(vent, { size: 0.36, tone: "lo" }));
  PORT_X.forEach((x, i) => {
    frente.push(L(rectY(FRONT, x - 1.3, x + 1.3, z0 + 1.8, z0 + 4.2), { tone: "mid" }));
    frente.push(`<g class="led" data-led="lb-${i + 1}">${circle([x, FRONT, z0 + 6.6], 1.05)}</g>`);
  });
  frente.push(orejas(z0, LB_H));

  const interior = (zf) => {
    const items = [];
    const put = (c, svg) => items.push({ k: depth(c), svg });
    // Placa de conmutación: tarjeta, chip con disipador y módulos detrás de cada puerto
    const placa = [];
    placa.push(S(k.slabOf({ x: -34, y: -50, w: 72, d: 40, r: 0.6 }, zf, 0.6, P, 2), { tone: "lo", crease: "none" }));
    placa.push(S(k.slabOf({ x: -8, y: -40, w: 14, d: 14, r: 0.6 }, zf + 0.6, 4.4, P, 2, 0.3), { tone: "hi", crease: "lo" }));
    for (let i = 0; i <= 8; i++) placa.push(L(k.lineOnTop([-8, -40 + 1.4 + i * 1.4], [6, -40 + 1.4 + i * 1.4], zf + 5, P), { tone: "lo" }));
    PORT_X.forEach((x) => placa.push(S(k.slabOf({ x: x - 1.6, y: -16, w: 3.2, d: 10, r: 0.3 }, zf + 0.6, 3, P, 2), { tone: "mid", crease: "none" })));
    put([0, -30, zf], parte("placa-lb", "red-lb", placa.join("")));
    // Dos ventiladores contra la pared trasera
    [-30, -18].forEach((x) => put([x, -54, zf], S(k.slabOf({ x, y: -56.6, w: 9, d: 3, r: 0.4 }, zf, 7.4, P, 2), { tone: "mid", crease: "none", inner: L(k.sideRing([x + 4.5, -53.6, zf + 3.7], 3, "y", P, 20), { tone: "lo" }) })));
    return enOrden(items);
  };
  const body = chasis({ z0, h: LB_H, interior, frente: frente.join(""), tapaDetalles: detallesTapa, lid: "lid-lb" });
  return grupo("lb", parte("balanceador", "balanceador", body));
}

/* ---------- Servidores ---------- */
function frenteServidor(s, z0) {
  const out = [];
  for (let b = 0; b < 4; b++) {
    const x0 = -36 + b * 8.6;
    out.push(L(rectY(FRONT, x0, x0 + 7.6, z0 + 2.2, z0 + SLOT_H - 2.2), { tone: "mid" }));
    out.push(L(rectY(FRONT, x0 + 1.6, x0 + 6, z0 + SLOT_H - 5, z0 + SLOT_H - 3.6), { tone: "lo" }));
    out.push(D([at([x0 + 3.8, FRONT, z0 + 4])], { size: 0.5, tone: "mid" }));
  }
  const vent = [];
  for (let x = 0; x <= 14; x += 2) for (let z = z0 + 3; z <= z0 + SLOT_H - 3; z += 2) vent.push(at([x, FRONT, z]));
  out.push(D(vent, { size: 0.36, tone: "lo" }));
  out.push(`<g class="led" data-led="srv-${s}">${circle([19, FRONT, z0 + 10.4], 1.15)}</g>`);
  PORT_X.forEach((x) => out.push(L(rectY(FRONT, x - 1.2, x + 1.2, z0 + 5, z0 + 7.4), { tone: "mid" })));
  out.push(orejas(z0, SLOT_H));
  return out.join("");
}

function interiorServidor(s) {
  return (zf) => {
    const items = [];
    const put = (c, svg) => items.push({ k: depth(c), svg });
    // Placa base bajo los procesadores y la memoria
    put([-8, -40, zf - 5], S(k.slabOf({ x: -34, y: -52, w: 52, d: 26, r: 0.6 }, zf, 0.5, P, 2), { tone: "lo", crease: "none" }));
    // Dos procesadores con su disipador de aletas, y la RAM junto a cada uno
    const cpu = [], ram = [];
    [-30, -6].forEach((x0) => {
      cpu.push(S(k.slabOf({ x: x0, y: -46, w: 14, d: 14, r: 0.6 }, zf + 0.5, 1.2, P, 2), { tone: "mid", crease: "none" }));
      cpu.push(S(k.slabOf({ x: x0 + 1, y: -45, w: 12, d: 12, r: 0.6 }, zf + 1.7, 6, P, 2, 0.3), { tone: "hi", crease: "lo" }));
      for (let i = 0; i <= 7; i++) cpu.push(L(k.lineOnTop([x0 + 1, -45 + 1.3 + i * 1.35], [x0 + 13, -45 + 1.3 + i * 1.35], zf + 7.7, P), { tone: "lo" }));
      for (let i = 0; i < 4; i++) ram.push(S(k.slabOf({ x: x0 + 15.4 + i * 1.7, y: -48, w: 0.7, d: 18, r: 0.2 }, zf + 0.5, 8.4, P, 2), { tone: "hi", crease: "lo" }));
    });
    put([-16, -39, zf], parte(`cpu-${s}`, "cpu", cpu.join("")));
    put([2, -39, zf + 2], parte(`ram-${s}`, "ram", ram.join("")));
    // Fila de ventiladores que empuja aire de adelante hacia atrás
    const fans = [];
    for (let i = 0; i < 6; i++) {
      const x = -38 + i * 12.6;
      fans.push(S(k.slabOf({ x, y: -26, w: 11, d: 4, r: 0.5 }, zf, 9.4, P, 2), { tone: "mid", crease: "none", inner: L(k.sideRing([x + 5.5, -22, zf + 4.7], 3.8, "y", P, 24), { tone: "lo" }) + D([at([x + 5.5, -22, zf + 4.7])], { size: 0.5, tone: "mid" }) }));
    }
    put([0, -24, zf], parte(`ventiladores-${s}`, "ventiladores", fans.join("")));
    // Fuente de poder (atrás a la derecha) con su rejilla
    const fuente = [S(k.slabOf({ x: 22, y: -56.4, w: 17, d: 16, r: 0.6 }, zf, 10, P, 2, 0.3), { tone: "hi", crease: "lo" })];
    const rej = []; for (let x = 24; x <= 37; x += 1.6) for (let y = -54; y <= -43; y += 1.6) rej.push(at([x, y, zf + 10]));
    fuente.push(D(rej, { size: 0.34, tone: "lo" }));
    put([30, -48, zf], parte(`fuente-${s}`, "fuente", fuente.join("")));
    // Discos detrás de las bahías del frente
    const ssd = [];
    for (let b = 0; b < 4; b++) {
      const x0 = -36 + b * 8.6;
      ssd.push(S(k.slabOf({ x: x0 + 0.4, y: -18, w: 6.8, d: 12.6, r: 0.4 }, zf, 9.6, P, 2, 0.3), { tone: "hi", crease: "lo" }));
      ssd.push(L(k.planOutline({ x: x0 + 1.8, y: -15, w: 4, d: 6, r: 1.6 }, zf + 9.6, P, 3), { tone: "lo" }));
    }
    put([-20, -12, zf], parte(`ssd-${s}`, "ssd", ssd.join("")));
    // Tarjeta de red detrás de los puertos
    const nic = [S(k.slabOf({ x: 21, y: -17, w: 18, d: 1, r: 0.2 }, zf, 8, P, 2), { tone: "lo", crease: "none" })];
    PORT_X.forEach((x) => nic.push(S(k.slabOf({ x: x - 1.5, y: -16, w: 3, d: 10, r: 0.3 }, zf + 2.2, 3, P, 2), { tone: "mid", crease: "none" })));
    nic.push(S(k.slabOf({ x: 26, y: -24, w: 8, d: 6, r: 0.4 }, zf + 3, 2.2, P, 2), { tone: "hi", crease: "lo" }));
    put([30, -12, zf], parte(`nic-${s}`, "nic", nic.join("")));
    return enOrden(items);
  };
}

function servidor(s) {
  const z0 = slotZ(s);
  const body = chasis({ z0, h: SLOT_H, interior: interiorServidor(s), frente: frenteServidor(s, z0), tapaDetalles: detallesTapa, lid: `lid-srv-${s}` });
  return grupo(`srv-${s}`, parte(`servidor-${s}`, "servidor", body), ` data-servidor="${s}"`);
}

/** Tapa ciega de una ranura vacía. */
function ciega(s) {
  const z0 = slotZ(s), out = [];
  const plan = { x: UNIT.x, y: FRONT - 1, w: UNIT.w, d: 1.6, r: 0.3 };
  out.push(S(k.slabOf(plan, z0 + 0.3, SLOT_H - 0.6, P, 2, 0.3), { tone: "mid" }));
  const y = plan.y + plan.d;
  for (let i = 0; i < 3; i++) {
    const zc = z0 + 4 + i * 3.5;
    out.push(L(rectY(y, -28, 28, zc - 0.6, zc + 0.6), { tone: "lo" }));
  }
  out.push(D([at([UNIT.x + 1.7, y, z0 + 2.6]), at([UNIT.x + 1.7, y, z0 + SLOT_H - 2.6]), at([UNIT.x + UNIT.w - 1.7, y, z0 + 2.6]), at([UNIT.x + UNIT.w - 1.7, y, z0 + SLOT_H - 2.6])], { size: 0.45, tone: "mid" }));
  return grupo(`ciega-${s}`, out.join(""), ` data-ciega="${s}"`);
}

function ranuras() {
  // De abajo hacia arriba: cada unidad tapa la cara superior de la de abajo
  const out = [];
  for (let s = MODELO.maxServidores; s >= 1; s--) out.push(ciega(s), servidor(s));
  out.push(balanceador());
  return out.join("");
}

/* ---------- Panel lateral con la bandeja (sale hacia +x) y techo ---------- */
function lateral() {
  const out = [];
  const right = { x: RACK.x + RACK.w - 4, y: RACK.y, w: 4, d: RACK.d, r: 0.4 };
  const panel = [S(k.slabOf(right, PLINTH_H, CAP_Z - PLINTH_H, P, 2, 0.4), { tone: "mid" })];
  const x = right.x + right.w;
  panel.push(L(rectX(x, RACK.y + 2.4, FRONT - 2.4, PLINTH_H + 2.4, CAP_Z - 2.4), { tone: "faint" }));
  for (let z = PLINTH_H + 8; z < CAP_Z - 8; z += 5) {
    panel.push(L(rectX(x, RACK.y + 6, TRAY.y - 4, z, z + 1.2), { tone: "lo" }));
    panel.push(L(rectX(x, TRAY.y + TRAY.d + 3, FRONT - 5, z, z + 1.2), { tone: "lo" }));
  }
  panel.push(D([[RACK.y + 4, PLINTH_H + 4], [RACK.y + 4, CAP_Z - 4], [FRONT - 4, PLINTH_H + 4], [FRONT - 4, CAP_Z - 4]].map(([y, z]) => at([x, y, z])), { size: 0.45, tone: "mid" }));
  const holes = [];
  for (let z = PLINTH_H + 2; z < CAP_Z - 1; z += 3) holes.push(at([right.x + 2, FRONT, z]));
  panel.push(D(holes, { size: 0.42, tone: "lo" }));
  out.push(parte("rack", "rack", panel.join("")));
  // Bandeja con travesaños y conectores pasamuros
  const tray = [S(k.slabOf(TRAY, 0, TRAY_H, P, 2, 0.3), { tone: "mid" })];
  const tx = TRAY.x + TRAY.w;
  const rungs = [];
  for (let z = 4; z < TRAY_H; z += 6) rungs.push(poly([[tx, TRAY.y, z], [tx, TRAY.y + TRAY.d, z]]));
  tray.push(L(rungs.join(""), { tone: "faint" }));
  const conn = (y, z, attrs = "") => `<g${attrs}>${S(k.slabOf({ x: tx, y: y - 1.3, w: 1.4, d: 2.6, r: 0.3 }, z - 1.3, 2.6, P, 2), { tone: "mid", crease: "none" })}</g>`;
  tray.push(conn(CLIENT_Y, LB_Z + 5.5));
  [1, 2, 3, 4].forEach((s) => tray.push(conn(SERVER_Y[s - 1], trayZ(s), ` data-servidor-cable="${s}"`)));
  out.push(parte("bandeja", "bandeja", tray.join("")));
  return grupo("lateral", out.join(""));
}

function techo() {
  const out = [];
  const cap = k.insetPlan(RACK, -1);
  out.push(S(k.slabOf(cap, CAP_Z, CAP_H, P, 3, 0.8), { tone: "mid" }));
  for (let i = 0; i < 6; i++) out.push(L(k.planOutline({ x: -30, y: -50 + i * 6.6, w: 60, d: 2.2, r: 1.1 }, CAP_Z + CAP_H, P, 4), { tone: "lo" }));
  const screws = k.corners(cap, 4);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 1.5, CAP_Z + CAP_H, P, 14)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, CAP_Z + CAP_H])), { size: 0.45 }));
  return grupo("techo", parte("rack", "rack", out.join("")));
}

/* Tramos sobre la bandeja y cables de parcheo al frente: después de la bandeja */
function cablesRack() {
  const out = [cable("cli-bandeja", R_CLIENTE2.slice(3), "to")];
  R_DB.forEach((r, i) => out.push(cable(`bd-${i + 1}-bandeja`, r.slice(0, 3), "from", ` data-servidor-cable="${i + 1}"`)));
  R_PATCH.forEach((r, i) => out.push(cable(`patch-${i + 1}`, r, "both", ` data-servidor-cable="${i + 1}"`)));
  return `<g class="fondo">${out.join("")}</g>`;
}

/* ---------- Base de datos: discos apilados sobre su controlador ---------- */
function baseDatos() {
  const out = [`<path class="iso-halo" d="${k.haloOf(DB_BLOCK, 0, 6, P)}" style="opacity:.3"/>`];
  // Subida oculta de los cables y su llegada al tope del bloque
  R_DB.forEach((r, i) => out.push(`<g class="fondo">${cable(`bd-${i + 1}-sube`, r.slice(4), "none", ` data-servidor-cable="${i + 1}"`)}</g>`));
  const ctrl = [S(k.slabOf(DB_BLOCK, 0, PLINTH_H, P, 4, 0.6), { tone: "mid", inner: L(k.sideSeam(DB_BLOCK, 2.6, P, 4), { tone: "faint" }) })];
  for (let i = 0; i < 4; i++) ctrl.push(L(rectY(DB_BLOCK.y + DB_BLOCK.d, 72 + i * 9, 78 + i * 9, 3.4, 4.6), { tone: "lo" }));
  for (let i = 0; i < 3; i++) ctrl.push(L(rectX(DB_BLOCK.x + DB_BLOCK.w, -40 + i * 10, -34 + i * 10, 3.4, 4.6), { tone: "lo" }));
  SERVER_Y.forEach((y, i) => ctrl.push(`<g data-servidor-cable="${i + 1}">${S(k.cylinder(SOCKET_X, y, 1.4, PLINTH_H, 1.4, P, 16), { tone: "mid" })}${D([at([SOCKET_X, y, PLINTH_H + 1.4])], { size: 0.5, tone: "hi" })}</g>`));
  const [cx, cy] = DB_C;
  ctrl.push(S(k.cylinder(cx, cy, 16.5, PLINTH_H, 2, P, 64), { tone: "lo" }));
  ctrl.push(S(k.cylinder(cx, cy, 2.2, PLINTH_H + 2, 1.2, P, 20), { tone: "mid" })); // eje central
  out.push(parte("controlador", "controlador", ctrl.join("")));
  // Tres discos; el aro que separa cada uno viaja con el disco de abajo
  let z = PLINTH_H + 2;
  for (let i = 0; i < 3; i++) {
    const disco = [S(k.cylinder(cx, cy, 14.6, z, 8, P, 64, 0.6), { tone: "hi", crease: "lo", inner: L(k.sideArc(cx, cy, 14.6, z + 4, P, 40), { tone: "faint" }) })];
    disco.push(L(k.ring(cx, cy, 10.5, z + 8, P, 56), { tone: "faint" }), L(k.ring(cx, cy, 6, z + 8, P, 40), { tone: "faint" }), L(k.ring(cx, cy, 2.4, z + 8, P, 20), { tone: "lo" }));
    z += 8;
    if (i < 2) { disco.push(S(k.cylinder(cx, cy, 15.3, z, 1.2, P, 64), { tone: "mid" })); z += 1.2; }
    out.push(grupo(`bd-${i}`, parte("discos", "discos", disco.join("")), ` data-disco="${i}"`));
  }
  const tapa = [S(k.cylinder(cx, cy, 15.6, z, 3, P, 64, 0.8), { tone: "mid" })];
  const top = z + 3;
  tapa.push(L(k.ring(cx, cy, 12.6, top, P, 64), { tone: "lo" }));
  tapa.push(L(k.ring(cx, cy, 3.2, top, P, 24), { tone: "mid" }));
  tapa.push(D(k.corners({ x: cx - 9, y: cy - 9, w: 18, d: 18, r: 0 }, 0).map(([x, y]) => at([x, y, top])), { size: 0.45 }));
  tapa.push(`<g class="led" data-led="bd">${circle([cx, cy, top], 1.4)}</g>`);
  out.push(grupo("bd-tapa", parte("bd", "bd", tapa.join(""))));
  return out.join("");
}

/* ---------- El usuario: monitor, teclado y ratón ---------- */
function cliente() {
  const out = [`<path class="iso-halo" d="${k.haloOf(k.insetPlan(KEYB, -6), 0, 2, P)}" style="opacity:.35"/>`];
  out.push(S(k.slabOf({ x: -16, y: 34, w: 16, d: 13, r: 2.4 }, 0, 1.8, P, 4, 0.5), { tone: "mid" }));   // pie
  out.push(S(k.slabOf({ x: -10, y: 37, w: 4, d: 3.4, r: 0.8 }, 1.8, MON_Z + 4, P, 3), { tone: "mid" }));  // cuello
  out.push(S(k.slabOf(MON, MON_Z, MON_TOP - MON_Z, P, 3, 0.6), { tone: "hi", crease: "lo" }));
  const y = MON.y + MON.d;
  out.push(L(rectY(y, -27.5, 11.5, MON_Z + 3, MON_TOP - 2.4), { tone: "mid" }));
  out.push(L(poly([[-27.5, y, MON_TOP - 5.4], [11.5, y, MON_TOP - 5.4]]), { tone: "lo" }));
  out.push(L(rectY(y, -24, -2, MON_TOP - 4.6, MON_TOP - 3.2), { tone: "faint" }));
  out.push(`<g data-pantalla="espera">${D([-12, -8, -4].map((x) => at([x, y, 21])), { size: 0.7, tone: "mid" })}</g>`);
  const perfil = [L(k.sideRing([-19, y, 24], 4, "y", P, 28), { tone: "hi" }), L(k.sideRing([-19, y, 25.2], 1.4, "y", P, 16), { tone: "mid" })];
  [[-12, 4, 30], [-12, 1, 26], [-24, -3, 36], [-24, -6, 32]].forEach(([x0, dz, len]) => perfil.push(L(poly([[x0, y, 25 + dz], [x0 + len * (x0 < -15 ? 1 : 0.7) * 0.9, y, 25 + dz]]), { tone: dz > 2 ? "hi" : "lo", free: true })));
  out.push(`<g data-pantalla="perfil" style="opacity:0">${perfil.join("")}</g>`);
  out.push(`<g class="led" data-led="cli">${circle([8.6, y, MON_Z + 1.5], 0.9)}</g>`);
  out.push(S(k.slabOf({ x: MON.x + MON.w, y: 42.6, w: 1.4, d: 2.8, r: 0.3 }, 13.6, 2.8, P, 2), { tone: "mid", crease: "none" }));
  out.push(cable("cli-monitor", R_CLIENTE1.slice(0, 3), "from"));
  out.push(S(k.slabOf(KEYB, 0, 2.4, P, 4, 0.6), { tone: "mid" }));
  out.push(D(k.dotGrid(KEYB.x + 3, KEYB.y + 2.4, 12, 3, 2.7, 2.4, P), { size: 0.5, tone: "lo" }));
  out.push(L(k.planOutline({ x: KEYB.x + 9, y: KEYB.y + 10.2, w: 18, d: 1.4, r: 0.7 }, 2.4, P, 3), { tone: "lo" }));
  out.push(S(k.slabOf({ x: 17, y: 56, w: 6, d: 9, r: 2.6 }, 0, 2.6, P, 5, 0.5), { tone: "mid" }));
  out.push(L(k.lineOnTop([20, 56.4], [20, 59.6], 2.6, P), { tone: "lo" }));
  return parte("navegador", "navegador", out.join(""));
}

/* ---------- Router: la salida a internet ---------- */
function router() {
  const out = [`<path class="iso-halo" d="${k.haloOf(ROUTER, 0, ROUTER_H, P)}" style="opacity:.3"/>`];
  const ant = (x, y) => out.push(S(k.cylinder(x, y, 0.75, ROUTER_H, 11, P, 14), { tone: "mid", crease: "none" }), S(k.cylinder(x, y, 1.1, ROUTER_H + 11, 1.4, P, 14), { tone: "mid" }));
  out.push(S(k.slabOf(ROUTER, 0, ROUTER_H, P, 4, 0.6), { tone: "hi", crease: "lo", inner: L(k.sideSeam(ROUTER, 1.4, P, 4), { tone: "faint" }) }));
  ant(ROUTER.x + 3, ROUTER.y + 3);
  ant(ROUTER.x + ROUTER.w - 3, ROUTER.y + 3);
  for (let i = 0; i < 4; i++) out.push(L(k.planOutline({ x: ROUTER.x + 4 + i * 2.6, y: ROUTER.y + 5, w: 1.2, d: 6, r: 0.6 }, ROUTER_H, P, 3), { tone: "lo" }));
  const y = ROUTER.y + ROUTER.d;
  out.push(`<g class="led" data-led="router">${circle([ROUTER.x + ROUTER.w - 4, y, 3], 0.95)}</g>`);
  out.push(D([0, 1, 2].map((i) => at([ROUTER.x + 3 + i * 2.4, y, 3])), { size: 0.55, tone: "mid" }));
  const x = ROUTER.x + ROUTER.w;
  out.push(L(rectX(x, 25.6, 30.4, 1.4, 3.4), { tone: "mid" }));
  out.push(S(k.slabOf({ x, y: 26.6, w: 1.4, d: 2.8, r: 0.3 }, 1, 2.8, P, 2), { tone: "mid", crease: "none" }));
  out.push(cable("router", R_CLIENTE2.slice(0, 3), "from"));
  return parte("router", "router", out.join(""));
}

/* ---------- La petición ---------- */
const PAQUETE = `<g data-paquete style="opacity:0"><circle class="paquete-halo" r="7"/><circle class="paquete" r="3"/></g>`;

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label: "Un rack de servidores sobre un banco. Arriba está el balanceador de carga; debajo, hasta cuatro servidores que entran como cajones y se pueden abrir para ver su procesador, su memoria, sus discos, sus ventiladores, su fuente y su tarjeta de red. Una bandeja lateral lleva los cables hacia una base de datos de discos apilados y hacia el router y el monitor del usuario. El rack se puede desarmar y cada pieza se puede inspeccionar.",
  body: [banco(), region(), cablesPiso(), rackFondo(), ranuras(), lateral(), techo(), cablesRack(), baseDatos(), router(), cliente(), PAQUETE],
});

/* ---------- Fichas de las piezas (la diapositiva las muestra) ---------- */
const FICHAS = {
  navegador: { nombre: "Navegador del usuario", capa: "Frontend", texto: "Aquí corre el frontend: el HTML, CSS y JavaScript que descargó tu navegador. Desde aquí sale cada petición y aquí se pinta la respuesta." },
  router: { nombre: "Router", capa: "Red", texto: "Saca tu petición de la red de tu casa hacia internet. Del otro lado, el proveedor de nube la recibe en su propia red." },
  region: { nombre: "Región sa-east-1", capa: "Infraestructura", texto: "Una región es una zona del mundo con varios centros de datos. sa-east-1 es la región de AWS en São Paulo (Brasil); la vas a elegir en la Actividad 1." },
  rack: { nombre: "Rack", capa: "Centro de datos", texto: "El gabinete metálico que sostiene los equipos. Un centro de datos tiene miles como este; en la nube los alquilas sin verlos ni tocarlos." },
  bandeja: { nombre: "Bandeja de cables", capa: "Red", texto: "Ordena los cables que unen los equipos. En la nube no ves cables: el proveedor los reemplaza por redes virtuales que configuras desde la consola." },
  balanceador: { nombre: "Balanceador de carga", capa: "Red", texto: "Recibe todas las peticiones y las reparte entre los servidores. Si uno falla, deja de enviarle tráfico y la app sigue en línea." },
  "red-lb": { nombre: "Placa de conmutación", capa: "Dentro del balanceador", texto: "Su chip decide, petición por petición, a qué puerto —es decir, a qué servidor— enviarla. Detrás de cada puerto hay un módulo de red." },
  servidor: { nombre: "Servidor de aplicaciones", capa: "Backend / API", texto: "Ejecuta el backend: valida los datos, aplica las reglas del negocio y arma la respuesta. Escalar horizontalmente es sumar más servidores como este." },
  cpu: { nombre: "Procesadores (CPU)", capa: "Dentro del servidor", texto: "Ejecutan las instrucciones de tu API. Escalar verticalmente es cambiarlos por unos con más núcleos o más rápidos." },
  ram: { nombre: "Memoria RAM", capa: "Dentro del servidor", texto: "Memoria de trabajo: guarda lo que el servidor usa en este momento, como los datos en caché. Ampliarla también es escalado vertical." },
  ssd: { nombre: "Discos del servidor", capa: "Dentro del servidor", texto: "Guardan el sistema operativo y el código de la app. Los datos de los usuarios no viven aquí, sino en la base de datos." },
  ventiladores: { nombre: "Ventiladores", capa: "Dentro del servidor", texto: "Empujan aire de adelante hacia atrás para enfriar el equipo. Los centros de datos gastan buena parte de su energía en refrigeración." },
  fuente: { nombre: "Fuente de poder", capa: "Dentro del servidor", texto: "Convierte la electricidad para el servidor. Muchos servidores llevan dos, para seguir funcionando si una falla." },
  nic: { nombre: "Tarjeta de red", capa: "Dentro del servidor", texto: "Conecta el servidor con el balanceador y con la base de datos. Por aquí entran las peticiones y salen las respuestas." },
  bd: { nombre: "Base de datos", capa: "Datos", texto: "Guarda la información de forma persistente y responde las consultas del backend. En la nube suele ser un servicio gestionado, como Amazon RDS." },
  discos: { nombre: "Discos de la base de datos", capa: "Datos", texto: "Aquí quedan los datos aunque todo se apague. Un servicio gestionado hace copias de seguridad automáticas de ellos." },
  controlador: { nombre: "Controlador de la base de datos", capa: "Datos", texto: "Recibe las consultas de los servidores y decide en qué disco leer o escribir." },
};

/* ---------- Datos para el código vivo ---------- */
const DATA = {
  P,
  modelo: MODELO,
  despiece: DESPIECE,
  slide: SLIDE,
  cables: CABLES,
  rutas: {
    cliente1: R_CLIENTE1.slice(0, -1).concat([[ROUTER.x - 3, 28, 0.6, "f"]]),
    cliente2: R_CLIENTE2, patch: R_PATCH, bd: R_DB,
  },
  barras: [0, 1, 2, 3].map((i) => ({ x: -31 + i * 5, y: FRONT, z0: LB_Z + 1.8, alto: 6.2 })),
  fichas: FICHAS,
  recorte: [0, fmt(TOPE_ARMADO), WIDTH, fmt(HEIGHT - TOPE_ARMADO)],
};

const LIVE = `
const DATA = ${JSON.stringify(DATA)};
const P = DATA.P, M = DATA.modelo, X = DATA.despiece;
const qs = new URLSearchParams(location.search);
const MODO = ['escalado', 'taller'].includes(qs.get('modo')) ? qs.get('modo') : 'viaje';
const still = matchMedia('(prefers-reduced-motion: reduce)');
const stage = document.querySelector('.iso-stage');
const svg = stage.querySelector('svg');
const readout = document.querySelector('[data-readout]');
const paquete = svg.querySelector('[data-paquete]');
const $ = (s) => svg.querySelector(s);
const $$ = (s) => [...svg.querySelectorAll(s)];
const avisar = (msg) => { try { parent.postMessage(Object.assign({ fuente: 'rack' }, msg), '*'); } catch (e) {} };
if (MODO !== 'taller') svg.setAttribute('viewBox', DATA.recorte.join(' '));

/* ---------- Estado ---------- */
const est = {
  servidores: Math.max(1, Math.min(M.maxServidores, +qs.get('servidores') || (MODO === 'escalado' ? 1 : MODO === 'taller' ? 4 : 3))),
  usuarios: MODO === 'escalado' ? 1000 : 0,
  siguiente: 0, peticiones: 0, ms: 0, fase: -1, servidor: 1,
  cola: [], accion: null, limite: Infinity, visible: true, activo: true, tour: MODO === 'viaje' && qs.get('tour') !== '0', ultimaMano: 0,
  reloj: 0, desarmado: false, sel: null, hover: null, abierta: null,
  // Velocidad de la petición: 1 = la original; por defecto más lenta para poder seguirla con la vista
  vel: Math.max(0.15, Math.min(2, +qs.get('vel') || (MODO === 'escalado' ? 1 : 0.55))),
};
const cajon = {};
for (let s = 1; s <= M.maxServidores; s++) cajon[s] = { off: s <= est.servidores ? 0 : DATA.slide, alfa: s <= est.servidores ? 1 : 0 };

/* ---------- Despiece: un resorte por conjunto y uno por unidad abierta ---------- */
const nuevo = () => ({ x: 0, v: 0, objetivo: 0, pendiente: null });
const ex = {}; X.orden.forEach((g) => { ex[g] = nuevo(); });
const ab = {}; ['srv-1', 'srv-2', 'srv-3', 'srv-4', 'lb', 'bd'].forEach((u) => { ab[u] = nuevo(); });
const RANGO = { 'srv-4': 0, 'srv-3': 1, 'srv-2': 2, 'srv-1': 3, lb: 4, techo: 5 };
function resorte(s, dt, calma) {
  if (s.pendiente && est.reloj >= s.pendiente.at) { s.objetivo = s.pendiente.valor; s.pendiente = null; }
  if (calma) { s.x = s.objetivo; s.v = 0; return !!s.pendiente; }
  for (let i = 0; i < 4; i++) { const h = dt / 4; s.v += (X.resorte.rigidez * (s.objetivo - s.x) - X.resorte.freno * s.v) * h; s.x += s.v * h; }
  if (Math.abs(s.objetivo - s.x) < 1e-3 && Math.abs(s.v) < 1e-3) { s.x = s.objetivo; s.v = 0; }
  return s.x !== s.objetivo || s.v !== 0 || !!s.pendiente;
}
/** Desarmar o armar: al abrir sale primero el de afuera; al cerrar vuelve primero el de adentro. */
function desarmar(valor) {
  est.desarmado = valor;
  const orden = valor ? X.orden : [...X.orden].reverse();
  // Solo se reprograma lo que cambia, en su orden: el último en salir es el primero en volver
  const cambian = orden.filter((g) => (ex[g].pendiente ? ex[g].pendiente.valor : ex[g].objetivo) !== (valor ? 1 : 0));
  cambian.forEach((g, i) => { ex[g].pendiente = { valor: valor ? 1 : 0, at: est.reloj + i * X.escalon }; });
  avisar({ tipo: 'desarmado', valor }); correr();
}
function abrir(u) {
  est.abierta = u;
  Object.keys(ab).forEach((k) => { ab[k].pendiente = null; ab[k].objetivo = k === u ? 1 : 0; });
  correr();
}
/** Desplazamiento de cada conjunto en el mundo, según los resortes. */
function desplazamientos() {
  const o = {};
  const sube = (rango) => Object.keys(RANGO).filter((u) => ab[u] && RANGO[u] < rango).reduce((a, u) => a + ab[u].x * X.abrir, 0);
  for (let s = 1; s <= 4; s++) {
    const g = 'srv-' + s, r = RANGO[g];
    const z = ex[g].x * X.paso * (r + 1) + sube(r);
    // Al abrirse, el cajón sale hacia adelante sobre sus rieles para dejar ver su interior
    o[g] = [0, cajon[s].off + ab[g].x * X.sacar, z];
    o['ciega-' + s] = [0, 0, z];
    // La tapa se desliza hacia atrás (queda sobre el rack) y se levanta: el interior queda a la vista
    o['lid-' + g] = [0, -ab[g].x * X.sacar, ab[g].x * X.tapa];
  }
  o.lb = [0, ab.lb.x * X.sacar, ex.lb.x * X.paso * 5 + sube(4)];
  o['lid-lb'] = [0, -ab.lb.x * X.sacar, ab.lb.x * X.tapa];
  o.techo = [0, 0, ex.techo.x * X.paso * 6 + sube(5)];
  o.lateral = [ex.lateral.x * X.lateral, 0, 0];
  const gap = ex.bd.x * X.bdPaso + ab.bd.x * X.bdAbrir;
  [0, 1, 2].forEach((i) => { o['bd-' + i] = [0, 0, gap * (i + 1)]; });
  o['bd-tapa'] = [0, 0, gap * 4];
  o.f = [0, 0, 0];
  return o;
}
let ultimo = '';
function pintarDespiece() {
  const o = desplazamientos();
  const firma = JSON.stringify(o);
  if (firma === ultimo) return;
  ultimo = firma;
  $$('[data-g]').forEach((el) => {
    const v = o[el.dataset.g] || [0, 0, 0];
    if (!v[0] && !v[1] && !v[2]) el.removeAttribute('transform'); else el.setAttribute('transform', translateAlong(P, v));
  });
  // Los cables siguen a los conjuntos a los que están sujetos
  DATA.cables.forEach((c) => {
    const el = $('[data-cable="' + c.id + '"]'); if (!el) return;
    const pts = c.pts.map((p) => punto(p, o));
    el.querySelector('path').setAttribute('d', pathOf(pts));
    const cs = el.querySelectorAll('circle');
    const extremos = c.ends === 'both' ? [pts[0], pts[pts.length - 1]] : c.ends === 'from' ? [pts[0]] : c.ends === 'to' ? [pts[pts.length - 1]] : [];
    extremos.forEach((p, i) => { if (cs[i]) { cs[i].setAttribute('cx', p[0].toFixed(1)); cs[i].setAttribute('cy', p[1].toFixed(1)); } });
  });
}
function punto(p, o) { const v = o[p[3]] || [0, 0, 0]; return iso([p[0] + v[0], p[1] + v[1], p[2] + v[2]], P); }

/* Rutas del paquete, calculadas con la posición actual de cada conjunto */
function ruta(plantilla) {
  const o = desplazamientos();
  const pts = plantilla.map((p) => punto(p, o));
  const acc = [0]; for (let i = 1; i < pts.length; i++) acc.push(acc[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  return { pts, acc, largo: acc[acc.length - 1] };
}
function puntoEn(r, d) {
  d = Math.max(0, Math.min(r.largo, d));
  let i = 1; while (i < r.acc.length - 1 && r.acc[i] < d) i++;
  const t = (d - r.acc[i - 1]) / ((r.acc[i] - r.acc[i - 1]) || 1);
  return [r.pts[i - 1][0] + (r.pts[i][0] - r.pts[i - 1][0]) * t, r.pts[i - 1][1] + (r.pts[i][1] - r.pts[i - 1][1]) * t];
}

function pintarCajon(s) {
  const c = cajon[s];
  const g = $('[data-servidor="' + s + '"]');
  g.style.opacity = c.alfa.toFixed(3);
  g.style.display = c.alfa < 0.01 ? 'none' : '';
  const tapa = $('[data-ciega="' + s + '"]');
  tapa.style.opacity = (1 - c.alfa).toFixed(3);
  tapa.style.display = c.alfa > 0.99 && c.off === 0 ? 'none' : '';
  $$('[data-servidor-cable="' + s + '"]').forEach((e) => { e.style.opacity = (Math.max(0, 1 - c.off / 4) * c.alfa).toFixed(3); });
}

function led(id, on, clase) {
  const e = $('[data-led="' + id + '"]'); if (!e) return;
  if (on) e.setAttribute('data-on', clase || ''); else e.removeAttribute('data-on');
}

/* Barras del balanceador: carga de cada servidor (0..1) */
const carga = [0, 0, 0, 0];
function pintarBarras() {
  const ls = $$('[data-barras] path');
  DATA.barras.forEach((b, i) => {
    const h = 0.8 + Math.min(1, carga[i]) * (b.alto - 0.8);
    ls[i].setAttribute('d', pathOf([iso([b.x, b.y, b.z0], P), iso([b.x, b.y, b.z0 + h], P)]));
    ls[i].setAttribute('data-tone', i < est.servidores ? (carga[i] > 1 ? 'red' : 'hi') : 'lo');
  });
}
function cargaObjetivo() {
  if (MODO !== 'escalado') return [0, 1, 2, 3].map((i) => i < est.servidores ? 0.25 : 0);
  const porServidor = est.usuarios / est.servidores / M.capacidadPorServidor;
  return [0, 1, 2, 3].map((i) => i < est.servidores ? porServidor : 0);
}
const sobrecarga = () => MODO === 'escalado' && est.usuarios > est.servidores * M.capacidadPorServidor;

/* ---------- Selección de piezas ---------- */
const UNIDAD = (id) => { const m = /-(\\d)$/.exec(id); if (/^(servidor|cpu|ram|ssd|ventiladores|fuente|nic)-/.test(id)) return 'srv-' + m[1]; if (id === 'balanceador' || id === 'placa-lb') return 'lb'; if (['bd', 'discos', 'controlador'].includes(id)) return 'bd'; return null; };
function ficha(id) {
  if (!id) return null;
  const el = $('[data-parte="' + id + '"]'); if (!el) return null;
  const f = DATA.fichas[el.dataset.clase] || {};
  const n = /-(\\d)$/.exec(id);
  const nombre = f.nombre + (n && el.dataset.clase === 'servidor' ? ' ' + n[1] : '');
  return { id, clase: el.dataset.clase, nombre, capa: f.capa, texto: f.texto, servidor: n ? +n[1] : null };
}
function marcar() {
  const sel = est.sel ? $$('[data-parte="' + est.sel + '"]') : [];
  $$('[data-parte]').forEach((el) => {
    const on = sel.includes(el);
    const pariente = sel.some((s) => s.contains(el) || el.contains(s));
    el.toggleAttribute('data-sel', on);
    el.toggleAttribute('data-atenuado', !!est.sel && !on && !pariente);
    el.toggleAttribute('data-hover', !on && est.hover === el.dataset.parte);
  });
  svg.toggleAttribute('data-foco', !!est.sel);
}
function seleccionar(id, origen) {
  if (id && !$('[data-parte="' + id + '"]')) id = null;
  est.sel = id;
  const u = id ? UNIDAD(id) : null;
  // Abrir una unidad del rack lo desarma: así sube y su interior no queda detrás del monitor
  if (u && u !== 'bd' && !est.desarmado) desarmar(true);
  abrir(u);
  marcar(); decir();
  avisar({ tipo: 'seleccion', parte: ficha(id), origen: origen || 'figura' });
}
const ORDEN_PIEZAS = ['navegador', 'router', 'balanceador', 'placa-lb', 'servidor-1', 'cpu-1', 'ram-1', 'ssd-1', 'ventiladores-1', 'fuente-1', 'nic-1', 'bd', 'discos', 'controlador', 'bandeja', 'rack', 'region'];

const miles = (n) => n.toLocaleString('es-CO');
function decir() {
  let t;
  if (MODO === 'taller') {
    const f = ficha(est.hover && est.hover !== est.sel ? est.hover : est.sel);
    t = f ? f.nombre : (est.desarmado ? 'Desarmado · clic en una pieza' : 'Clic en una pieza para inspeccionarla');
  } else if (MODO === 'escalado') {
    const cap = est.servidores * M.capacidadPorServidor;
    t = miles(est.usuarios) + ' usuarios · capacidad ' + miles(cap) + (sobrecarga() ? ' · SOBRECARGA' : ' · en línea');
  } else if (est.fase < 0) t = 'Clic para enviar una petición';
  else t = 'Petición ' + est.peticiones + ' · servidor ' + est.servidor + ' · ' + est.ms + ' ms';
  if (readout.textContent !== t) readout.textContent = t;
  stage.setAttribute('aria-label', 'Rack de la app: ' + t);
}

/* ---------- Guion de una petición ---------- */
const FASES = ['usuario', 'balanceador', 'servidor', 'bd', 'respuesta'];
const RUTA = { cliente1: DATA.rutas.cliente1, cliente2: DATA.rutas.cliente2, patch: DATA.rutas.patch, bd: DATA.rutas.bd };
function guion() {
  const L = M.latencia;
  const s = 1 + (est.siguiente % est.servidores); est.siguiente++;
  const q = [];
  const fase = (n, extra) => q.push({ tipo: 'fase', fase: n, alEmpezar: extra });
  const mover = (plantilla, inverso, ms) => q.push({ tipo: 'mover', plantilla, inverso, ms });
  const espera = (dur, alEmpezar, alTerminar) => q.push({ tipo: 'espera', dur, alEmpezar, alTerminar });
  fase(0, () => { est.peticiones++; est.ms = 0; est.servidor = s; pantalla('espera'); led('cli', true); setTimeout(() => led('cli', false), 300); });
  mover(RUTA.cliente1, false, L.red);
  espera(0.35, () => led('router', true), () => led('router', false));
  mover(RUTA.cliente2, false, L.internet);
  fase(1);
  espera(0.55, () => { led('lb-' + s, true); carga[s - 1] = Math.max(carga[s - 1], 0.9); });
  mover(RUTA.patch[s - 1], false, L.balanceador + L.red);
  fase(2);
  espera(0.8, () => led('srv-' + s, true));
  fase(3);
  mover(RUTA.bd[s - 1], false, L.api + L.red);
  espera(0.7, () => { led('bd', true); discos(true); }, () => { led('bd', false); discos(false); });
  fase(4);
  mover(RUTA.bd[s - 1], true, L.bd + L.red);
  espera(0.25, null, () => led('srv-' + s, false));
  mover(RUTA.patch[s - 1], true, L.red);
  espera(0.2, null, () => led('lb-' + s, false));
  mover(RUTA.cliente2, true, L.internet);
  espera(0.25, () => led('router', true), () => led('router', false));
  mover(RUTA.cliente1, true, L.red);
  espera(0.9, () => { pantalla('perfil'); led('cli', true); }, () => led('cli', false));
  q.push({ tipo: 'fin' });
  return q;
}
function pantalla(cual) {
  $('[data-pantalla="espera"]').style.opacity = cual === 'espera' ? 1 : 0;
  $('[data-pantalla="perfil"]').style.opacity = cual === 'perfil' ? 1 : 0;
}
function discos(on) { $$('[data-disco]').forEach((d) => d.toggleAttribute('data-lit', on)); }
function enviar(limite) {
  if (est.cola.length || est.accion) { if (limite !== undefined) est.limite = limite; return false; }
  est.cola = guion(); est.limite = limite === undefined ? Infinity : limite;
  correr(); return true;
}

/* ---------- Bucle ---------- */
let frame = 0, last = 0;
function siguienteAccion() {
  while (!est.accion && est.cola.length) {
    const a = est.cola[0];
    if (a.tipo === 'fase') {
      if (a.fase > est.limite) return; // modo paso a paso: espera la orden
      est.cola.shift(); est.fase = a.fase; if (a.alEmpezar) a.alEmpezar();
      avisar({ tipo: 'fase', fase: a.fase, nombre: FASES[a.fase], servidor: est.servidor, ms: est.ms });
      decir(); continue;
    }
    if (a.tipo === 'fin') { est.cola.shift(); avisar({ tipo: 'fin', servidor: est.servidor, ms: est.ms }); decir(); return; }
    est.cola.shift();
    est.accion = Object.assign({ t: 0 }, a);
    if (a.tipo === 'mover') { est.accion.r = ruta(a.plantilla); est.accion.dur = 0.0042 * est.accion.r.largo + 0.25; }
    if (a.alEmpezar) a.alEmpezar();
  }
}
function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 20) : 1 / 60; last = now;
  est.reloj += dt;
  const calma = still.matches;
  const rapido = MODO === 'escalado' ? 2.2 : 1;
  siguienteAccion();
  const a = est.accion;
  if (a) {
    a.t += dt * rapido * est.vel;
    if (a.tipo === 'mover') {
      const u = Math.min(1, a.t / (calma ? 0.001 : a.dur));
      const e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
      const p = puntoEn(a.r, (a.inverso ? 1 - e : e) * a.r.largo);
      paquete.setAttribute('transform', 'translate(' + p[0].toFixed(2) + ' ' + p[1].toFixed(2) + ')');
      paquete.style.opacity = calma ? 0 : Math.min(1, Math.min(u, 1 - u) * 14 + 0.15).toFixed(3);
      if (u >= 1) { est.ms += a.ms; paquete.style.opacity = 0; est.accion = null; decir(); }
    } else if (a.tipo === 'espera') {
      if (a.t >= (calma ? 0.001 : a.dur)) { if (a.alTerminar) a.alTerminar(); est.accion = null; }
    }
  }
  let quietos = true;
  // Cajones del simulador de escalado
  for (let s = 1; s <= M.maxServidores; s++) {
    const c = cajon[s], dentro = s <= est.servidores;
    const offObj = dentro ? 0 : DATA.slide, alfaObj = dentro ? 1 : 0;
    const f = calma ? 1 : 1 - Math.exp(-dt / 0.22);
    if (dentro) { c.alfa += (alfaObj - c.alfa) * (calma ? 1 : 1 - Math.exp(-dt / 0.08)); if (c.alfa > 0.6) c.off += (offObj - c.off) * f; }
    else { c.off += (offObj - c.off) * f; if (c.off > DATA.slide - 3) c.alfa += (alfaObj - c.alfa) * (calma ? 1 : 1 - Math.exp(-dt / 0.1)); }
    if (Math.abs(c.off - offObj) < 0.02) c.off = offObj;
    if (Math.abs(c.alfa - alfaObj) < 0.004) c.alfa = alfaObj;
    if (c.off !== offObj || c.alfa !== alfaObj) quietos = false;
    pintarCajon(s);
  }
  // Resortes del despiece
  Object.values(ex).forEach((s) => { if (resorte(s, dt, calma)) quietos = false; });
  Object.values(ab).forEach((s) => { if (resorte(s, dt, calma)) quietos = false; });
  pintarDespiece();
  // Barras de carga
  const obj = cargaObjetivo();
  for (let i = 0; i < 4; i++) { const n = carga[i] + (obj[i] - carga[i]) * (calma ? 1 : 1 - Math.exp(-dt / 0.5)); if (Math.abs(n - carga[i]) > 0.002) quietos = false; carga[i] = Math.abs(n - obj[i]) < 0.002 ? obj[i] : n; }
  pintarBarras();
  svg.toggleAttribute('data-sobrecarga', sobrecarga());
  if (!est.accion && !est.cola.length && est.tour && !calma && performance.now() - est.ultimaMano > 5000) enviar();
  const ocupado = est.accion || (est.cola.length && est.cola[0].tipo !== 'fase') || (est.cola.length && est.cola[0].fase <= est.limite);
  const sigue = est.visible && est.activo && (ocupado || !quietos || (est.tour && !calma));
  frame = sigue ? requestAnimationFrame(tick) : 0;
}
function correr() { if (!frame && est.visible && est.activo) { last = 0; frame = requestAnimationFrame(tick); } }

/* ---------- Órdenes desde la diapositiva ---------- */
function mano() { est.ultimaMano = performance.now(); }
const ORDENES = {
  enviar() { mano(); est.tour = false; enviar(); },
  paso() {
    mano(); est.tour = false;
    if (!est.cola.length && !est.accion) { enviar(0); return; }
    est.limite = est.fase + 1; correr();
  },
  reiniciar() { mano(); est.cola = []; est.accion = null; est.fase = -1; est.peticiones = 0; est.ms = 0; paquete.style.opacity = 0; ['lb-1','lb-2','lb-3','lb-4','srv-1','srv-2','srv-3','srv-4','bd','cli','router'].forEach((id) => led(id, false)); discos(false); pantalla('espera'); decir(); avisar({ tipo: 'fase', fase: -1 }); correr(); },
  servidores(m) { est.servidores = Math.max(1, Math.min(M.maxServidores, m.n | 0)); est.siguiente = 0; decir(); correr(); avisar({ tipo: 'servidores', n: est.servidores }); },
  carga(m) { est.usuarios = Math.max(0, m.usuarios | 0); decir(); correr(); },
  tour(m) { est.tour = !!m.valor; correr(); },
  activo(m) { est.activo = !!m.valor; if (est.activo) correr(); },
  velocidad(m) { est.vel = Math.max(0.15, Math.min(2, +m.valor || 0.55)); },
  desarmar(m) { mano(); desarmar(m.valor === undefined ? !est.desarmado : !!m.valor); decir(); },
  seleccionar(m) { mano(); seleccionar(m.id || null, 'diapositiva'); },
};
addEventListener('message', (e) => { const m = e.data; if (m && m.destino === 'rack' && ORDENES[m.tipo]) ORDENES[m.tipo](m); });

/* ---------- Puntero y teclado ---------- */
const parteEn = (e) => { const p = e.target.closest && e.target.closest('[data-parte]'); return p ? p.dataset.parte : null; };
stage.addEventListener('click', (e) => {
  if (MODO === 'taller') { mano(); const id = parteEn(e); seleccionar(id === est.sel ? null : id); }
  else ORDENES.enviar();
});
stage.addEventListener('pointermove', (e) => {
  if (MODO !== 'taller') return;
  const id = parteEn(e);
  if (id !== est.hover) { est.hover = id; marcar(); decir(); }
});
stage.addEventListener('pointerleave', () => { if (est.hover) { est.hover = null; marcar(); decir(); } });
stage.addEventListener('keydown', (e) => {
  if (MODO === 'taller') {
    const i = ORDEN_PIEZAS.indexOf(est.sel);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); seleccionar(ORDEN_PIEZAS[(i + 1) % ORDEN_PIEZAS.length]); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); seleccionar(ORDEN_PIEZAS[(i - 1 + ORDEN_PIEZAS.length) % ORDEN_PIEZAS.length]); }
    if (e.key === 'Escape') seleccionar(null);
    if (e.key === 'd' || e.key === 'D') ORDENES.desarmar({});
    return;
  }
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ORDENES.enviar(); }
  if (MODO === 'escalado' && (e.key === 'ArrowUp' || e.key === 'ArrowRight')) { e.preventDefault(); ORDENES.servidores({ n: est.servidores + 1 }); }
  if (MODO === 'escalado' && (e.key === 'ArrowDown' || e.key === 'ArrowLeft')) { e.preventDefault(); ORDENES.servidores({ n: est.servidores - 1 }); }
});
new IntersectionObserver((en) => { est.visible = en[en.length - 1].isIntersecting; if (est.visible) correr(); }).observe(stage);
if (MODO === 'escalado') est.tour = true;
svg.setAttribute('data-modo', MODO);
pantalla('espera');
for (let s = 1; s <= M.maxServidores; s++) pintarCajon(s);
ultimo = ''; pintarDespiece(); pintarBarras(); decir(); correr();
const pista = document.querySelector('[data-corner="hint"]');
if (pista) pista.textContent = MODO === 'escalado' ? '↑ ↓: meter o sacar servidores' : MODO === 'taller' ? 'Clic: inspeccionar · D: desarmar' : 'Clic o Enter: enviar una petición';
avisar({ tipo: 'listo', modo: MODO });
// La diapositiva ajusta el alto del iframe a la tarjeta
const alto = () => avisar({ tipo: 'alto', px: Math.ceil(document.querySelector('.iso-figure').getBoundingClientRect().height) });
addEventListener('resize', alto); alto();
window.__rack = { est, ORDENES, cajon, ex, ab };
`;

/* ---------- Página ---------- */
const EXTRA_CSS = `
.iso[data-theme="light"]{--anatomy-page:transparent;--acento:#0e7490;--acento-suave:#67e8f9}
html{color-scheme:light;background:transparent}
.iso-page{width:100%;margin:0}
.iso-figure{margin:0}
.iso-plate{padding:40px 14px 44px}
.iso-stage{cursor:pointer;outline:none;border-radius:4px;touch-action:manipulation}
.iso-stage:focus-visible{box-shadow:0 0 0 2px var(--acento)}
.cable .iso-line{stroke-width:1.1px}
.led circle{fill:var(--anatomy-lo);transition:fill .25s}
.led[data-on] circle{fill:var(--acento);filter:drop-shadow(0 0 2px var(--acento-suave))}
[data-sobrecarga] [data-led^="srv-"] circle{fill:var(--anatomy-red);animation:alarma .5s steps(2,end) infinite}
@keyframes alarma{50%{fill:var(--anatomy-lo)}}
[data-pantalla]{transition:opacity .35s}
[data-disco][data-lit] .iso-top{fill:#ecfeff}
[data-disco][data-lit] .iso-edge{stroke:var(--acento)}
.paquete{fill:var(--acento);stroke:#fff;stroke-width:1.2}
.paquete-halo{fill:var(--acento);opacity:.22;filter:blur(1.5px)}
/* Taller: pieza elegida en el acento; el resto baja un tono (sin transparencias: nada se ve a través) */
[data-modo="taller"] [data-parte]{cursor:pointer}
[data-parte][data-sel]{--anatomy-hi:var(--acento);--anatomy-mid:#2b8aa0;--anatomy-top:#effcfe;--anatomy-shade-0:#c9e6ec;--anatomy-shade-1:#d5ecf1;--anatomy-shade-2:#e0f2f6;--anatomy-shade-3:#eaf8fa}
[data-parte][data-sel] .iso-edge{stroke-width:1.2px}
[data-parte][data-hover]{--anatomy-hi:#155e75;--anatomy-top:#f6fdfe}
[data-foco] [data-atenuado],[data-foco] .fondo{--anatomy-hi:#8a8a8f;--anatomy-mid:#b4b4b8;--anatomy-lo:#d0d0d3;--anatomy-faint:#e2e2e4;--anatomy-dot:#a8a8ac}
@media (prefers-reduced-motion:reduce){.led circle,[data-pantalla]{transition:none}[data-sobrecarga] [data-led^="srv-"] circle{animation:none}}
`;

const body = k.plateHtml({
  fig: "Fig 1",
  title: "Rack de la app",
  hint: "Clic o Enter: enviar una petición",
  readout: "Clic para enviar una petición",
  body: `<div class="iso-stage" tabindex="0" role="application" aria-label="Rack de la app">${svg}</div>`,
});

let html = k.pageHtml({ title: "Rack de la app", theme: "light", body, script: kitScript() + LIVE });
html = html.replace('<html lang="en">', '<html lang="es">').replace("</style>", EXTRA_CSS + "</style>");
writeFileSync(join(HERE, "rack.html"), html);
console.log("rack.html", (html.length / 1024).toFixed(0) + " KB", "· piezas:", (svg.match(/data-parte=/g) || []).length, "· sólidos:", (svg.match(/class="iso-fill"/g) || []).length);
