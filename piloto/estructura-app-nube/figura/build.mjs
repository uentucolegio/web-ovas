/* =========================================================
   Figura isométrica "Rack de la app" (skill Anatomy)
   Un rack de servidores sobre un banco: el balanceador arriba,
   hasta cuatro servidores que entran como cajones, una bandeja de
   cables, una base de datos de discos apilados y el monitor del
   usuario. Una petición recorre los cables de ida y de vuelta.

   Genera rack.html (página autónoma, tema claro) que el piloto
   carga en un <iframe>:  node build.mjs
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
const HEIGHT = 440;

/* ---------- Modelo: lo que la figura dice es verdad aquí ---------- */
const MODELO = {
  capacidadPorServidor: 3000,         // usuarios simultáneos por servidor (igual que el simulador del OVA)
  maxServidores: 4,
  latencia: { internet: 35, balanceador: 2, red: 1, api: 12, bd: 8 }, // ms ilustrativos de cada tramo
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

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0), ...k.boxCorners(RACK, 0, CAP_Z + CAP_H), [DB_C[0] + 16, DB_C[1], 40]],
  WIDTH, HEIGHT, { pad: 26, azimuth: 52 },
);

const at = (p) => k.iso(p, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const poly = (pts, closed = false) => k.pathOf(pts.map(at), closed);
const byDepth = (pts) => [...pts].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
/** Rectángulo cerrado en una cara frontal (plano y = cte). */
const rectY = (y, x0, x1, z0, z1) => poly([[x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]], true);
/** Rectángulo cerrado en una cara lateral (plano x = cte). */
const rectX = (x, y0, y1, z0, z1) => poly([[x, y0, z0], [x, y1, z0], [x, y1, z1], [x, y0, z1]], true);
const fmt = (n) => Math.round(n * 10) / 10;
const circle = (p, r, attrs = "") => { const [x, y] = at(p); return `<circle cx="${fmt(x)}" cy="${fmt(y)}" r="${r}"${attrs}/>`; };

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
  // Placa de la región, con su único rótulo grabado
  const plate = { x: 84, y: 28, w: 30, d: 22, r: 1.2 };
  out.push(S(k.slabOf(plate, 0, 0.8, P, 4), { tone: "lo", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(plate, 1.6), 0.8, P, 4), { tone: "faint" }));
  out.push(k.faceTextSvg(k.topMatrix([plate.x + 4, plate.y + 7], 0.8, P, "x"), "sa-east-1", { size: 3.4, tone: "mid" }));
  [[4, 22], [4, 16], [4, 19]].forEach(([dx, len], i) => out.push(L(k.lineOnTop([plate.x + dx, plate.y + 11 + i * 3], [plate.x + dx + len, plate.y + 11 + i * 3], 0.8, P), { tone: "lo", free: true })));
  out.push(D([at([plate.x + 2.6, plate.y + 2.6, 0.8]), at([plate.x + plate.w - 2.6, plate.y + plate.d - 2.6, 0.8])], { size: 0.45 }));
  return out.join("");
}

/* ---------- Cables (rutas en 3D; el paquete las recorre) ---------- */
const MON_PORT = [15.4, 44, 15];
const ROUTER = { x: 30, y: 22, w: 18, d: 12, r: 1.5 };
const ROUTER_H = 5;
// Del monitor al router (entra por su cara trasera) y del router a la bandeja
const R_CLIENTE1 = [MON_PORT, [18.5, 44, 15], [18.5, 44, 0.6], [18.5, 28, 0.6], [ROUTER.x, 28, 0.6]];
const R_CLIENTE2 = [[ROUTER.x + ROUTER.w + 1.4, 28, 2.4], [CABLE_X, 28, 2.4], [CABLE_X, 28, 0.6], [CABLE_X, CLIENT_Y, 0.6], [CABLE_X, CLIENT_Y, LB_Z + 5.5], [TRAY.x + TRAY.w + 1.4, CLIENT_Y, LB_Z + 5.5]];
const portZ = (s) => slotZ(s) + 6.2;
const trayZ = (s) => slotZ(s) + 7.5;
const R_PATCH = [1, 2, 3, 4].map((s) => {
  const x = PORT_X[s - 1];
  return [[x, FRONT, LB_Z + 3], [x, FRONT + 2.4, LB_Z + 2], [x, FRONT + 2.4, portZ(s) + 1.2], [x, FRONT, portZ(s)]];
});
const R_DB = [1, 2, 3, 4].map((s) => {
  const y = SERVER_Y[s - 1];
  return [[TRAY.x + TRAY.w + 1.4, y, trayZ(s)], [CABLE_X, y, trayZ(s)], [CABLE_X, y, 0.6], [DB_BLOCK.x, y, 0.6], [DB_BLOCK.x, y, PLINTH_H], [SOCKET_X - 1.4, y, PLINTH_H]];
});
const cable = (pts, attrs = "", ends = "both") => `<g class="cable"${attrs}>${k.wireSvg(at(pts[0]), at(pts[pts.length - 1]), { via: pts.slice(1, -1).map(at), tone: "mid", size: 0.9, ends })}</g>`;

