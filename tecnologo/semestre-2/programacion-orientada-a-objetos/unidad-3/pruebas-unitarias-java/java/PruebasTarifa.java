public class PruebasTarifa {
    public static int calcular(int cantidad) {
        if (cantidad < 0 || cantidad > 10) {
            throw new IllegalArgumentException("Cantidad fuera de 0..10");
        }
        return cantidad * 2500;
    }
    static void igual(int esperado, int actual) {
        if (esperado != actual) {
            throw new AssertionError("Esperado " + esperado + ", actual " + actual);
        }
    }
    static void rechaza(int cantidad) {
        try {
            calcular(cantidad);
        } catch (IllegalArgumentException e) {
            return;
        }
        throw new AssertionError("Debio rechazar " + cantidad);
    }
    public static void main(String[] args) {
        igual(0, calcular(0));
        igual(7500, calcular(3));
        igual(25000, calcular(10));
        rechaza(-1);
        rechaza(11);
        System.out.println("5 comprobaciones correctas");
    }
}
