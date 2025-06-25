# Prueba Técnica - Frontend Angular

Este repositorio contiene la aplicación frontend "To-Do List" desarrollada con Angular (versión 20). La aplicación permite la gestión de tareas, incluyendo inicio de sesión, creación, edición, eliminación, marcado de estado y visualización de métricas.

## Decisiones Técnicas Tomadas 

* **Framework**: Angular (v20) CLI para el bootstrapping del proyecto.
* **Modularización**: La funcionalidad de la aplicación se ha dividido en módulos para mejorar la organización y la mantenibilidad del código.
* **Manejo de Estado**: Se utiliza un enfoque de servicios observables para el manejo del estado global de la aplicación, siguiendo buenas prácticas y promoviendo un flujo de datos reactivo.
* **Estilos**: La aplicación utiliza Tailwind CSS para aplicar estilos, garantizando un diseño responsive y una personalización eficiente de la interfaz de usuario.
* **Optimización de Rendimiento**: Se implementaron técnicas de optimización como `trackBy` en listas para mejorar el rendimiento de renderizado.
* **Notificaciones**: Se muestran notificaciones al usuario para informar sobre el éxito o fracaso de las acciones realizadas (ej., "Tarea creada con éxito"). Para ello, se ha integrado una librería de tostadas ligera y personalizable.
* **Dashboard**: Se ha incluido un dashboard que muestra métricas básicas de las tareas (total, completadas, pendientes, etc.).
* **Lazy Loading (Carga Perezosa)**: Los módulos secundarios se cargan de forma perezosa para optimizar el tiempo de carga inicial de la aplicación.

## Cómo Ejecutar el Proyecto 

### Prerrequisitos

* Node.js (versión 20 o superior, compatible con Angular 20)
* npm (generalmente viene con Node.js) o Yarn
* Angular CLI (instalación global: `npm install -g @angular/cli`)

### Pasos de Ejecución

1.  **Clonar el Repositorio**:
    ```bash
    git clone https://github.com/Ysaragon95/todo-app.git
    cd todo-app
    ```
2.  **Instalar Dependencias**:
    ```bash
    npm install
    # o
    yarn install
    ```
3.  **Configurar la API Backend**:
    Asegúrate de que el backend .NET esté corriendo y disponible. La URL base de la API se puede configurar en el archivo `environment.ts` o `environment.prod.ts` (ajusta según tu configuración).
4.  **Iniciar la Aplicación Angular**:
    ```bash
    ng serve
    ```
    La aplicación se iniciará y estará disponible en `http://localhost:4200/`. Se recargará automáticamente si cambias alguno de los archivos fuente.

## Cómo Ejecutar las Pruebas 

Se han implementado pruebas unitarias (usando Karma y Jasmine) para al menos un componente y un servicio.

1.  **Ejecutar Pruebas Unitarias**:
    ```bash
    ng test
    ```
    Esto abrirá un navegador y ejecutará las pruebas. Los resultados se mostrarán tanto en el navegador como en la terminal.
