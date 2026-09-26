

# Objetivo/s

- Comprender qué es el sistema operativo Linux, identificar sus principales características y seleccionar la distribución más adecuada según diferentes necesidades y proyectos.

- Identificar la estructura general del sistema de archivos de Linux, reconociendo la diferencia entre rutas absolutas y relativas para la organización de la información.

- Utilizar la terminal de Linux para interactuar con el sistema operativo mediante la ejecución de comandos básicos de información, (Entorno, usuario y sistema), reduciendo la dependencia de interfaces gráficas.

# Introducción

Gran parte de la infraestructura digital que sostiene internet funciona sobre GNU/Linux, el sistema operativo utilizado por empresas como Google, Netflix y Amazon debido a su velocidad, estabilidad y seguridad, sin depender de interfaces gráficas para operar.

Este contenido te permite dar un paso más allá del uso cotidiano del mouse para adentrarte en el rol de desarrollador: aquí aprenderás a interactuar directamente con el sistema a través de la Terminal, utilizando comandos.

# Desarrollo del contenido

**¿Qué es un sistema operativo?**

Un sistema operativo **(Operating System - OS)** es el software encargado de administrar los recursos físicos del computador y servir como intermediario entre el usuario y el hardware.

Entre sus funciones principales se encuentran:

• Administración de memoria.

• Gestión del procesador.

• Manejo de archivos.

• Control de dispositivos.

• Gestión de usuarios.

• Seguridad.

**Ejemplos**:

• Windows

• macOS

• GNU/Linux

• Android

• iOS

**¿Qué es GNU/Linux?**

El término "Linux" corresponde propiamente al núcleo o kernel del sistema; sin embargo, para referirse al sistema operativo completo y funcional, la denominación correcta es **GNU/Linux**.

Está conformado por dos grandes componentes:

**GNU**

Es un conjunto de herramientas desarrolladas por el proyecto GNU que permiten al usuario trabajar con el sistema.

Incluye programas como:

- Bash
- gcc
- ls
- cp
- mv
- cat
- grep

**Linux**

Es el Kernel.

El Kernel es el núcleo del sistema operativo.

Sus responsabilidades incluyen:

- administrar memoria
- controlar dispositivos
- administrar procesos
- comunicación con el hardware

En otras palabras:

| **Componente** | **¿Qué es?** | **Ejemplo** |
| --- | --- | --- |
| GNU | Un sistema de software libre que incluye herramientas y utilidades para usar un sistema operativo. | Bash, GCC, GNU Coreutils |
| Linux | El núcleo o _kernel_ que administra el hardware y los recursos del sistema. | Kernel Linux usado en Ubuntu, Debian o Fedora |
| GNU/Linux | Un sistema operativo completo que combina el kernel Linux con herramientas del proyecto GNU. | Ubuntu, Linux Mint, Debian |

**¿Qué es una distribución Linux?**

Una distribución (Distribution o Distro) es un sistema operativo construido alrededor del Kernel Linux junto con diferentes herramientas GNU.

Cada distribución tiene objetivos diferentes.

**Ejemplos**:

| **Distribución** |     | **Uso principal** |
| --- |     | --- |
| Ubuntu | Educación y escritorio |     |
| Debian | Servidores |     |
| Fedora | Desarrollo |     |
| Arch Linux | Usuarios avanzados |     |
| Kali Linux | Seguridad informática |     |
| Rocky Linux | Servidores empresariales |     |
|     |     |     |

**¿Qué es la Terminal?**

La Terminal es un programa que permite interactuar con el sistema operativo mediante comandos escritos.

En lugar de utilizar botones y ventanas, el usuario escribe instrucciones.

Ejemplo:

**ls**

El sistema responde mostrando el contenido del directorio actual.

**¿Qué es el Shell?**

El Shell es el intérprete de comandos.

Su función consiste en traducir los comandos escritos por el usuario para que el Kernel pueda ejecutarlos.

El Shell más utilizado actualmente es:

**Bash (Bourne Again Shell)**

Otros Shell son:

- zsh
- fish
- sh
- ksh

**¿Cómo funciona un comando?**

Todo comando posee una estructura similar:

comando opciones argumentos

Ejemplo:

ls -l Documentos

Donde:

- ls → comando
- \-l → opción
- Documentos → argumento

**La estructura del sistema de archivos en GNU/Linux**

A diferencia de Windows, donde existen unidades como C: o D:, en GNU/Linux **todo parte de un único directorio raíz**, representado por una barra inclinada:

/

Todos los archivos, carpetas, dispositivos y sistemas montados se organizan bajo este directorio raíz formando una estructura en árbol.

Ejemplo simplificado:

/  
├── bin  
├── boot  
├── dev  
├── etc  
├── home  
│ ├── estudiante  
│ └── profesor  
├── lib  
├── media  
├── opt  
├── proc  
├── root  
├── tmp  
├── usr  
└── var

**¿Qué es una ruta?**

Una **ruta** indica la ubicación de un archivo o directorio dentro del sistema.

**Ruta absoluta**

Comienza desde la raíz (/) y especifica el recorrido completo.

Ejemplo:

/home/estudiante/Documentos/proyecto

No depende del lugar donde se encuentre el usuario.

**Ruta relativa**

Parte desde el directorio actual.

Ejemplo:

Documentos/proyecto

Su interpretación depende de la ubicación actual del usuario.

**Nota:** Existe un comando que nos permite la navegación entre directorios en la terminal. Ese comando se llama **cd**, y su función principal es cambiar la ubicación actual desde la que estamos trabajando.



# Bibliografía

freeCodeCamp. (2024, 8 de octubre). Aprender Linux para principiantes: Desde las bases a técnicas avanzadas \[Libro completo\]. https://www.freecodecamp.org/espanol/news/learn-linux-for-beginners-from-basics-to-advanced-techniques-full-book/#parte-1-introduccion-linux

Free Software Foundation. (n. d.). Documentación del Proyecto GNU. GNU Project https://www.gnu.org/doc/doc.es.html

Linux Training Academy. (s. f.). _Linux directory structure and file system hierarchy_. https://www-linuxtrainingacademy-com.translate.goog/linux-directory-structure-and-file-system-hierarchy/?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc

