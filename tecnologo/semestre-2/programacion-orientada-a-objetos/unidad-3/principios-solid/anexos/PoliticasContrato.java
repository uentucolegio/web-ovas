import java.util.Objects;

public class PoliticasContrato {
    interface Politica { int aplicar(int subtotal); }
    static int total(int subtotal, Politica politica) {
        if (subtotal < 0) throw new IllegalArgumentException("Subtotal negativo");
        Objects.requireNonNull(politica, "Politica requerida");
        int valor = politica.aplicar(subtotal);
        if (valor < 0 || valor > subtotal) throw new IllegalStateException("Contrato incumplido");
        return valor;
    }
    public static void main(String[] args) {
        Politica fija = subtotal -> Math.max(0, subtotal - 500);
        int[][] casos = {{0, 0}, {300, 0}, {10000, 9500}};
        for (int[] c : casos) {
            int actual = total(c[0], fija);
            if (actual != c[1]) throw new AssertionError("Total incorrecto");
            System.out.println(c[0] + " -> " + actual);
        }
        try {
            total(300, subtotal -> -1);
            throw new AssertionError("Debio rechazar la politica");
        } catch (IllegalStateException esperado) {
            System.out.println("Politica incompatible rechazada");
        }
    }
}
