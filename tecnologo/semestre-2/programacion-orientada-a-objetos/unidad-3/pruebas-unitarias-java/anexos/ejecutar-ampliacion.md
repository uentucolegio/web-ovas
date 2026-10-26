# Ejecutar el ejemplo complementario

Base: Java 17 o superior.

Crea lib en la raíz del OVA y guarda allí junit-platform-console-standalone-1.11.4.jar.
Descarga: https://repo.maven.apache.org/maven2/org/junit/platform/junit-platform-console-standalone/1.11.4/junit-platform-console-standalone-1.11.4.jar

```sh
mkdir out
javac -encoding UTF-8 -d out -cp lib/junit-platform-console-standalone-1.11.4.jar java/PruebasTarifa.java java/TarifaTest.java anexos/TarifaParametrizadaTest.java
java -jar lib/junit-platform-console-standalone-1.11.4.jar execute --class-path out --scan-class-path
```

Esperado: 12 pruebas aprobadas (5 originales + 7 ejecuciones parametrizadas). El JAR no está incluido.

El editor web permite escribir y descargar código. No compila ni ejecuta Java. Las soluciones son de referencia: intenta resolver la misión antes de consultarlas.
