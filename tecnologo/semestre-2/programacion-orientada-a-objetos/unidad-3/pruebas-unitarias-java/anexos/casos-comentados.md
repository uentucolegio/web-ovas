# Casos comentados

## La suite que acepta todo

Un test solo imprime la tarifa. Incluso un cálculo incorrecto deja el proceso en verde porque no se compara nada.

Pregunta: ¿Qué falta?

Respuesta razonada: Una aserción contra el contrato.

## Pruebas basadas en datos

Cinco cantidades válidas pueden compartir una sola prueba parametrizada. Cada fila mantiene su resultado esperado y cuenta como una ejecución.

Pregunta: ¿Qué debe incluir cada fila?

Respuesta razonada: Entrada y esperado.

## La prueba que detecta el defecto

Si se cambia > 10 por >= 10, el caso cantidad 10 debe fallar. La cobertura de una línea no explica por sí sola si un defecto se detectó.

Pregunta: ¿Qué significa un mutante detectado?

Respuesta razonada: Una prueba falla frente al cambio defectuoso.

