import pandas as pd
import plotly.express as px

# 1. Cargar el archivo Excel recorriendo sus 19 pestañas
file_name = "Narración Gráfica Santiago en cien palabras RM.xlsx"
xls = pd.ExcelFile(file_name)

all_editions_data = []

# Mapeo de nombres de hojas a números correlativos
edition_mapping = {sheet: i+1 for i, sheet in enumerate(xls.sheet_names)}

for sheet in xls.sheet_names:
    df = pd.read_excel(file_name, sheet_name=sheet)
    
    # Limpieza básica de la columna Comuna
    df = df[df['Comuna'].notna()]
    df['Comuna'] = df['Comuna'].astype(str).str.strip()
    df = df[df['Comuna'] != '<']  # Limpieza de caracteres de control
    
    # Contar cuántos cuentos ganó cada comuna EN ESTA edición
    counts = df['Comuna'].value_counts().reset_index()
    counts.columns = ['Comuna', 'Count']
    counts['Edicion'] = edition_mapping[sheet]
    counts['Edicion_Str'] = sheet
    all_editions_data.append(counts)

# Consolidar todo en un solo DataFrame
df_all = pd.concat(all_editions_data, ignore_index=True)

# 2. Reconstruir la grilla histórica completa para calcular el acumulado real
all_communes = df_all['Comuna'].unique()
all_editions = sorted(df_all['Edicion'].unique())
idx = pd.MultiIndex.from_product([all_communes, all_editions], names=['Comuna', 'Edicion'])
df_grid = pd.DataFrame(index=idx).reset_index()

df_merged = pd.merge(df_grid, df_all[['Comuna', 'Edicion', 'Count']], on=['Comuna', 'Edicion'], how='left')
df_merged['Count'] = df_merged['Count'].fillna(0).astype(int)

# Calcular la suma acumulada histórica por comuna
df_merged = df_merged.sort_values(by=['Comuna', 'Edicion'])
df_merged['Cumulative_Count'] = df_merged.groupby('Comuna')['Count'].cumsum()

# 3. Filtrar las 15 comunas con mayor puntaje histórico al llegar a la edición 19
final_standing = df_merged[df_merged['Edicion'] == 19].sort_values(by='Cumulative_Count', ascending=False)
top_15_comunas = final_standing.head(15)['Comuna'].tolist()

df_race = df_merged[df_merged['Comuna'].isin(top_15_comunas)].copy()
# Ordenar el eje Y de mayor a menor según el podio final histórico
df_race['Comuna'] = pd.Categorical(df_race['Comuna'], categories=top_15_comunas[::-1], ordered=True)
df_race = df_race.sort_values(by=['Edicion', 'Comuna'])

# 4. Construir la animación interactiva Noir en Plotly
fig = px.bar(
    df_race,
    x="Cumulative_Count",
    y="Comuna",
    animation_frame="Edicion_Str", # 🎬 El motor de la animación por edición
    orientation='h',
    range_x=[0, 280], # Límite máximo de Santiago para que el eje X no se mueva
    labels={"Cumulative_Count": "Cuentos acumulados premiados", "Comuna": ""},
    title="Evolución Histórica de Comunas Premiadas"
)

# Estilizado Noir / Sin City a la medida de tu Webstory
fig.update_layout(
    plot_bgcolor="rgba(0,0,0,0)",
    paper_bgcolor="rgba(0,0,0,0)",
    font_family="Oswald",
    font_color="#111111",
    title_font_size=22,
    margin=dict(l=140, r=30, t=50, b=40)
)

fig.update_traces(
    marker_color="#111111",        # Barras negras Noir
    marker_line_color="#E60000",   # Bordes rojos Sin City
    marker_line_width=1.5
)

# Guardar directo en tu carpeta de visualizaciones para tu iframe
fig.write_html("visualizaciones/chart_race_historica.html", config={'displayModeBar': False})
print("¡Gráfico interactivo generado con éxito en visualizaciones/chart_race_historica.html!")


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
Vulnerabilidad vs participación comunal
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

