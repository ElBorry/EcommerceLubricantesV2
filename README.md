# Módulos de Testing para proyecto final

En esta entrega se evaluará:

- Testear el proyecto final, con los recursos, parámetros, consultas, cuerpos, encabezamientos y respuestas correspondientes.
- En esta entrega como mínimo testear CRUD de Product.
- Testear el “stress” de un flujo con al menos tres operaciones.

Tener presenté que para mi caso estoy trabajando con auth y no con sessions

## Estructura de Datos de cada Modelo (Schema)

Cada producto tiene las siguientes propiedades:

- **_id_** (código identificador de 12bytes y hexadecimal)
- **_title_** (titulo, obligatorio)
- **_photo_** (ruta de imagen, dar valores por defecto)
- **_category_** (categoria del producto, dar valores por defecto)
- **_price_** (precio, por defecto 1)
- **_stock_** (unidades disponibles, por defecto 1)

Cada usuario tiene las siguientes propiedades:

- **_id_** (12bytes y hexadecimal)
- **_photo_** (ruta de imagen, dar valores por defecto)
- **_email_** (obligatorio)
- **_password_** (obligatorio)
- **_role_** (rol de usuario, por defecto 0)
- **_verify_** (Bool para controlar el registro, por defecto false)
- **_code_** (Código para validar el registro y `cada inicio de sesión (Se manda un código en cada LOG IN)`)

Cada carrito tiene las propiedades:

- **_user_id_** (para referenciar el usuario que agregó el producto a su carrito)
- **_product_id_** (para referenciar el producto que se agregó al carrito)
- **_quantity_** (de tipo númerico y obligatorio para indicar cuantas unidades se enviaron al carrito)
- **_state_** (para identificar el estado de la compra (suelen ser “reserved”, “paid”, “delivered”) )

## Clases ProductsManager, UsersManager y CartManager

Cada una de esta se construyó con una plantilla de clases, debido a que comparten los siguientes métodos:

- `create(data)`: Agrega un nuevo producto\usuario\carrito al sistema con la data enviada.
- `read()`: Devuelve una lista de todos los productos\usuarios\carrito almacenados.
- `readOne(id)`: Devuelve un producto\usuario\carrito específico según su ID.
- `readByEmail(email)`: Devuelve los datos de un usuario por su email.
- `update(id,data)`: Actualizar un producto\usuario\carrito específico según su ID y la data enviada
- `destroy(id)`: Elimina un producto\usuario\carrito según su ID.
- `destroyMany(id)`: Elimina todos los productos de usuario por su ID.
- `paginate({ filter, opts })`: Devuelve los productos paginados para su respectiva visualización.
- `aggregate(obj)`: Devuelve la suma de los productos en un carrito.

Estos métodos manejan errores utilizando `try/catch` más que todo se debe evidenciar en la parte de FileSystem.

## Requisitos Previos

- Node.js instalado, versión mayor a la 18.
- Variables de entorno

## Pasos para Probar el Servidor

1. Clonar el repositorio o descargar el código fuente.
2. Instalar las dependencias del proyecto utilizando el comando `npm install` ó `npm i` .
3. Iniciar el servidor con el comando `npm run dev` o `node server.js`.
4. Realizar las peticiones HTTP en el navegador, se recomienda google, debido a que estaremos revisando las vistas.

## Vistas

1. localhost:8080/

   - Barra de navegación
   - Logo
   - Todos los productos disponibles y paginados
   - Agregar filtro por categoría (En este caso se hizo por Title)
   - Cada tarjeta de producto tiene que linkear hacia la página de detalle del producto.

2. localhost:8080/products/:pid
   - Ver el detalle del producto en una página y poder agregar al carrito sin `hardcodear`
