# Pruebas unitarias introductorias — Java

Base del código: Java 17. Compilado en esta entrega con JDK 21 y --release 17; ejecutado con JDK 21. No se afirma ejecución sobre un runtime JDK 17.

Desde esta carpeta:

```sh
javac -encoding UTF-8 PruebasTarifa.java
java PruebasTarifa
```

Salida de referencia, confirmada en la verificación de esta entrega:

```text
5 comprobaciones correctas
```

## Suite JUnit Jupiter 5.11.4

Crea la carpeta lib y descarga [JUnit Platform Console Standalone 1.11.4](https://repo.maven.apache.org/maven2/org/junit/platform/junit-platform-console-standalone/1.11.4/junit-platform-console-standalone-1.11.4.jar) dentro de ella. El JAR no está incluido en este ZIP.

```sh
javac -encoding UTF-8 -cp lib/junit-platform-console-standalone-1.11.4.jar PruebasTarifa.java TarifaTest.java
java -jar lib/junit-platform-console-standalone-1.11.4.jar execute --class-path . --scan-class-path
```

Verificación realizada: cinco pruebas descubiertas y cinco aprobadas. Amplía la suite como indican las actividades.
