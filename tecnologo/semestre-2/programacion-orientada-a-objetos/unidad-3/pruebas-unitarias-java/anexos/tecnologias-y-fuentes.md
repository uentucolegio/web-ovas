# Tecnologías y fuentes de la ampliación

Consulta: 17 de octubre de 2026.

## Implementado en esta OVA

- CodeMirror 6.0.2 y @codemirror/lang-java 6.0.2: editor con resaltado Java, números de línea, historial y descarga. Empaquetado localmente en vendor/editor.bundle.js; no requiere un CDN. Es editor, no compilador ni entorno Java.
  Documentación del proyecto: https://github.com/codemirror/dev
  Soporte Java: https://github.com/codemirror/lang-java
- SVG nativo y botones accesibles: diagramas de estados de escenarios preparados con navegación anterior/siguiente. No se ejecuta Java durante el recorrido.
  https://developer.mozilla.org/en-US/docs/Web/SVG
- Web Animations API: transición breve al cambiar de estado, respetando prefers-reduced-motion. El contenido también funciona sin la animación.
  https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API
- localStorage: guarda en el navegador código, notas, respuestas y progreso. No envía datos a servicios externos. El acceso puede fallar o variar con file:// y restricciones de privacidad; exportar JSON proporciona un respaldo portable.
  https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- File y Blob: importación validada de avance y exportación local de archivos. No se ejecuta el código importado ni se interpreta como HTML.
  https://developer.mozilla.org/en-US/docs/Web/API/Blob
- Repaso por recuperación activa: las tarjetas no recordadas se priorizan. Es una secuencia adaptativa sencilla por autorreporte, no un algoritmo de repetición espaciada por días ni una evaluación automática de dominio.

## Alternativas investigadas

Mermaid permite diagramas desde texto y títulos/descripciones accesibles. Para cuatro recorridos pequeños se eligió SVG nativo: reduce dependencias y mantiene los controles de pasos simples. Mermaid no está incluido ni se afirma que se ejecute aquí.
https://mermaid.js.org/syntax/classDiagram
https://mermaid.js.org/config/accessibility

PIT permite analizar si una suite detecta mutaciones reales del programa. La OVA de pruebas incluye una simulación didáctica de defectos y un anexo de JUnit parametrizado; no ejecuta PIT en el navegador.
https://pitest.org/

## Referencias del tema añadidas

- JUnit 5.11.4: pruebas parametrizadas: https://docs.junit.org/5.11.4/user-guide/#writing-tests-parameterized-tests
  Ejecuta el mismo contrato con tablas de entradas.
- PIT: pruebas de mutación: https://pitest.org/
  Comprueba si las pruebas detectan pequeños cambios defectuosos. Recurso de ampliación; PIT no se ejecuta en este OVA.
- Apache Maven: primeros pasos: https://maven.apache.org/guides/getting-started/index.html
  Organiza fuentes, dependencias y ejecución reproducible de pruebas.

Las referencias iniciales permanecen en la sección Bibliografía. Las licencias del editor se incluyen en vendor/LICENCIAS.txt.
