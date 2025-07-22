# 🍇 Viticultura Backend

## Descripción

Este proyecto es una API REST para una aplicación de gestión vitivinícola. Permite gestionar productos, pedidos, clientes, locations, parcelas (ubicaciones geográficas) ofreciendo una estructura modular, segura y lista para producción.

La API ha sido desarrollada con Node.js, Express y una base de datos MongoDB, con validaciones robustas, control de errores y arquitectura escalable.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en servidor.
- **Express.js**: Framework minimalista para construir rutas y lógica backend.
- **MongoDB + Mongoose**: Base de datos NoSQL y ODM para modelado de datos.
- **Yarn**: Gestor de paquetes moderno y rápido.
- **Joi**: Validación avanzada de esquemas para entradas del usuario.
- **Cors**: Seguridad y configuración de cabeceras HTTP.
- **Dotenv**: Gestión de variables de entorno.

## El servidor está desplegado públicamente en Render y preparado para ser consumido por cualquier frontend compatible (por ejemplo, Angular o Postman).

https://viticultura-backend.onrender.com/products

## Características Principales

- ✅ Gestión de productos, clientes, pedidos con CRUD completo.
- ✅ Registro de parcelas (ubicaciones con coordenadas y polígonos) con uso de populate() y referencia a los datos del cliente.
- ✅ Validación robusta con Joi.
- ✅ Soporte para CORS, cabeceras seguras
- ✅ Uso de http-errors para generar errores HTTP semánticos.
- ✅ Arquitectura modular y escalable.

## 🚀 Endpoints Principales

## 📦 **Products**

| **Método** | **Ruta**        | **Descripción**                        |
| ---------- | --------------- | -------------------------------------- |
| GET        | `/products`     | Obtener todos los productos            |
| GET        | `/products/:id` | Obtener detalles de un producto por ID |
| POST       | `/products`     | Crear un nuevo producto                |
| PUT        | `/products/:id` | Reemplazar (o crear) un producto       |
| PATCH      | `/products/:id` | Actualizar parcialmente un producto    |
| DELETE     | `/products/:id` | Eliminar un producto                   |

## 🧍‍♂️ **Clients**

| **Método** | **Ruta**       | **Descripción**                       |
| ---------- | -------------- | ------------------------------------- |
| GET        | `/clients`     | Obtener todos los clientes            |
| GET        | `/clients/:id` | Obtener detalles de un cliente por ID |
| POST       | `/clients`     | Crear un nuevo cliente                |
| PUT        | `/clients/:id` | Reemplazar (o crear) un cliente       |
| PATCH      | `/clients/:id` | Actualizar parcialmente un cliente    |
| DELETE     | `/clients/:id` | Eliminar un cliente                   |

## 📍 **Locations**

| **Método** | **Ruta**                      | **Descripción**                          |
| ---------- | ----------------------------- | ---------------------------------------- |
| GET        | `/locations?owner={clientId}` | Obtener todas las parcelas de un cliente |
| POST       | `/locations`                  | Crear una nueva parcela                  |
| DELETE     | `/locations/:id`              | Eliminar una parcela por ID              |

## 📦 **Orders**

| **Método** | **Ruta**      | **Descripción**                      |
| ---------- | ------------- | ------------------------------------ |
| GET        | `/orders`     | Obtener todos los pedidos            |
| GET        | `/orders/:id` | Obtener detalles de un pedido por ID |
| POST       | `/orders`     | Crear un nuevo pedido                |
| PUT        | `/orders/:id` | Reemplazar (o crear) un pedido       |
| PATCH      | `/orders/:id` | Actualizar parcialmente un pedido    |
| DELETE     | `/orders/:id` | Eliminar un pedido                   |