/** Tramos de piso: se dibujan antes del rack (quedan delante y por debajo de todo). */
function cablesPiso() {
  const out = [`<g class="cable" data-cable="cliente-piso">${L(poly(R_CLIENTE1.slice(2)), { tone: "mid" })}${L(poly(R_CLIENTE2.slice(2, 5)), { tone: "mid" })}</g>`];
  R_DB.forEach((r, i) => out.push(`<g class="cable" data-cable="bd-${i + 1}-piso" data-servidor-cable="${i + 1}">${L(poly(r.slice(2, 5)), { tone: "mid" })}</g>`));
  return out.join("");
}

/* ---------- Rack ---------- */
function rackFondo() {
  const out = [`<path class="iso-halo" d="${k.haloOf(RACK, 0, CAP_Z, P)}" style="opacity:.25"/>`];
  out.push(S(k.slabOf(RACK, 0, PLINTH_H, P, 3, 0.5), { tone: "mid", inner: L(k.sideSeam(RACK, 2.4, P, 3), { tone: "faint" }) }));
  out.push(S(k.slabOf({ x: RACK.x, y: RACK.y, w: RACK.w, d: 2, r: 0.4 }, PLINTH_H, CAP_Z - PLINTH_H, P, 2), { tone: "lo" }));       // panel trasero
  out.push(S(k.slabOf({ x: RACK.x, y: RACK.y, w: 4, d: RACK.d, r: 0.4 }, PLINTH_H, CAP_Z - PLINTH_H, P, 2, 0.4), { tone: "mid" })); // panel izquierdo
  // Agujeros de montaje en el canto frontal del panel izquierdo
  const holes = [];
  for (let z = PLINTH_H + 2; z < CAP_Z - 1; z += 3) holes.push(at([RACK.x + 2, FRONT, z]));
  out.push(D(holes, { size: 0.42, tone: "lo" }));
  return out.join("");
}

function orejas(z0, h) {
  const out = [];
  for (const x of [UNIT.x, UNIT.x + UNIT.w - 3.4]) {
    out.push(S(k.slabOf({ x, y: FRONT, w: 3.4, d: 1, r: 0.3 }, z0 + 0.8, h - 1.6, P, 2), { tone: "mid", crease: "none" }));
    out.push(D([at([x + 1.7, FRONT + 1, z0 + 2.6]), at([x + 1.7, FRONT + 1, z0 + h - 2.6])], { size: 0.45, tone: "mid" }));
  }
  return out.join("");
}

function balanceador() {
  const z0 = LB_Z, out = [];
  out.push(S(k.slabOf(UNIT, z0 + 0.3, LB_H - 0.6, P, 2, 0.4), { tone: "hi", crease: "lo" }));
  // Pantalla LCD con la carga de cada servidor (barras vivas)
  out.push(L(rectY(FRONT, -34, -14, z0 + 1.8, z0 + 8.6), { tone: "mid" }));
  out.push(`<g data-barras>${[0, 1, 2, 3].map((i) => L(poly([[-31 + i * 5, FRONT, z0 + 1.8], [-31 + i * 5, FRONT, z0 + 2.6]]), { tone: "lo", free: "end" })).join("")}</g>`);
  // Rejilla de ventilación
  const vent = [];
  for (let x = -9; x <= 15; x += 2) for (let z = z0 + 2.4; z <= z0 + 8.4; z += 2) vent.push(at([x, FRONT, z]));
  out.push(D(vent, { size: 0.36, tone: "lo" }));
  // Puertos y LED de cada servidor
  PORT_X.forEach((x, i) => {
    out.push(L(rectY(FRONT, x - 1.3, x + 1.3, z0 + 1.8, z0 + 4.2), { tone: "mid" }));
    out.push(`<g class="led" data-led="lb-${i + 1}">${circle([x, FRONT, z0 + 6.6], 1.05)}</g>`);
  });
  out.push(orejas(z0, LB_H));
  return out.join("");
}

