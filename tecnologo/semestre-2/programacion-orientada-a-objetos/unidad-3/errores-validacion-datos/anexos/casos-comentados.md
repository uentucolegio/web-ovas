# Casos comentados

## Registrar antes de validar

Insertar una Persona vacía y después convertir la edad deja un estado parcial si falla la conversión. La comprobación debe preceder al cambio visible.

Pregunta: ¿Cuándo insertas el objeto?

Respuesta razonada: Después de validar todos los campos.

## Mensaje y diagnóstico

La persona necesita saber cómo corregir su entrada. El equipo técnico necesita además la causa. No hace falta mostrar toda la traza al usuario.

Pregunta: ¿Qué conserva ambos niveles?

Respuesta razonada: Mensaje claro y causa original.

## Doble fallo al cerrar

Un recurso puede fallar al trabajar y también al cerrarse. try-with-resources permite conservar el fallo principal y consultar los suprimidos.

Pregunta: ¿Cerrar un recurso revierte una inserción?

Respuesta razonada: No, son responsabilidades diferentes.

