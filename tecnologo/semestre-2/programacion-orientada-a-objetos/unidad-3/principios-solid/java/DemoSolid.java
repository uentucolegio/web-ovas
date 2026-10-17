public class DemoSolid {
    interface Politica {
        // Para subtotal >= 0, devuelve entre 0 y subtotal.
        int aplicar(int subtotal);
    }
    static class SinDescuento implements Politica {
        public int aplicar(int subtotal) { return subtotal; }
    }
    static class DiezPorCiento implements Politica {
        public int aplicar(int subtotal) {
            return subtotal - subtotal / 10;
        }
    }
    static int total(int subtotal, Politica politica) {
        if (subtotal < 0 || politica == null) {
            throw new IllegalArgumentException("Entrada invalida");
        }
        int valor = politica.aplicar(subtotal);
        if (valor < 0 || valor > subtotal) {
            throw new IllegalStateException("Contrato incumplido");
        }
        return valor;
    }
    public static void main(String[] args) {
        System.out.println(total(10000, new SinDescuento()));
        System.out.println(total(10000, new DiezPorCiento()));
        System.out.println(total(0, new DiezPorCiento()));
        try {
            total(-1, new SinDescuento());
        } catch (IllegalArgumentException e) {
            System.out.println("Rechazado");
        }
    }
}