function servidor(s) {
  const z0 = slotZ(s), out = [];
  // El cajón completo: se ven su tapa y su costado cuando sale del rack
  out.push(S(k.slabOf(UNIT, z0 + 0.3, SLOT_H - 0.6, P, 2, 0.4), { tone: "hi", crease: "lo", inner: L(k.sideSeam(UNIT, z0 + SLOT_H / 2, P, 2), { tone: "faint" }) }));
  // Cuatro bahías de disco con su pestillo y su luz
  for (let b = 0; b < 4; b++) {
    const x0 = -36 + b * 8.6;
    out.push(L(rectY(FRONT, x0, x0 + 7.6, z0 + 2.2, z0 + SLOT_H - 2.2), { tone: "mid" }));
    out.push(L(rectY(FRONT, x0 + 1.6, x0 + 6, z0 + SLOT_H - 5, z0 + SLOT_H - 3.6), { tone: "lo" }));
    out.push(D([at([x0 + 3.8, FRONT, z0 + 4])], { size: 0.5, tone: "mid" }));
  }
  // Rejilla
  const vent = [];
  for (let x = 0; x <= 14; x += 2) for (let z = z0 + 3; z <= z0 + SLOT_H - 3; z += 2) vent.push(at([x, FRONT, z]));
  out.push(D(vent, { size: 0.36, tone: "lo" }));
  // Luz de actividad del servidor
  out.push(`<g class="led" data-led="srv-${s}">${circle([19, FRONT, z0 + 10.4], 1.15)}</g>`);
  // Tarjeta de red: cuatro puertos (el del servidor s recibe el cable del balanceador)
  PORT_X.forEach((x) => out.push(L(rectY(FRONT, x - 1.2, x + 1.2, z0 + 5, z0 + 7.4), { tone: "mid" })));
  out.push(orejas(z0, SLOT_H));
  return out.join("");
}

function tapa(s) {
  const z0 = slotZ(s), out = [];
  const plan = { x: UNIT.x, y: FRONT - 1, w: UNIT.w, d: 1.6, r: 0.3 };
  out.push(S(k.slabOf(plan, z0 + 0.3, SLOT_H - 0.6, P, 2, 0.3), { tone: "mid" }));
  const y = plan.y + plan.d;
  for (let i = 0; i < 3; i++) {
    const zc = z0 + 4 + i * 3.5;
    out.push(L(rectY(y, -28, 28, zc - 0.6, zc + 0.6), { tone: "lo" }));
  }
  out.push(D([at([UNIT.x + 1.7, y, z0 + 2.6]), at([UNIT.x + 1.7, y, z0 + SLOT_H - 2.6]), at([UNIT.x + UNIT.w - 1.7, y, z0 + 2.6]), at([UNIT.x + UNIT.w - 1.7, y, z0 + SLOT_H - 2.6])], { size: 0.45, tone: "mid" }));
  return out.join("");
}

function ranuras() {
  // De abajo hacia arriba: cada unidad tapa la cara superior de la de abajo
  const out = [];
  for (let s = MODELO.maxServidores; s >= 1; s--) {
    out.push(`<g data-ranura="${s}"><g data-tapa="${s}">${tapa(s)}</g><g data-servidor="${s}">${servidor(s)}</g></g>`);
  }
  out.push(`<g data-unidad="balanceador">${balanceador()}</g>`);
  return out.join("");
}

function rackFrente() {
  const out = [];
  const right = { x: RACK.x + RACK.w - 4, y: RACK.y, w: 4, d: RACK.d, r: 0.4 };
  out.push(S(k.slabOf(right, PLINTH_H, CAP_Z - PLINTH_H, P, 2, 0.4), { tone: "mid" }));
  // Puerta lateral desmontable: contorno, rejillas a ambos lados de la bandeja y tornillos
  const x = right.x + right.w;
  out.push(L(rectX(x, RACK.y + 2.4, FRONT - 2.4, PLINTH_H + 2.4, CAP_Z - 2.4), { tone: "faint" }));
  for (let z = PLINTH_H + 8; z < CAP_Z - 8; z += 5) {
    out.push(L(rectX(x, RACK.y + 6, TRAY.y - 4, z, z + 1.2), { tone: "lo" }));
    out.push(L(rectX(x, TRAY.y + TRAY.d + 3, FRONT - 5, z, z + 1.2), { tone: "lo" }));
  }
  out.push(D([[RACK.y + 4, PLINTH_H + 4], [RACK.y + 4, CAP_Z - 4], [FRONT - 4, PLINTH_H + 4], [FRONT - 4, CAP_Z - 4]].map(([y, z]) => at([x, y, z])), { size: 0.45, tone: "mid" }));
  const holes = [];
  for (let z = PLINTH_H + 2; z < CAP_Z - 1; z += 3) holes.push(at([right.x + 2, FRONT, z]));
  out.push(D(holes, { size: 0.42, tone: "lo" }));
  // Techo con ranuras de ventilación y tornillos
  const cap = k.insetPlan(RACK, -1);
  out.push(S(k.slabOf(cap, CAP_Z, CAP_H, P, 3, 0.8), { tone: "mid" }));
  for (let i = 0; i < 6; i++) out.push(L(k.planOutline({ x: -30, y: -50 + i * 6.6, w: 60, d: 2.2, r: 1.1 }, CAP_Z + CAP_H, P, 4), { tone: "lo" }));
  const screws = k.corners(cap, 4);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 1.5, CAP_Z + CAP_H, P, 14)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, CAP_Z + CAP_H])), { size: 0.45 }));
  return out.join("");
}

