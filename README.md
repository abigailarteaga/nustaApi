# Ubicacion API Node

## Descripción
Este proyecto es una API para gestionar ubicaciones y contactos de emergencia. Permite a los usuarios registrar su ubicación y contactos de emergencia, así como recuperar esta información a través de endpoints RESTful.

## Estructura del Proyecto
```
ubicacion-api-node
├── src
│   ├── controllers          # Controladores para manejar la lógica de negocio
│   │   ├── contactoEmergenciaController.js
│   │   ├── ubicacionController.js
│   │   └── usuarioController.js
│   ├── models               # Modelos que representan las entidades de la base de datos
│   │   ├── contactoEmergencia.js
│   │   ├── contactoEmergenciaRequest.js
│   │   ├── ubicacion.js
│   │   └── usuario.js
│   ├── routes               # Rutas para manejar las solicitudes HTTP
│   │   ├── contactoEmergenciaRoutes.js
│   │   ├── ubicacionRoutes.js
│   │   └── usuarioRoutes.js
│   ├── config               # Configuración de la base de datos
│   │   └── database.js
│   ├── app.js               # Inicialización de la aplicación Express
│   └── server.js            # Archivo principal para iniciar el servidor
├── package.json             # Configuración de npm
└── README.md                # Documentación del proyecto
```

## Instalación
1. Clona el repositorio:
   ```
   git clone <url-del-repositorio>
   ```
2. Navega al directorio del proyecto:
   ```
   cd ubicacion-api-node
   ```
3. Instala las dependencias:
   ```
   npm install
   ```

## Uso
Para iniciar el servidor, ejecuta:
```
npm start
```
La API estará disponible en `http://localhost:3000` (o el puerto que hayas configurado).

## Endpoints
- **Contactos de Emergencia**
  - `POST /api/contactoEmergencia` - Crear un nuevo contacto de emergencia.
  - `GET /api/contactoEmergencia?correo=usuario@mail.com` - Obtener contactos de emergencia por correo.

- **Ubicaciones**
  - `POST /api/ubicacion` - Registrar una nueva ubicación.

- **Usuarios**
  - `GET /api/usuario` - Obtener todos los usuarios.
  - `POST /api/usuario` - Crear un nuevo usuario.
  - `GET /api/usuario/{correo}` - Obtener un usuario por correo.

## Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia
Este proyecto está bajo la Licencia MIT.