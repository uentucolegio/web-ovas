public class RegistroSeguro {
    static int convertirEdad(String texto) {
        if (texto == null || texto.trim().isEmpty()) {
            throw new IllegalArgumentException("Edad requerida");
        }
        final int edad;
        try {
            edad = Integer.parseInt(texto.trim());
        } catch (NumberFormatException causa) {
            throw new IllegalArgumentException(
            "Edad: entero representable requerido", causa);
        }
        if (edad < 0 || edad > 120) {
            throw new IllegalArgumentException("Edad fuera de 0..120");
        }
        return edad;
    }
    public static void main(String[] args) {
        String[] entradas = {" 18 ", "0", "120", "121", "abc", null};
        for (String entrada : entradas) {
            try {
                System.out.println("OK " + convertirEdad(entrada));
            } catch (IllegalArgumentException e) {
                System.out.println("ERROR " + e.getMessage());
            }
        }
    }
}