function bandeja() {
  const out = [S(k.slabOf(TRAY, 0, TRAY_H, P, 2, 0.3), { tone: "mid" })];
  const x = TRAY.x + TRAY.w;
  const rungs = [];
  for (let z = 4; z < TRAY_H; z += 6) rungs.push(poly([[x, TRAY.y, z], [x, TRAY.y + TRAY.d, z]]));
  out.push(L(rungs.join(""), { tone: "faint" }));
  // Conectores pasamuros: uno para el cliente y uno por servidor
  const conn = (y, z, attrs = "") => `<g${attrs}>${S(k.slabOf({ x, y: y - 1.3, w: 1.4, d: 2.6, r: 0.3 }, z - 1.3, 2.6, P, 2), { tone: "mid", crease: "none" })}</g>`;
  out.push(conn(CLIENT_Y, LB_Z + 5.5));
  [1, 2, 3, 4].forEach((s) => out.push(conn(SERVER_Y[s - 1], trayZ(s), ` data-servidor-cable="${s}"`)));
  // Tramos verticales sobre la bandeja
  out.push(cable(R_CLIENTE2.slice(4), ' data-cable="cliente-bandeja"', "to"));
  R_DB.forEach((r, i) => out.push(cable(r.slice(0, 3), ` data-servidor-cable="${i + 1}"`, "from")));
  return out.join("");
}

function parcheo() {
  return R_PATCH.map((r, i) => cable(r, ` data-servidor-cable="${i + 1}"`)).join("");
}

/* ---------- Base de datos: discos apilados sobre su controlador ---------- */
function baseDatos() {
  const out = [`<path class="iso-halo" d="${k.haloOf(DB_BLOCK, 0, 6, P)}" style="opacity:.3"/>`];
  // Subida oculta de los cables y su llegada al tope del bloque
  R_DB.forEach((r, i) => out.push(`<g data-servidor-cable="${i + 1}">${L(poly(r.slice(4)), { tone: "mid" })}</g>`));
  out.push(S(k.slabOf(DB_BLOCK, 0, PLINTH_H, P, 4, 0.6), { tone: "mid", inner: L(k.sideSeam(DB_BLOCK, 2.6, P, 4), { tone: "faint" }) }));
  // Rejillas en el frente del controlador (ranuras cerradas)
  for (let i = 0; i < 4; i++) out.push(L(rectY(DB_BLOCK.y + DB_BLOCK.d, 72 + i * 9, 78 + i * 9, 3.4, 4.6), { tone: "lo" }));
  for (let i = 0; i < 3; i++) out.push(L(rectX(DB_BLOCK.x + DB_BLOCK.w, -40 + i * 10, -34 + i * 10, 3.4, 4.6), { tone: "lo" }));
  // Enchufes de los servidores
  SERVER_Y.forEach((y, i) => {
    out.push(`<g data-servidor-cable="${i + 1}">${S(k.cylinder(SOCKET_X, y, 1.4, PLINTH_H, 1.4, P, 16), { tone: "mid" })}${D([at([SOCKET_X, y, PLINTH_H + 1.4])], { size: 0.5, tone: "hi" })}</g>`);
  });
  const [cx, cy] = DB_C;
  out.push(S(k.cylinder(cx, cy, 16.5, PLINTH_H, 2, P, 64), { tone: "lo" }));
  let z = PLINTH_H + 2;
  for (let i = 0; i < 3; i++) {
    out.push(`<g data-disco="${i}">${S(k.cylinder(cx, cy, 14.6, z, 8, P, 64, 0.6), { tone: "hi", crease: "lo", inner: L(k.sideArc(cx, cy, 14.6, z + 4, P, 40), { tone: "faint" }) })}</g>`);
    z += 8;
    if (i < 2) { out.push(S(k.cylinder(cx, cy, 15.3, z, 1.2, P, 64), { tone: "mid" })); z += 1.2; }
  }
  out.push(S(k.cylinder(cx, cy, 15.6, z, 3, P, 64, 0.8), { tone: "mid" }));
  const top = z + 3;
  out.push(L(k.ring(cx, cy, 12.6, top, P, 64), { tone: "lo" }));
  out.push(L(k.ring(cx, cy, 3.2, top, P, 24), { tone: "mid" }));
  out.push(D(k.corners({ x: cx - 9, y: cy - 9, w: 18, d: 18, r: 0 }, 0).map(([x, y]) => at([x, y, top])), { size: 0.45 }));
  out.push(`<g class="led" data-led="bd">${circle([cx, cy, top], 1.4)}</g>`);
  return { svg: out.join(""), top };
}

