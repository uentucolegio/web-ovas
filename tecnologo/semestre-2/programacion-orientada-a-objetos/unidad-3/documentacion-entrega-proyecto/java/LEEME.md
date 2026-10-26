# Documentación y entrega del proyecto — Java

Base del código: Java 17. Compilado en esta entrega con JDK 21 y --release 17; ejecutado con JDK 21. No se afirma ejecución sobre un runtime JDK 17.

Desde esta carpeta:

```sh
javac -encoding UTF-8 CuposProyecto.java
java CuposProyecto
```

Salida de referencia, confirmada en la verificación de esta entrega:

```text
1
0
Sin cupos
0
```

## Generar API

```sh
javadoc -encoding UTF-8 -docencoding UTF-8 -charset UTF-8 -d docs CuposProyecto.java
```

Abre docs/index.html. El control mantiene cupos en memoria, sin persistencia ni seguridad entre hilos.
