import java.util.ArrayList;
import java.util.List;

public class RegistroAtomico {
    record Persona(String nombre, int edad) {
        Persona {
            if (nombre == null || nombre.trim().isEmpty())
                throw new IllegalArgumentException("Nombre requerido");
            if (edad < 0 || edad > 120)
                throw new IllegalArgumentException("Edad fuera de rango");
            nombre = nombre.trim();
        }
    }
    private final List<Persona> personas = new ArrayList<>();
    public void registrar(String nombre, String textoEdad) {
        if (textoEdad == null || textoEdad.trim().isEmpty())
            throw new IllegalArgumentException("Edad requerida");
        final int edad;
        try { edad = Integer.parseInt(textoEdad.trim()); }
        catch (NumberFormatException causa) {
            throw new IllegalArgumentException("Edad no representable", causa);
        }
        Persona nueva = new Persona(nombre, edad);
        personas.add(nueva); // Cambio visible solo despues de validar.
    }
    public int cantidad() { return personas.size(); }
    public static void main(String[] args) {
        RegistroAtomico registro = new RegistroAtomico();
        registro.registrar("Ana", "18");
        String[] invalidas = {"abc", "121", "2147483648"};
        for (String entrada : invalidas) {
            int antes = registro.cantidad();
            try {
                registro.registrar("Luis", entrada);
                throw new AssertionError("Debio rechazar");
            } catch (IllegalArgumentException esperado) {
                if (registro.cantidad() != antes) throw new AssertionError("Cambio parcial");
                System.out.println(entrada + " rechazada; registros=" + registro.cantidad());
            }
        }
        registro.registrar("Luis", "0");
        System.out.println("Reintento valido; registros=" + registro.cantidad());
    }
}