/* ---------- El usuario: monitor, teclado y ratón ---------- */
function cliente() {
  const out = [`<path class="iso-halo" d="${k.haloOf(k.insetPlan(KEYB, -6), 0, 2, P)}" style="opacity:.35"/>`];
  out.push(S(k.slabOf({ x: -16, y: 34, w: 16, d: 13, r: 2.4 }, 0, 1.8, P, 4, 0.5), { tone: "mid" }));   // pie
  out.push(S(k.slabOf({ x: -10, y: 37, w: 4, d: 3.4, r: 0.8 }, 1.8, MON_Z + 4, P, 3), { tone: "mid" }));  // cuello
  out.push(S(k.slabOf(MON, MON_Z, MON_TOP - MON_Z, P, 3, 0.6), { tone: "hi", crease: "lo" }));
  const y = MON.y + MON.d;
  out.push(L(rectY(y, -27.5, 11.5, MON_Z + 3, MON_TOP - 2.4), { tone: "mid" }));
  // Navegador: barra de dirección (de borde a borde) y botón
  out.push(L(poly([[-27.5, y, MON_TOP - 5.4], [11.5, y, MON_TOP - 5.4]]), { tone: "lo" }));
  out.push(L(rectY(y, -24, -2, MON_TOP - 4.6, MON_TOP - 3.2), { tone: "faint" }));
  // Contenido: esperando (tres puntos) o el perfil ya pintado
  out.push(`<g data-pantalla="espera">${D([-12, -8, -4].map((x) => at([x, y, 21])), { size: 0.7, tone: "mid" })}</g>`);
  const perfil = [L(k.sideRing([-19, y, 24], 4, "y", P, 28), { tone: "hi" }), L(k.sideRing([-19, y, 25.2], 1.4, "y", P, 16), { tone: "mid" })];
  [[-12, 4, 30], [-12, 1, 26], [-24, -3, 36], [-24, -6, 32]].forEach(([x0, dz, len]) => perfil.push(L(poly([[x0, y, 25 + dz], [x0 + len * (x0 < -15 ? 1 : 0.7) * 0.9, y, 25 + dz]]), { tone: dz > 2 ? "hi" : "lo", free: true })));
  out.push(`<g data-pantalla="perfil" style="opacity:0">${perfil.join("")}</g>`);
  out.push(`<g class="led" data-led="cli">${circle([8.6, y, MON_Z + 1.5], 0.9)}</g>`);
  // Conector lateral del cable
  out.push(S(k.slabOf({ x: MON.x + MON.w, y: 42.6, w: 1.4, d: 2.8, r: 0.3 }, 13.6, 2.8, P, 2), { tone: "mid", crease: "none" }));
  out.push(cable(R_CLIENTE1.slice(0, 3), ' data-cable="cliente-monitor"', "from"));
  // Teclado con sus teclas y ratón
  out.push(S(k.slabOf(KEYB, 0, 2.4, P, 4, 0.6), { tone: "mid" }));
  out.push(D(k.dotGrid(KEYB.x + 3, KEYB.y + 2.4, 12, 3, 2.7, 2.4, P), { size: 0.5, tone: "lo" }));
  out.push(L(k.planOutline({ x: KEYB.x + 9, y: KEYB.y + 10.2, w: 18, d: 1.4, r: 0.7 }, 2.4, P, 3), { tone: "lo" }));
  out.push(S(k.slabOf({ x: 17, y: 56, w: 6, d: 9, r: 2.6 }, 0, 2.6, P, 5, 0.5), { tone: "mid" }));
  out.push(L(k.lineOnTop([20, 56.4], [20, 59.6], 2.6, P), { tone: "lo" }));
  return out.join("");
}

/* ---------- Router: la salida a internet ---------- */
function router() {
  const out = [`<path class="iso-halo" d="${k.haloOf(ROUTER, 0, ROUTER_H, P)}" style="opacity:.3"/>`];
  const ant = (x, y) => out.push(S(k.cylinder(x, y, 0.75, ROUTER_H, 11, P, 14), { tone: "mid", crease: "none" }), S(k.cylinder(x, y, 1.1, ROUTER_H + 11, 1.4, P, 14), { tone: "mid" }));
  out.push(S(k.slabOf(ROUTER, 0, ROUTER_H, P, 4, 0.6), { tone: "hi", crease: "lo", inner: L(k.sideSeam(ROUTER, 1.4, P, 4), { tone: "faint" }) }));
  // Antenas en las esquinas traseras, sobre la tapa
  ant(ROUTER.x + 3, ROUTER.y + 3);
  ant(ROUTER.x + ROUTER.w - 3, ROUTER.y + 3);
  for (let i = 0; i < 4; i++) out.push(L(k.planOutline({ x: ROUTER.x + 4 + i * 2.6, y: ROUTER.y + 5, w: 1.2, d: 6, r: 0.6 }, ROUTER_H, P, 3), { tone: "lo" }));
  const y = ROUTER.y + ROUTER.d;
  out.push(`<g class="led" data-led="router">${circle([ROUTER.x + ROUTER.w - 4, y, 3], 0.95)}</g>`);
  out.push(D([0, 1, 2].map((i) => at([ROUTER.x + 3 + i * 2.4, y, 3])), { size: 0.55, tone: "mid" }));
  const x = ROUTER.x + ROUTER.w;
  out.push(L(rectX(x, 25.6, 30.4, 1.4, 3.4), { tone: "mid" }));
  out.push(S(k.slabOf({ x, y: 26.6, w: 1.4, d: 2.8, r: 0.3 }, 1, 2.8, P, 2), { tone: "mid", crease: "none" }));
  out.push(cable(R_CLIENTE2.slice(0, 3), ' data-cable="router"', "from"));
  return out.join("");
}

