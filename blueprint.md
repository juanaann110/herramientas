# Blueprint: Electronicaparatodos

## Visión General

Esta aplicación web proporciona un conjunto de herramientas de alta calidad para entusiastas y profesionales de la electrónica. La interfaz es limpia, moderna, y fácil de usar, construida sobre un diseño "dark mode" para ser visualmente atractiva y reducir la fatiga visual. Todas las herramientas están diseñadas para ser intuitivas y ofrecer resultados prácticos para proyectos del mundo real.

## Diseño y Estilo

*   **Tema:** Modo oscuro (fondo `#1a1a1a`, texto `#f0f0f0`).
*   **Paleta de Colores:** Acentos primarios en azul (`#00aaff`) y secundarios en naranja (`#ff9900`) para títulos, íconos y elementos interactivos.
*   **Tipografía:** Fuente del sistema, sans-serif, para una apariencia nativa y legible.
*   **Layout:** Diseño responsive con un contenedor principal centrado. Las herramientas se presentan en tarjetas modulares que se muestran u ocultan dinámicamente.
*   **Iconografía:** Se utiliza Font Awesome para íconos claros y reconocibles en el menú.
*   **Branding:** Un logo personalizado con sombra le da a la aplicación una identidad única.

## Características Implementadas

### 1. Decodificador de Resistencias con Visualización 3D

*   **Interfaz:**
    *   Una representación visual 3D de una resistencia de carbono, que se actualiza en tiempo real.
    *   Cuatro (4) selectores de color integrados directamente en las bandas del modelo 3D.
    *   Un área de resultados que muestra el valor calculado.
*   **Funcionalidad:**
    *   El usuario interactúa directamente con las bandas de la resistencia 3D para seleccionar los colores.
    *   El script recalcula automáticamente el valor de la resistencia, incluyendo su valor nominal (en Ω, kΩ, MΩ) y su tolerancia.
    *   El resultado se muestra de forma clara e inmediata debajo de la resistencia.

### 2. Calculadora de Resistencia para LED (Potenciada)

*   **Interfaz:**
    *   Un menú desplegable (`<select>`) para elegir el **color del LED**, con voltajes típicos preconfigurados (Rojo, Verde, Amarillo, Azul, Blanco).
    *   Un campo numérico para el **Voltaje de Fuente**.
    *   Un campo numérico para la **Corriente del LED** (en mA), con un valor por defecto de 20mA.
    *   Un botón "Calcular" y un área de resultados detallada.
*   **Funcionalidad Avanzada:**
    *   El voltaje del LED se obtiene automáticamente de la selección de color.
    *   **Cálculo Exacto:** Calcula la resistencia teórica precisa: `R = (V_fuente - V_led) / I_led`.
    *   **Valor Comercial:** Encuentra el valor de resistencia estándar **inmediatamente superior** en la serie E12, asegurando que el LED reciba una corriente segura.
    *   **Cálculo de Potencia:** Calcula la potencia disipada por la resistencia: `P = (V_fuente - V_led) * I_led`, y aconseja sobre qué tipo de resistencia usar (e.g., 1/8W o 1/4W).
    *   **Resultados Detallados:** Muestra los tres valores (exacto, comercial y potencia) de forma clara y organizada para el usuario.
