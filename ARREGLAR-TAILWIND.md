# 🛠️ Arreglar OVAs con el problema del CDN de Tailwind

## ¿Qué pasó?

Los OVAs cargaban su diseño (Tailwind CSS) en tiempo real desde `https://cdn.tailwindcss.com`. Ese CDN **quedó descontinuado y dejó de funcionar**, así que todos los OVAs que dependían de él **perdieron su diseño de golpe** (se ven como texto plano, sin barra lateral, sin tarjetas ni colores).

## La solución

Cada OVA pasa a llevar su **propio Tailwind horneado localmente** (un archivo `tailwind.css` dentro de su carpeta), en lugar del CDN. Así el OVA es autónomo y **no se vuelve a romper** por depender de un servicio externo.

> Requisito: tener **Node.js** instalado (para poder ejecutar `npx`). Los OVAs nuevos ya deben nacer con este arreglo (ver `context.md` → "Tailwind local").

---

## 🤖 Prompt para arreglar TODOS los OVAs existentes de tu repositorio

Copia y pega este mensaje a tu agente de IA (Windsurf, Cursor, Copilot, Claude Code, etc.) dentro de tu repositorio:

```
Mis OVAs se ven sin estilos porque usaban Tailwind desde https://cdn.tailwindcss.com,
un CDN que quedó descontinuado. Arréglalos así, sin cambiar el contenido ni el diseño:

1. Busca en TODO el repositorio los archivos index.html que contengan
   "cdn.tailwindcss.com".

2. Para CADA uno de esos index.html, trabaja DENTRO de su propia carpeta:

   a) Genera su Tailwind local escaneando solo esa carpeta, ejecutando este comando
      dentro de la carpeta del OVA:

        npx tailwindcss@3.4.17 -o tailwind.css --content "./**/*.{html,js}" --minify

      Esto crea un archivo tailwind.css en la carpeta del OVA con exactamente las
      clases que ese OVA usa (incluidas las que aparecen dentro del JavaScript).

   b) En ese index.html, reemplaza la etiqueta del CDN:
        <script src="https://cdn.tailwindcss.com"></script>
      por el enlace al CSS local:
        <link rel="stylesheet" href="tailwind.css">
      (Deja el resto del <head> igual: fuentes, <style> propio y el plugin de
      accesibilidad no se tocan.)

3. Al terminar, verifica que NINGÚN index.html siga conteniendo "cdn.tailwindcss.com".

4. Cada OVA queda con su propio tailwind.css en su carpeta: es autónomo y ya no
   depende de ningún CDN. No modifiques el contenido, los textos ni la estructura;
   solo cambias de dónde viene el CSS de Tailwind.
```

---

## 🔧 Comando estándar (por OVA)

Si prefieres hacerlo a mano, para **cada** carpeta de OVA ejecuta, dentro de esa carpeta:

```bash
npx tailwindcss@3.4.17 -o tailwind.css --content "./**/*.{html,js}" --minify
```

y en su `index.html` cambia:

```html
<!-- ANTES (ya no funciona) -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- DESPUÉS -->
<link rel="stylesheet" href="tailwind.css">
```

> 💡 Vuelve a correr el comando cada vez que agregues o quites clases de Tailwind en ese OVA, para que su `tailwind.css` se mantenga al día.