/* ---------- La petición ---------- */
const PAQUETE = `<g data-paquete style="opacity:0"><circle class="paquete-halo" r="7"/><circle class="paquete" r="3"/></g>`;

const db = baseDatos();
const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label: "Un rack de servidores sobre un banco. Arriba está el balanceador de carga; debajo, hasta cuatro servidores que entran como cajones. Una bandeja lateral lleva los cables hacia una base de datos de discos apilados y hacia el monitor del usuario. Una petición viaja del monitor al balanceador, de ahí a un servidor, a la base de datos y de vuelta.",
  body: [banco(), cablesPiso(), rackFondo(), ranuras(), rackFrente(), bandeja(), parcheo(), db.svg, router(), cliente(), PAQUETE],
});

/* ---------- Datos para el código vivo ---------- */
const screen = (pts) => pts.map((p) => at(p).map(fmt));
const DATA = {
  P,
  modelo: MODELO,
  slide: SLIDE,
  rutas: { cliente1: screen(R_CLIENTE1.slice(0, -1).concat([[ROUTER.x - 3, 28, 0.6]])), cliente2: screen(R_CLIENTE2), patch: R_PATCH.map(screen), bd: R_DB.map(screen) },
  barras: [0, 1, 2, 3].map((i) => ({ x: -31 + i * 5, y: FRONT, z0: LB_Z + 1.8, alto: 6.2 })),
};

