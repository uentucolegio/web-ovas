/** Control en memoria, sin concurrencia ni persistencia. */
public class CuposCancelables {
    private final int capacidadInicial;
    private int disponibles;
    /**
     * Crea un control de cupos.
     * @param capacidad numero inicial de cupos, admite cero
     * @throws IllegalArgumentException si capacidad es negativa
     */
    public CuposCancelables(int capacidad) {
        if (capacidad < 0) throw new IllegalArgumentException("Capacidad negativa");
        capacidadInicial = capacidad;
        disponibles = capacidad;
    }
    /**
     * Reserva un cupo sin permitir negativos.
     * @return cupos restantes
     * @throws IllegalStateException si no hay cupos
     */
    public int reservar() {
        if (disponibles == 0) throw new IllegalStateException("Sin cupos");
        return --disponibles;
    }
    /**
     * Cancela una reserva previa; un rechazo conserva el estado.
     * @return cupos disponibles despues de cancelar
     * @throws IllegalStateException si no hay reservas para cancelar
     */
    public int cancelarReserva() {
        if (disponibles == capacidadInicial)
            throw new IllegalStateException("No hay reservas");
        return ++disponibles;
    }
    /**
     * Consulta sin modificar el estado.
     * @return cupos disponibles
     */
    public int disponibles() { return disponibles; }
    /**
     * Ejecuta comprobaciones deterministas.
     * @param args argumentos no utilizados
     */
    public static void main(String[] args) {
        CuposCancelables control = new CuposCancelables(1);
        if (control.reservar() != 0) throw new AssertionError();
        if (control.cancelarReserva() != 1) throw new AssertionError();
        try {
            control.cancelarReserva();
            throw new AssertionError("Debio rechazar");
        } catch (IllegalStateException esperado) {
            if (control.disponibles() != 1) throw new AssertionError("Estado alterado");
        }
        System.out.println("Reserva, cancelacion y rechazo comprobados");
    }
}
