/**
* Controla cupos en memoria; no ofrece seguridad entre hilos.
*/
public class CuposProyecto {
    private int cupos;

    /**
    * Crea un control con la capacidad indicada.
    * @param capacidad cupos iniciales, admite cero
    * @throws IllegalArgumentException si capacidad es negativa
    */
    public CuposProyecto(int capacidad) {
        if (capacidad < 0) {
            throw new IllegalArgumentException("Capacidad negativa");
        }
        cupos = capacidad;
    }

    /**
    * Reserva un cupo; un rechazo conserva el estado.
    * @return cupos restantes despues de reservar
    * @throws IllegalStateException si no quedan cupos
    */
    public int reservar() {
        if (cupos == 0) {
            throw new IllegalStateException("Sin cupos");
        }
        return --cupos;
    }

    /**
     * Consulta la disponibilidad sin modificar el estado.
     * @return cantidad de cupos disponibles
     */
    public int disponibles() { return cupos; }

    /**
    * Ejecuta una demostracion determinista.
    * @param args argumentos de consola no utilizados
    */
    public static void main(String[] args) {
        CuposProyecto control = new CuposProyecto(1);
        System.out.println(control.disponibles());
        System.out.println(control.reservar());
        try {
            control.reservar();
        } catch (IllegalStateException e) {
            System.out.println(e.getMessage());
        }
        System.out.println(control.disponibles());
    }
}