const LIVE = `
const DATA = ${JSON.stringify(DATA)};
const P = DATA.P, M = DATA.modelo;
const qs = new URLSearchParams(location.search);
const MODO = qs.get('modo') === 'escalado' ? 'escalado' : 'viaje';
const still = matchMedia('(prefers-reduced-motion: reduce)');
const stage = document.querySelector('.iso-stage');
const svg = stage.querySelector('svg');
const readout = document.querySelector('[data-readout]');
const paquete = svg.querySelector('[data-paquete]');
const $ = (s) => svg.querySelector(s);
const $$ = (s) => [...svg.querySelectorAll(s)];
const avisar = (msg) => { try { parent.postMessage(Object.assign({ fuente: 'rack' }, msg), '*'); } catch (e) {} };

/* Rutas en pantalla con su largo acumulado */
const ruta = (pts) => { const acc = [0]; for (let i = 1; i < pts.length; i++) acc.push(acc[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return { pts, acc, largo: acc[acc.length - 1] }; };
const R = { cliente1: ruta(DATA.rutas.cliente1), cliente2: ruta(DATA.rutas.cliente2), patch: DATA.rutas.patch.map(ruta), bd: DATA.rutas.bd.map(ruta) };
function puntoEn(r, d) {
  d = Math.max(0, Math.min(r.largo, d));
  let i = 1; while (i < r.acc.length - 1 && r.acc[i] < d) i++;
  const t = (d - r.acc[i - 1]) / ((r.acc[i] - r.acc[i - 1]) || 1);
  return [r.pts[i - 1][0] + (r.pts[i][0] - r.pts[i - 1][0]) * t, r.pts[i - 1][1] + (r.pts[i][1] - r.pts[i - 1][1]) * t];
}

/* ---------- Estado ---------- */
const est = {
  servidores: Math.max(1, Math.min(M.maxServidores, +qs.get('servidores') || (MODO === 'escalado' ? 1 : 3))),
  usuarios: MODO === 'escalado' ? 1000 : 0,
  siguiente: 0, peticiones: 0, ms: 0, fase: -1, servidor: 1,
  cola: [], accion: null, limite: Infinity, visible: true, activo: true, tour: MODO === 'viaje' && qs.get('tour') !== '0', ultimaMano: 0,
};
const cajon = {}; // ranura -> { off, alfa, objetivo }
for (let s = 1; s <= M.maxServidores; s++) cajon[s] = { off: s <= est.servidores ? 0 : DATA.slide, alfa: s <= est.servidores ? 1 : 0 };

function pintarCajon(s) {
  const c = cajon[s];
  const g = $('[data-servidor="' + s + '"]');
  g.setAttribute('transform', translateAlong(P, [0, c.off, 0]));
  g.style.opacity = c.alfa.toFixed(3);
  g.style.display = c.alfa < 0.01 ? 'none' : '';
  // La tapa ciega se va cuando el cajón empieza a entrar y vuelve cuando sale del todo
  // La tapa ciega se retira cuando aparece el cajón y vuelve cuando el cajón se va
  const tapa = $('[data-tapa="' + s + '"]');
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

const miles = (n) => n.toLocaleString('es-CO');
function decir() {
  let t;
  if (MODO === 'escalado') {
    const cap = est.servidores * M.capacidadPorServidor;
    t = miles(est.usuarios) + ' usuarios · capacidad ' + miles(cap) + (sobrecarga() ? ' · SOBRECARGA' : ' · en línea');
  } else if (est.fase < 0) t = 'Clic para enviar una petición';
  else t = 'Petición ' + est.peticiones + ' · servidor ' + est.servidor + ' · ' + est.ms + ' ms';
  if (readout.textContent !== t) readout.textContent = t;
  stage.setAttribute('aria-valuetext', t);
}

/* ---------- Guion de una petición ---------- */
const FASES = ['usuario', 'balanceador', 'servidor', 'bd', 'respuesta'];
function guion() {
  const L = M.latencia;
  const s = 1 + (est.siguiente % est.servidores); est.siguiente++;
  const q = [];
  const fase = (n, extra) => q.push({ tipo: 'fase', fase: n, alEmpezar: extra });
  const mover = (r, inverso, ms, fase) => q.push({ tipo: 'mover', r, inverso, dur: 0.0042 * r.largo + 0.25, ms, fase });
  const espera = (dur, fase, alEmpezar, alTerminar) => q.push({ tipo: 'espera', dur, fase, alEmpezar, alTerminar });
  fase(0, () => { est.peticiones++; est.ms = 0; est.servidor = s; pantalla('espera'); led('cli', true); setTimeout(() => led('cli', false), 300); });
  mover(R.cliente1, false, L.red, 0);
  espera(0.35, 0, () => led('router', true), () => led('router', false));
  mover(R.cliente2, false, L.internet, 0);
  fase(1);
  espera(0.55, 1, () => { led('lb-' + s, true); carga[s - 1] = Math.max(carga[s - 1], 0.9); }, () => {});
  mover(R.patch[s - 1], false, L.balanceador + L.red, 1);
  fase(2);
  espera(0.8, 2, () => led('srv-' + s, true), () => {});
  fase(3);
  mover(R.bd[s - 1], false, L.api + L.red, 3);
  espera(0.7, 3, () => { led('bd', true); discos(true); }, () => { led('bd', false); discos(false); });
  fase(4);
  mover(R.bd[s - 1], true, L.bd + L.red, 4);
  espera(0.25, 4, () => {}, () => led('srv-' + s, false));
  mover(R.patch[s - 1], true, L.red, 4);
  espera(0.2, 4, () => {}, () => led('lb-' + s, false));
  mover(R.cliente2, true, L.internet, 4);
  espera(0.25, 4, () => led('router', true), () => led('router', false));
  mover(R.cliente1, true, L.red, 4);
  espera(0.9, 4, () => { pantalla('perfil'); led('cli', true); }, () => led('cli', false));
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
    est.cola.shift(); est.accion = Object.assign({ t: 0 }, a); if (a.alEmpezar) a.alEmpezar();
  }
}
function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 20) : 1 / 60; last = now;
  const calma = still.matches;
  const rapido = MODO === 'escalado' ? 2.2 : 1;
  siguienteAccion();
  const a = est.accion;
  if (a) {
    a.t += dt * rapido;
    const dur = calma ? 0.001 : a.dur;
    if (a.tipo === 'mover') {
      const u = Math.min(1, a.t / dur);
      const e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
      const p = puntoEn(a.r, (a.inverso ? 1 - e : e) * a.r.largo);
      paquete.setAttribute('transform', 'translate(' + p[0].toFixed(2) + ' ' + p[1].toFixed(2) + ')');
      paquete.style.opacity = calma ? 0 : Math.min(1, Math.min(u, 1 - u) * 14 + 0.15).toFixed(3);
      if (u >= 1) { est.ms += a.ms; paquete.style.opacity = 0; est.accion = null; decir(); }
    } else if (a.tipo === 'espera') {
      if (a.t >= (calma ? 0.001 : a.dur)) { if (a.alTerminar) a.alTerminar(); est.accion = null; }
    }
  }
  // Cajones: resorte críticamente amortiguado hacia su lugar
  let quietos = true;
  for (let s = 1; s <= M.maxServidores; s++) {
    const c = cajon[s], dentro = s <= est.servidores;
    const offObj = dentro ? 0 : DATA.slide, alfaObj = dentro ? 1 : 0;
    const f = calma ? 1 : 1 - Math.exp(-dt / 0.22);
    // Entra: primero aparece afuera y luego se desliza; sale: se desliza y luego se desvanece
    if (dentro) { c.alfa += (alfaObj - c.alfa) * (calma ? 1 : 1 - Math.exp(-dt / 0.08)); if (c.alfa > 0.6) c.off += (offObj - c.off) * f; }
    else { c.off += (offObj - c.off) * f; if (c.off > DATA.slide - 3) c.alfa += (alfaObj - c.alfa) * (calma ? 1 : 1 - Math.exp(-dt / 0.1)); }
    if (Math.abs(c.off - offObj) < 0.02) c.off = offObj;
    if (Math.abs(c.alfa - alfaObj) < 0.004) c.alfa = alfaObj;
    if (c.off !== offObj || c.alfa !== alfaObj) quietos = false;
    pintarCajon(s);
  }
  // Barras de carga
  const obj = cargaObjetivo();
  for (let i = 0; i < 4; i++) { const n = carga[i] + (obj[i] - carga[i]) * (calma ? 1 : 1 - Math.exp(-dt / 0.5)); if (Math.abs(n - carga[i]) > 0.002) quietos = false; carga[i] = Math.abs(n - obj[i]) < 0.002 ? obj[i] : n; }
  pintarBarras();
  svg.toggleAttribute('data-sobrecarga', sobrecarga());
  // Recorrido automático: una petición cada tanto mientras nadie toca
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
  reiniciar() { mano(); est.cola = []; est.accion = null; est.fase = -1; est.peticiones = 0; est.ms = 0; paquete.style.opacity = 0; ['lb-1','lb-2','lb-3','lb-4','srv-1','srv-2','srv-3','srv-4','bd','cli'].forEach((id) => led(id, false)); discos(false); pantalla('espera'); decir(); avisar({ tipo: 'fase', fase: -1 }); correr(); },
  servidores(m) { est.servidores = Math.max(1, Math.min(M.maxServidores, m.n | 0)); est.siguiente = 0; decir(); correr(); avisar({ tipo: 'servidores', n: est.servidores }); },
  carga(m) { est.usuarios = Math.max(0, m.usuarios | 0); decir(); correr(); },
  tour(m) { est.tour = !!m.valor; correr(); },
  activo(m) { est.activo = !!m.valor; if (est.activo) correr(); },
};
addEventListener('message', (e) => { const m = e.data; if (m && m.destino === 'rack' && ORDENES[m.tipo]) ORDENES[m.tipo](m); });

stage.addEventListener('click', () => ORDENES.enviar());
stage.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ORDENES.enviar(); }
  if (MODO === 'escalado' && (e.key === 'ArrowUp' || e.key === 'ArrowRight')) { e.preventDefault(); ORDENES.servidores({ n: est.servidores + 1 }); }
  if (MODO === 'escalado' && (e.key === 'ArrowDown' || e.key === 'ArrowLeft')) { e.preventDefault(); ORDENES.servidores({ n: est.servidores - 1 }); }
});
new IntersectionObserver((en) => { est.visible = en[en.length - 1].isIntersecting; if (est.visible) correr(); }).observe(stage);
if (MODO === 'escalado') est.tour = true;
pantalla('espera');
for (let s = 1; s <= M.maxServidores; s++) pintarCajon(s);
pintarBarras(); decir(); correr();
avisar({ tipo: 'listo', modo: MODO });
// La diapositiva ajusta el alto del iframe a la tarjeta
const alto = () => avisar({ tipo: 'alto', px: Math.ceil(document.querySelector('.iso-figure').getBoundingClientRect().height) });
if (MODO === 'escalado') { const h = document.querySelector('[data-corner="hint"]'); if (h) h.textContent = '↑ ↓: meter o sacar servidores'; }
addEventListener('resize', alto); alto();
window.__rack = { est, ORDENES, cajon };
`;

