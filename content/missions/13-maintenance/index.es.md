{
  "id": "maintenance",
  "chapter": "Practica la respuesta",
  "title": "La actualización que volvió a abrir una puerta",
  "goal": "Trata las actualizaciones como cambios en un límite de seguridad.",
  "scene": "Una actualización de mantenimiento instaló paquetes nuevos. Algunos permisos y valores predeterminados de los paquetes podrían haber cambiado. La instalación necesitó acceso temporal a Internet.",
  "speaker": "Recordatorio de mantenimiento",
  "message": "El software está actualizado. ¿Ya hemos terminado?",
  "task": "Elige el hábito de mantenimiento completo.",
  "options": [
    {
      "title": "Crear una instantánea, actualizar de forma controlada, restaurar las restricciones y volver a probar",
      "detail": "Revisa la configuración modificada y actualiza la línea base de integridad después de los cambios legítimos."
    },
    {
      "title": "Dejar abierta la red de instalación por comodidad",
      "detail": "La próxima actualización será más fácil.",
      "feedback": {
        "reason": "La red de instalación era una excepción temporal, no el entorno de ejecución previsto. Dejarla abierta hace falsa la suposición anterior de que la red estaba cerrada.",
        "consequence": "Un bot comprometido más adelante podría intentar conexiones directas a Internet mediante la ruta de instalación en vez de usar solo su proxy controlado."
      }
    },
    {
      "title": "Confiar para siempre en las pruebas anteriores",
      "detail": "Pasaron antes de que cambiara el software.",
      "feedback": {
        "reason": "Las pruebas anteriores comprobaban una configuración y una versión de software anteriores. La actualización podría haber cambiado permisos, valores predeterminados o la red.",
        "consequence": "Un paquete podría restaurar un permiso privilegiado o una configuración modificada podría volver a abrir el acceso. El resultado satisfactorio de la semana pasada no detectaría el cambio de hoy."
      }
    }
  ],
  "answer": [
    0
  ],
  "success": "Una actualización no termina hasta que se restauran y prueban las protecciones. Una prueba satisfactoria de la semana pasada describe el sistema de la semana pasada.",
  "lesson": "La seguridad es un proceso de mantenimiento, no una configuración que terminas una sola vez.",
  "why": [
    "Las actualizaciones pueden restaurar permisos de programas privilegiados o introducir opciones nuevas con valores predeterminados inadecuados.",
    "Los contenedores usan el kernel del host, así que un parche instalado del kernel necesita un reinicio para surtir efecto.",
    "Una línea base de integridad nueva distingue el mantenimiento legítimo de los cambios posteriores no explicados."
  ],
  "term": {
    "word": "Línea base de integridad",
    "meaning": "Un registro guardado del contenido o los hashes esperados de los archivos, usado para detectar cambios posteriores."
  },
  "source": "s16",
  "reward": "Mantenedor de límites",
  "unlocks": [],
  "weight": 13,
  "challenge_type": "choice"
}