import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class TarifaTest {
    @Test
    void aceptaCero() {
        assertEquals(0, PruebasTarifa.calcular(0));
    }
    @Test
    void calculaTresUnidades() {
        assertEquals(7500, PruebasTarifa.calcular(3));
    }
    @Test
    void aceptaLimiteSuperior() {
        assertEquals(25000, PruebasTarifa.calcular(10));
    }
    @Test
    void rechazaNegativo() {
        assertThrows(IllegalArgumentException.class,
        () -> PruebasTarifa.calcular(-1));
    }
    @Test
    void rechazaOnce() {
        assertThrows(IllegalArgumentException.class,
        () -> PruebasTarifa.calcular(11));
    }
}