import json
import os
import unicodedata
import pandas as pd
import plotly.express as px
archivos_excel = [
f
for f in os.listdir(".")
if f.endswith(".xlsx") and "Santiago en cien" in f
]
if not archivos_excel:
archivos_excel = [f for f in os.listdir(".") if f.endswith(".xlsx")]
if not archivos_excel:
raise FileNotFoundError("No se encontro el archivo Excel.")
file_name = archivos_excel[0]
xls = pd.ExcelFile(file_name)
def normalizar_texto(texto):
if not isinstance(texto, str):
return ""
texto = "".join(
c
for c in unicodedata.normalize("NFD", texto)
if unicodedata.category(c) != "Mn"
)
return texto.strip().upper()
all_data = []
for sheet in xls.sheet_names:
df = pd.read_excel(file_name, sheet_name=sheet)
if "Comuna" in df.columns:
df = df[df["Comuna"].notna()]
df["Comuna"] = df["Comuna"].astype(str).str.strip()
df = df[df["Comuna"] != "<"]
all_data.append(df[["Comuna"]])
if not all_data:
raise ValueError("No se encontro la columna 'Comuna' en el archivo Excel.")
df_total = pd.concat(all_data, ignore_index=True)
df_mapa = df_total.groupby("Comuna").size().reset_index(name="Cantidad")
df_mapa["Comuna_Clean"] = df_mapa["Comuna"].apply(normalizar_texto)
geojson_path = "comunas.json"
if not os.path.exists(geojson_path):
raise FileNotFoundError(f"No se encontro el archivo '{geojson_path}'.")
with open(geojson_path, "r", encoding="utf-8") as f:
geojson_data = json.load(f)
primer_feature_props = geojson_data["features"][0]["properties"]
todas_las_claves = list(primer_feature_props.keys())
claves_filtradas = [
k
for k in todas_las_claves
if not any(x in k.lower() for x in ["cod", "id", "num", "sh", "area", "len"])
]
key_encontrada = None
for k in claves_filtradas:
if k.lower() in [
"comuna",
"nom_comuna",
"nom_com",
"nombre",
"name",
"nom_comun",
]:
key_encontrada = k
break
if not key_encontrada and claves_filtradas:
key_encontrada = claves_filtradas[0]
if not key_encontrada:
raise KeyError(
f"No se encontro la columna de nombres. Claves: {todas_las_claves}"
)
for feature in geojson_data["features"]:
feature["properties"]["name_clean"] = normalizar_texto(
str(feature["properties"][key_encontrada])
)
fig = px.choropleth(
df_mapa,
geojson=geojson_data,
locations="Comuna_Clean",
featureidkey="properties.name_clean",
color="Cantidad",
range_color=[0, 130],
color_continuous_scale=["#1C1C1C", "#551111", "#AA0000", "#E60000"],
labels={"Cantidad": "Cuentos Ganadores"},
hover_name="Comuna",
hover_data={"Comuna_Clean": False},
)
fig.update_geos(
fitbounds="locations",
visible=False,
bgcolor="rgba(0,0,0,0)",
showrivers=False,
showlakes=False,
)
fig.update_traces(marker_line_color="#444444", marker_line_width=0.8)
fig.update_layout(
margin={"r": 0, "t": 0, "l": 0, "b": 0},
paper_bgcolor="rgba(0,0,0,0)",
plot_bgcolor="rgba(0,0,0,0)",
font_family="Oswald",
font_color="#FFFFFF",
coloraxis_colorbar=dict(
title="Cuentos",
thickness=15,
len=0.5,
yanchor="middle",
y=0.5,
xanchor="left",
x=0.03,
tickvals=[0, 30, 60, 90, 120, 130],
ticktext=["0", "30", "60", "90", "120", "130+"],
),
)
fig.write_html("mapa_comunas_rm.html", config={"displayModeBar": False}