3. localhost:8080/users/register debe mostrar la página con un formulario para registrar un usuario. (Es funcional)
4. localhost:8080/users/login debe mostrar la página con un formulario para iniciar sesión (Al validar las creación se redigire al login para iniciar sesión)
5. localhost:8080/users debe mostrar la página con los datos del usuario (debe funcionar sin el parámetro (usar los datos de la session para enviar el id del usuario)).
6. localhost:8080/carts (debe funcionar sin el parámetro (usar los datos de la session para enviar el id del usuario))
   - Todos los productos disponibles de un usuario por su user_id
   - Agregar un botón para eliminar el producto del carrito
   - Agregar un input numérico para la gestión de la cantidad de unidades a comprar
   - Agregar un botón para finalizar la compra y borrar todos los productos del carrito, esto se realizo por medio del ENDPOINT `GET /api/tickets`, así este mismo guarda el ticket en la BD (Mongo)
   - Agregar un botón para cancelar la compra y borrar todos los productos del carrito, esto se realizo por medio del ENDPOINT `DELETE /api/carts/all`, logrando borrar todos los productos de un usuario por su respectivo ID.
   - Se puede ver el calculo total de la compra, esto se realizo por medio del ENDPOINT `GET /api/tickets`, así este mismo guarda el ticket en la BD (Mongo)
7. localhost:8080/pages/users/resetPassword formulario para cambiar la contraseña, en el que primero se envía un código al correo, después de confirmar ese código se habilita el formulario para cambiar la contraseña, la cual debe ser de mínimo 6 caracteres y debe ser diferente a la actual.

8. localhost:8080/api/docs se puede ver la implementación de swagger en donde por ahora se tiene el CRUD de los productos, se debe tener en cuenta que para la creación, actualización y borrado de un producto se debe iniciar sesión puede ser en otra pestaña como `[ADMIN]`.

## Pruebas

- En la vista `localhost:8080/` se pueden ver los productos en la “landing page”, con el next y prev para poder ver los demás productos (Paginación), además de esto aquí se encuentra el filtro, no por palabra exacta sino por letra.
- En la vista `localhost:8080/products/:pid` se puede probar dando clic en el logo de información y se redirige a la vista de cada producto, además se puede agregar al carrito desde ese punto como en la landing page.
- En la vista `http://localhost:8080/pages/users/register.html`, se puede ver el formulario de registro para el usuario, y es funcional.
- En la vista `http://localhost:8080/pages/users/login.html`, se puede ver el formulario de log in y es funcional, en caso de probar se debe registrar, para así poder tener acceso a los códigos que se envian al correo y poder validar.
- En la vista `http://localhost:8080/users`, se puede ver el usuario dando clic en la barra de navegación en la foto del perfil agregada a partir del registro, partiendo del uso de la session.
- En la vista `http://localhost:8080/pages/cart/cart.html`, se puede ver el total de productos por de cada usuario a partir de su `user_id`.
- Además de esto se probaron las persistencias memory, fs y mongo.
- En modo `Producción y Desarrollo` se puede probar la parte de `LOGIN` y `REGISTER` para generar errores, pero solo en modo `Producción` se cargan los errores en el archivo `errors.log`, y en los otros endspoints no se implemento debido a que se cuenta con respuesta predeterminadas, pero se tienen respuestas a partir del nivel http.
- En la vista `http://localhost:8080/pages/users/resetPassword.html`, se ingresa el correo (EL cual debe existir en la base de datos) y después de confirmar el código enviado al correo se habilita un formulario para el cambio de la contraseña.
- localhost:8080/api/docs se puede ver la implementación de swagger en donde por ahora se tiene el CRUD de los productos, se debe tener en cuenta que para la creación, actualización y borrado de un producto se debe iniciar sesión puede ser en otra pestaña como `[ADMIN]`.

### Observaciones

- Todas las vistas se realizarón con JS VAINILLA.
- Para probar fs se debe tener comentado la parte de enviar correos en passport, debido a que esto no permite el paso para hacer las respectivas operaciones de CRUD.
- Tanto Log in como register se validan mediante un código enviado al correo.
- Además se agregaron validaciones implementando la estrategia de `JWT + Passport` y el usuario verificado para que en caso de no tener token o no estar verificado `no sea posible` ver el carrito o agregar al mismo, o incluso los productos.
- Además se agregaron las `ALERTAS` de éxito/fracaso de registro/inicio/cierre de sesión funcionales con SweetAlert2.
- En el `CUSTOM ROUTER` se tienen respuestas predeterminadas, así como el manejo de políticas de autenticación/autorización.
- En el `CUSTOM ERROR` se tienen respuestas predeterminadas para errores más que todo para la parte del passport, debido a que en el `CUSTOM ROUTER` ya se cuenta con respuestas predeterminadas.
- SE pide las rutas con sessions, pero en mi caso estoy trabajando esa rutas con auth.
- Para ver los productos se uso Paginate, en donde se tiene un filtro si es necesario usarlo.
