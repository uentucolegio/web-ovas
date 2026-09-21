# Programación orientada a objetos

OVAs del programa Tecnólogo, semestre 2. Las explicaciones, ejemplos y actividades de programación usan Java; los ejemplos se verificaron con Java 21.

## Unidad 1

- [Paradigmas de programación y pensamiento orientado a objetos](unidad-1/paradigmas-programacion-pensamiento-orientado-objetos/index.html)
- [Clases, objetos, atributos, métodos y constructores](unidad-1/clases-objetos-atributos-metodos-constructores/index.html)
- [Abstracción y encapsulamiento](unidad-1/abstraccion-encapsulamiento/index.html)
- [Diagramas de clases y modelado de entidades](unidad-1/diagramas-clases-modelado-entidades/index.html)

## Unidad 2

- [Asociación, agregación y composición](unidad-2/asociacion-agregacion-composicion/index.html)
- [Herencia y reutilización de código](unidad-2/herencia-reutilizacion-codigo/index.html)
- [Polimorfismo e interfaces básicas](unidad-2/polimorfismo-interfaces-basicas/index.html)
- [Sobrecarga y sobreescritura de métodos](unidad-2/sobrecarga-sobreescritura-metodos/index.html)

Cada carpeta contiene `index.html`, su propio `tailwind.css` y las imágenes locales de logo y recursos.

Para agregar materiales, respeta `unidad-N/nombre-del-ova/` y las reglas de [CONTRIBUTING.md](../../../CONTRIBUTING.md) y [context.md](../../../context.md).

Si cambias clases de estilo, regenera el CSS dentro de la carpeta de la OVA:

```bash
npx tailwindcss@3.4.17 -o tailwind.css --content "./**/*.{html,js}" --minify
```

Valida desde la raíz del repositorio antes de abrir un pull request:

```bash
node scripts/validar-ova.mjs
```
