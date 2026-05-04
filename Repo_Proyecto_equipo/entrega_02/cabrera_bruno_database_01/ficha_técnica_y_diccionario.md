

## Fuente de los datos
Nuestras fuentes son:
- PDFs disponibles en la página de *Santiago en 100 palabras*
- Datos de la encuesta CASEN
- Datos del Censo 2024

## Metodología de la construcción de la base
Las primeras ediciones fueron tabuladas de forma manual. Sin embargo, desde la quinta en adelante decidimos utilizar Gemini+ para continuar con la tabulación.

Así economizamos trabajo, dejando para nosotros solo la revisión de si efectivamente la IA había recogido los datos de manera correcta.

## Alcance de los datos
Nuestros datos de los cuentos ganadores van desde el 2001 hasta el 2025, y geográficamente se sitúan mayormente en comunas del Gran Santiago, aunque hay ciertas excepciones con comunas de otras regiones.

Respecto a los indicadores socioeconómicos, estos se sitúan en comunas de la Región Metropolitana y abarcan datos recogidos desde el 2011 hasta el 2024.

## Características de los datos
- **Datos cualitativos:** nombres de autores, género, título del cuento y comuna.
- **Datos cuantitativos:** edad del autor, promedios en índices de pobreza, puntajes PSU y puntajes SIMCE.

---

## Diccionario de datos

| Nombre de variable | Descripción | Tipo de dato | Valores posibles | Observaciones |
|-------------------|------------|-------------|------------------|--------------|
| Titulo | Nombre del relato | Cualitativo | Ej: “Bonsái” | Ortografía original |
| Nombre | Nombre o seudónimo del autor | Cualitativo | Ej: “Gabriel Boric” | Según aparece en el libro |
| Edad | Edad declarada por el autor | Cuantitativo | 0-99 | “S/D” si no especifica |
| Comuna | Comuna declarada por el autor | Cualitativo | Santiago, Conchalí, etc. | - |
| Género | Género según señala el libro | Cualitativo | Hombre o mujer | - |
| Porcentaje de personas en situación de pobreza por ingresos | Porcentaje de personas que viven en hogares cuyos ingresos no alcanzan para cubrir una canasta básica | Cuantitativo | 0 - 99 | - |
| Porcentaje de personas en situación de pobreza comunal multidimensional | Porcentaje de personas con carencias en educación, salud, vivienda, trabajo y redes sociales | Cuantitativo | 0 - 99 | - |
| Puntaje SIMCE promedio por comuna en comprensión de lectura | Promedio de resultados SIMCE en lectura por comuna | Cuantitativo | 200 - 290 | - |
| Porcentaje de establecimientos por comuna con puntaje mayor o igual a 450 puntos PSU | Promedio de resultados PSU mayor o igual a 450 puntos por tipo de establecimiento (municipal, particular pagado y particular subvencionado) presente en la comuna | Cuantitativo | 0 - 99 | - |