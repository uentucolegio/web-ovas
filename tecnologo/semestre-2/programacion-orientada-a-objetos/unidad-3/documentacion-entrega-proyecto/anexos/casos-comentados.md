# Casos comentados

## Documento que contradice el retorno

Si reservar devuelve cupos restantes, escribir reservas acumuladas cambia el significado aunque ambos sean int.

Pregunta: ¿Qué debes corregir?

Respuesta razonada: La correspondencia entre contrato, código y prueba.

## Construcción en otro equipo

Una ruta absoluta del autor puede faltar en otro equipo. Las instrucciones deben partir de la carpeta entregada y declarar sus dependencias.

Pregunta: ¿Cuál comando es reproducible dentro de java/?

Respuesta razonada: javac -encoding UTF-8 CuposProyecto.java.

## Cancelar sin sobrepasar capacidad

Al ampliar el control debes conservar capacidadInicial. Una cancelación solo es válida si existe una reserva que cancelar.

Pregunta: ¿Qué regla protege la invariante?

Respuesta razonada: Rechazar si disponibles == capacidadInicial.

