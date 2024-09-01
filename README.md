# Entrega de Desafíos & Pre-Entregas del Curso Back End de CoderHouse

Repositorio de Desafíos & Pre-Entregas del Curso de BackEnd. #Comisión 53135

Autor: Francisco Borriello (El borry)

## ¿Qué veremos en este repositorio?

En este repositorio se encuentra el código para el sistema de gestión de productos y usuarios, desarrollado como parte de los desafíos y pre-entregas del curso de Back End en CoderHouse. Cada uno de los colaboradores se ha especializado en un área diferente: Francisco Borriello se ha enfocado en la gestión de productos y Esteban Samaniego en la gestión de usuarios.

## Sistema de Gestión de Productos y Usuarios

Este proyecto proporciona una solución integral para la gestión de productos y usuarios, implementado en un entorno web utilizando tecnologías como Node.js, Express, y Socket.IO, entre otros. Está diseñado para facilitar la administración de un inventario de productos y una base de datos de usuarios, adecuado para empresas o proyectos en línea.

## Características

- **Gestión de Productos**: Permite agregar, visualizar, actualizar y eliminar productos.
- **Gestión de Usuarios**: Soporta la creación y visualización de usuarios.

## Comenzando

### Pre-requisitos o Dependencias

Antes de comenzar, asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu sistema. Este proyecto también utiliza MongoDB como sistema de base de datos, por lo que es necesario tenerlo instalado y configurado.

Instalación de dependencias:

npm install

Configura las variables de entorno siguiendo el ejemplo proporcionado en .env.example.
Inicia el servidor: npm start

El servidor estará corriendo y accesible en <http://localhost:8080>.

Instrucciones para el uso de la API
Gestión de Productos
Crear un Producto: POST /api/products
{
  "name": "Aceite Motor",
  "price": 5000,
  "description": "Aceite de motor sintético para alto rendimiento."
}

Obtener Productos: GET /api/products
Actualizar Producto: PUT /api/products/:id

{
  "name": "Aceite Motor Mejorado",
  "price": 5500,
  "description": "Aceite de motor sintético mejorado para alto rendimiento."
}

Eliminar Producto: DELETE /api/products/:id
Gestión de Usuarios
Crear Usuario: POST /api/users

{
  "email": "<usuario@example.com>",
  "password": "passwordSeguro123",
  "role": "admin"
}

Obtener Usuarios: GET /api/users

Contribuyendo
Si deseas contribuir a este proyecto, por favor haz un fork del repositorio y crea una pull request con tus cambios. Las contribuciones son bienvenidas y apreciadas.
