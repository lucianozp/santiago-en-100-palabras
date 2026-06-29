## Santiago en 100  ̶p̶a̶l̶a̶b̶r̶a̶s̶: 4 comunas

# ¿De qué trata nuestro reportaje?
Nuestro reportaje es sobre el concurso Santiago en 100 palabras. Creado en el año 2001 por la fundación Plagio, ha tenido como objetivo democratizar la cultura y fomentar la literatura, pero, ¿Es tan así? Es por esto que hemos decidido realizar esta investigación y averiguar la comuna de origen de los autores de Santiago en 100 palabras. Con esto podremos observar si el concurso ha logrado sus objetivos de democratizar la cultura. A partir de ello, realizamos diferentes bases de datos en las cuales podíamos observar el título del cuento, a la edición que pertenece, el nombre del autor del cuento y la comuna a la que pertenece el autor. Con estos datos, las bases de datos nos señalan el número de autores de las comunas, los rangos etarios más repetidos, etc. Por lo que nuestro reportaje explora el por qué hay comunas con mayor representación que otras, ya sea analizando la situación socioeconómica de cada comuna, además del los puntajes promedio PSU de la comuna. Indagamos en estos datos, puesto que no es lo mismo para un autor de una comuna con buenos resultados socioeconómicos, que para uno de una comuna con malos. Los autores que viven en comunas con una mejor educación y con más herramientas creativas, les permite correr con ventaja para este tipo de instancias. Si bien cada persona posee habilidades literarias distintas, se necesita de herramientas que permitan pulirlo y mejorarlo. De forma que nuestra investigación explica como el concurso premia más a autores de ciertas comunas, convirtiendo a Santiago en 100 palabras en una muestra de la brecha sociocultural que existe en nuestro país.

# Análisis de Hipótesis: ¿lograron demostrar su hipotesis inicial? ¿Cómo evolucionó a lo largo del trabajo?
En nuestra opinión, si logramos demostrar nuestra hipótesis, ya que las comunas con más autores en Santiago en 100 palabras son Santiago, Ñuñoa, Providencia y Las Condes, a pesar de no contar con una mayor cantidad de habitantes, como es el caso de Puente Alto o Maipú. De esta forma, comunas con una mejor realidad socioeconómica se ven representadas con un mayor número de autores que comunas con peores índices socioeconómicos. Esto se puede explicar con qué tener una mejor educación y más herramientas creativas, además de un mayor acceso a la cultura si importa a la hora de participar en este tipo de concursos literarios, formando una brecha sociocultural en nuestro país. La hipótesis fue la misma a lo largo del todo trabajado, sin embargo tuvimos que ir puliendo nuestras bases de datos, cosa de eliminar algunas secciones o reducir nuestro estudio a solo la región Metropolitana. 


Subcarpeta de visualizaciones:
Análisis de sus visualizaciones en relación con la historia que están contando: ¿Qué dimensiones y mensajes quieren comunicar con ellas?

## Código de las visualizaciones

# Concentración de casos por comuna: 
import pandas as pd
import altair as alt
from google.colab import files


df = pd.read_excel('/content/CONSOLIDADO SOLO RM COMUNAS OFICIAL AHORA.xlsx')


resumen = df['Comuna'].value_counts().reset_index()
resumen.columns = ['Comuna', 'Casos']
resumen['Porcentaje'] = (resumen['Casos'] / resumen['Casos'].sum()) * 100


chart = alt.Chart(resumen).mark_bar().encode(
    x=alt.X('Porcentaje:Q', title='Porcentaje (%)'),
    y=alt.Y('Comuna:N', sort='-x', title='Comuna'),
    color=alt.Color('Porcentaje:Q', scale=alt.Scale(scheme='viridis'), legend=None),
    tooltip=['Comuna', 'Casos', alt.Tooltip('Porcentaje:Q', format='.1f')]
).properties(
    width=600,
    height=800,
    title='Concentración de Casos por Comuna (RM)'
).interactive()


chart.save('vis_01.html')
chart.display()

