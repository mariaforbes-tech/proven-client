# Portal del cliente — Proven Solutions

Aplicación **aparte** del portal del equipo, a propósito: el navegador del cliente
nunca descarga el código de lo demás. Vive en `client.provensolutionseastcoast.com`
y lee de la misma base de Supabase.

## Qué ve el cliente

- **El avance de su obra**: porcentaje, en qué fase van, qué sigue, entrega estimada.
- **Lo que falta que escoja**: con fecha límite, su allowance, y un campo para responder.
- **Sus pagos**: pagado, pendiente y el próximo con su fecha.
- **Fotos y avances**: solo las que alguien del equipo marque "mostrar al cliente".
  Puede responder ahí mismo.

## Qué NO ve, y está probado contra la base

Gastos · recibos · materiales y lo que cuestan · horas de la cuadrilla ·
el chat interno de obra · los pendientes internos del día · los leads del CRM ·
los pagos a trabajadores · **lo que se le debe a los subcontratistas** ·
y cualquier proyecto que no sea el suyo.

Tampoco puede cambiar un allowance, meter un recibo, escribir un mensaje oculto,
ni responder la selección de otro proyecto.

## Instalación

1. Repositorio nuevo en GitHub: `proven-client`, **Public**, sin README.
2. Sube **el contenido de esta carpeta** (los archivos sueltos).
3. Settings → Pages → rama `main`, carpeta `/ (root)`.
4. En Squarespace, registro **CNAME**: host `client`, data `mariaforbes-tech.github.io`.
5. Cuando el dominio responda, marca **Enforce HTTPS**.

`config.js` ya trae la URL y la llave de Supabase. Es la misma base del portal del
equipo: no hay nada que duplicar.

## Dar de alta un cliente

Está en `ACTIVAR-UN-CLIENTE.sql`. Resumen:

1. Supabase → Authentication → Users → **Add user**, con **Auto Confirm User** marcado.
2. Corres el SQL cambiando el correo y el nombre del proyecto.
3. Le pasas correo y contraseña al cliente.

Para quitarle el acceso cuando la obra termine, basta con borrar su fila de
`project_clients`. La cuenta queda, pero deja de ver el proyecto.

## Mostrarle una foto

En el portal del equipo, en el chat de obra, la foto se marca para el cliente.
Lo que no se marca, no sale aquí. Los recibos nunca salen.
