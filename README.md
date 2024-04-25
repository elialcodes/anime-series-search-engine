EJERCICIO CORRESPONDIENTE A LA EVALUACIÓN DEL MÓDULO 2 - JAVASCRIPT

El ejercicio consiste en un buscador de series anime y las herramientas utilizadas han sido HTML, CSS y Javascript.

HTML:
Estructura básica con las siguientes características:
- un input buscador de series/personajes
- un botón de "Buscar" y otro de "Reset"
- un contenedor de series favoritas
- un contendedor de series principal para los resultados de la búsqueda

CSS:
- estilado sencillo, no era el objetivo del ejercicio
- se ha partido de un enfoque "mobile first" y a partir de ahí se ha cuidado el diseño responsive con medias queries.

JAVASCRIPT:
Funcionalidades requeridas:
- búsqueda de series a partir de un valor introducido en el input
- petición de datos al servidor con fetch a través de API (asincronía)
- renderizar la información obtenida en forma de "cards" en el contenedor "principal"
- seleccionar las cards y añadirlas al contenedor de "favoritos"
- añadir una clase para resaltar, en el contenedor principal, que la card está en el contenedor de favoritos
- añadir las cards con su información en localStorage, de tal forma que al recargar la página se muestren por defecto
- eliminar las cards del contenedor de favoritos con un botón individual para cada card o con un botón que las elimina
  de una vez, ambos hacen que las series también desaparezcan del localStorage
- un botón de "Reset" que restaura el estado inicial de la página: sin lista de favoritos y sin lista de resultados de búsqueda.