# Vulnerabilidad vs participación comunal
import pandas as pd
import altair as alt


data_pobreza = {
    'Comuna': ['San Pedro', 'Alhué', 'Tiltil', 'Lo Espejo', 'María Pinto', 'La Pintana', 'Curacaví', 'Lampa', 'Colina', 'San José De Maipo', 'Cerro Navia', 'El Monte', 'Estación Central', 'Melipilla', 'Isla De Maipo', 'Cerrillos', 'Independencia', 'La Granja', 'Recoleta', 'Paine', 'Pedro Aguirre Cerda', 'Quinta Normal', 'San Joaquín', 'Padre Hurtado', 'Renca', 'Pirque', 'Lo Prado', 'San Ramón', 'Buin', 'Puente Alto', 'Conchalí', 'San Bernardo', 'Huechuraba', 'Calera De Tango', 'El Bosque', 'Quilicura', 'Talagante', 'Pudahuel', 'Peñalolén', 'Santiago', 'Peñaflor', 'Maipú', 'Macul', 'La Cisterna', 'La Florida', 'San Miguel', 'Lo Barnechea', 'Ñuñoa', 'La Reina', 'Las Condes', 'Providencia', 'Vitacura'],
    'Pobreza': [32.0, 29.2, 29.0, 28.8, 27.2, 27.0, 25.9, 25.7, 24.6, 24.5, 23.1, 23.0, 22.9, 22.9, 22.9, 22.6, 22.5, 22.4, 21.2, 21.0, 20.2, 19.7, 19.7, 19.6, 19.5, 19.5, 19.4, 19.2, 19.2, 19.0, 18.8, 18.8, 18.7, 18.6, 17.5, 17.1, 17.0, 16.9, 16.7, 16.5, 15.2, 14.9, 13.5, 13.5, 13.2, 13.0, 10.9, 5.2, 4.9, 4.5, 4.4, 2.5]
}
df_pobreza = pd.DataFrame(data_pobreza)


df_excel = pd.read_excel('/content/CONSOLIDADO SOLO RM COMUNAS OFICIAL AHORA.xlsx')
resumen_excel = df_excel['Comuna'].value_counts(normalize=True).reset_index()
resumen_excel.columns = ['Comuna', 'Porcentaje_Casos']
resumen_excel['Porcentaje_Casos'] *= 100


df_final = pd.merge(resumen_excel, df_pobreza, on='Comuna')


chart = alt.Chart(df_final).mark_circle(size=250).encode(
    x=alt.X('Pobreza:Q', title='Pobreza Multidimensional (%)'),
    y=alt.Y('Porcentaje_Casos:Q', title='Participación (%)'),
    color=alt.Color('Comuna:N', legend=None),
    tooltip=['Comuna', 'Pobreza', 'Porcentaje_Casos']
).properties(
    title='Vulnerabilidad vs Participación Comunal',
    width=600,
    height=400
).interactive()


chart.save('vis_pobreza.html')
chart.display()

# Distribución de premios: Sector oriente vs resto de la RM
import pandas as pd
import altair as alt

elite = ['Vitacura', 'Las Condes', 'Providencia', 'Lo Barnechea', 'La Reina', 'Ñuñoa']

df_unido['Grupo'] = df_unido['Comuna'].apply(lambda x: 'Sector Oriente' if x in elite else 'Resto de la RM')
df_grupos = df_unido.groupby(['Edicion_Num', 'Grupo'])['Premios'].sum().reset_index()

chart = alt.Chart(df_grupos).mark_area().encode(
    x=alt.X('Edicion_Num:O', title='Edición'),
    y=alt.Y('Premios:Q', stack='normalize', title='Proporción de Premios'),
    color=alt.Color('Grupo:N', title='Grupo'),
    tooltip=['Edicion_Num', 'Grupo', 'Premios']
).properties(
    width=600,
    title='Distribución de Premios: Sector Oriente vs Resto de la RM'
)

chart.save('vis_distribucion.html')
chart.display()