# Casos comentados

## Pago con doble responsabilidad

Un cambio de correo obliga a modificar el cálculo. La solución es separar las razones de cambio, manteniendo una operación clara de ensamblaje.

Pregunta: ¿Qué prueba debería poder hacerse sin correo?

Respuesta razonada: Calcular el total.

## Abstracción excesiva

Un valor constante de IVA no requiere por sí solo diez fábricas. La separación debe justificarse con un cambio concreto, no con cantidad de patrones.

Pregunta: ¿Qué justifica una nueva interfaz?

Respuesta razonada: Una variación real con contrato estable.

## Contrato monetario

Para subtotal 999 la política devuelve 900: 999 / 10 es 99 y se resta ese descuento. Otra política de redondeo sería un cambio del contrato.

Pregunta: ¿Cuál es el descuento entero aplicado?

Respuesta razonada: 99.