/* ---------- Página ---------- */
const EXTRA_CSS = `
.iso[data-theme="light"]{--anatomy-page:transparent;--acento:#0e7490;--acento-suave:#67e8f9}
html{color-scheme:light;background:transparent}
.iso-page{width:100%;margin:0}
.iso-figure{margin:0}
.iso-plate{padding:40px 14px 44px}
.iso-stage{cursor:pointer;outline:none;border-radius:4px}
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
@media (prefers-reduced-motion:reduce){.led circle,[data-pantalla]{transition:none}[data-sobrecarga] [data-led^="srv-"] circle{animation:none}}
`;

const body = k.plateHtml({
  fig: "Fig 1",
  title: "Rack de la app",
  hint: "Clic o Enter: enviar una petición",
  readout: "Clic para enviar una petición",
  body: `<div class="iso-stage" tabindex="0" role="img" aria-label="Rack de la app: pulsa Enter para enviar una petición">${svg}</div>`,
});

let html = k.pageHtml({ title: "Rack de la app", theme: "light", body, script: kitScript() + LIVE });
html = html.replace('<html lang="en">', '<html lang="es">').replace("</style>", EXTRA_CSS + "</style>");
writeFileSync(join(HERE, "rack.html"), html);
console.log("rack.html", (html.length / 1024).toFixed(0) + " KB");
