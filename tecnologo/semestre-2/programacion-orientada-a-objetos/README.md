# Programación orientada a objetos

OVAs del programa Tecnólogo, semestre 2.

## Organización

Carga cada OVA dentro de su unidad y en una carpeta con el nombre del tema:

```text
tecnologo/semestre-2/programacion-orientada-a-objetos/
└── unidad-N/
    └── nombre-del-ova/
        ├── index.html
        ├── tailwind.css
        └── img/
            └── logo.webp
```

Sustituye `N` por el número de la unidad y `nombre-del-ova` por el tema en minúsculas, sin tildes y con guiones. Cada OVA debe incluir sus propios recursos, estilos y archivos JavaScript cuando corresponda.

Para crear una OVA, usa la [plantilla oficial](../../../_template/) y sigue las reglas de [CONTRIBUTING.md](../../../CONTRIBUTING.md) y [context.md](../../../context.md).

Antes de abrir un pull request, ejecuta desde la raíz del repositorio:

```bash
node scripts/validar-ova.mjs
```

Esta carpeta está preparada para recibir OVAs; todavía no contiene materiales educativos.
