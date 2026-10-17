import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;
import static org.junit.jupiter.api.Assertions.*;

public class TarifaParametrizadaTest {
    @ParameterizedTest
    @CsvSource({"0,0", "1,2500", "3,7500", "9,22500", "10,25000"})
    void aceptaCantidadesValidas(int cantidad, int esperado) {
        assertEquals(esperado, PruebasTarifa.calcular(cantidad));
    }
    @ParameterizedTest
    @ValueSource(ints = {-1, 11})
    void rechazaFueraDeRango(int cantidad) {
        assertThrows(IllegalArgumentException.class, () -> PruebasTarifa.calcular(cantidad));
    }
}
