* Fuente de los datos:
Nuestras fuentes son los PDF que estan en la página de Santiago en 100 palabras, desde la edición 1 a la 19.

* Metodología de la construcción de la base
Algunas ediciones las hicimos a mano, es decir, tabulando de forma manual. Luego realizamos un prompt y le solicitamos a Gemini+ que tabulara por nosotros, dicho proceso fue vigilido y nos encargabamos de ver si la Inteligencia Artificial había hecho bien su trabajo.

* Alcance de los datos.
Nuestros datos son del año de la creación del concurso, 2001, hasta el año 2025. Abarca las ubicaciones presentes en los libros, mayormente comunas del Gran Santiago. Por último, solo analizamos los cuentos ganadores, es decir, los que se encuentran presentes en los libros.

* Característica de los datos.
Tenemos datos cualitativos como: los nombres de los autores, su género, el título de su cuento y su comuna. Nuestro dato cuantitativo es la edad del autor.

* Diccionario de datos: tabla con el nombre de cada variable, su descripción, tipo de dato, valores posibles y observaciones editoriales (si aplica).
## Tables

| Nombre de Variable | Descripción | Tipo de Dato | Valores Posibles | Observaciones Editoriales |
| :--- | :--- | :--- | :--- | :--- |
| `titulo` | Nombre del relato | Cualitativo | Ej: "Bajo el Metro" | Mantener ortografía original |
| `autor_nombre` | Nombre o seudónimo del autor | Cualitativo | Ej: "Juan Pérez" | Según aparece en el libro |
| `autor_edad` | Edad declarada del autor | Cuantitativo | 0 - 99 | "S/D" si no se especifica |
| `comuna_residencia` | Comuna declarada por el autor | Cualitativo | Santiago, Maipú, etc. | Normalizado según RM |
| `género` | Género según señala el libro | Cualitativo | Hombre o Mujer | Consultado en la oficina de Fundación Plagio |
