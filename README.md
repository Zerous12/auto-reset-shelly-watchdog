# auto-reset-shelly-watchdog
auto-reset-shelly-4pro-pm-v1-watchdog

Auto Reset Shelly Watchdog es un script diseñado para dispositivos Shelly que actúa como un watchdog de conectividad con capacidad de reinicio automático. Este script monitorea la conectividad de red mediante solicitudes HTTP GET a una lista de endpoints predefinidos. Si el script detecta un número determinado de fallos consecutivos en la conectividad, desencadenará automáticamente un reinicio del dispositivo Shelly para restaurar la conectividad y asegurar un funcionamiento continuo.

Ideal para entornos donde la disponibilidad continua de dispositivos es crítica y se desea una solución automatizada para mantener la estabilidad del sistema. Este script es altamente configurable y permite ajustar parámetros como los endpoints de monitoreo, los tiempos de espera y los umbrales de fallos.

Características principales:
- Monitoreo de conectividad mediante solicitudes HTTP GET.
- Reinicio automático del dispositivo en caso de múltiples fallos consecutivos.
- Configuración flexible a través de un archivo de script.

Este repositorio es una herramienta útil para mantener la estabilidad de dispositivos Shelly en entornos donde la conexión de red puede ser inestable o intermitente.
