{
  "id": "response",
  "chapter": "Practica la respuesta",
  "title": "El bot está comprometido",
  "goal": "Pon la respuesta en un orden seguro.",
  "scene": "Tienes pruebas de que la instancia del bot de Reza fue tomada. Las credenciales reales permanecieron en el proxy separado, pero la memoria escribible del bot podría estar manipulada.",
  "speaker": "Coordinador del incidente",
  "message": "No sigas chateando con la copia comprometida. ¿Qué va primero y qué viene después?",
  "task": "Pulsa estos pasos en el orden más seguro.",
  "options": [
    {
      "title": "Investigar, rotar los tokens de reemplazo y reconstruir desde un punto limpio",
      "detail": "No confíes en la memoria ni en la configuración del bot comprometido.",
      "feedback": {
        "reason": "Omitir la investigación y una reconstrucción limpia deja en uso el estado sospechoso de estar comprometido; dejar válidos los tokens de reemplazo antiguos también conserva su acceso al proxy.",
        "consequence": "La memoria manipulada o los archivos alterados podrían afectar a ejecuciones posteriores, y un token de reemplazo robado podría seguir utilizándose a través de su proxy autorizado hasta rotarlo."
      }
    },
    {
      "title": "Ejecutar todas las comprobaciones de verificación antes de volver a compartir el acceso",
      "detail": "Después, actualiza las instantáneas limpias y los registros de integridad.",
      "feedback": {
        "reason": "Sin verificar después de la reconstrucción, no sabes si las restricciones y la nueva configuración funcionan juntas de verdad.",
        "consequence": "Una instancia reconstruida podría conservar por accidente una ruta de instalación abierta a la red o una configuración de token incorrecta. Compartir el acceso antes de probarla expondría ese error al uso real."
      }
    },
    {
      "title": "Contener el bot y su sandbox; cerrar su salida al proxy",
      "detail": "Detén la actividad en curso antes de hacer la limpieza.",
      "feedback": {
        "reason": "Sin contención, la instancia sospechosa de estar comprometida puede seguir actuando mientras investigas o reconstruyes partes del servicio.",
        "consequence": "Un atacante podría seguir haciendo solicitudes de servicio permitidas o cambiando el estado escribible mientras recopilas pruebas. Cerrar su salida detiene primero esa actividad en curso."
      }
    },
    {
      "title": "Conservar las pruebas",
      "detail": "Guarda las instantáneas del incidente y los registros relevantes antes de reconstruir.",
      "feedback": {
        "reason": "Sin conservar las pruebas, la limpieza puede destruir la información necesaria para entender el incidente y su alcance.",
        "consequence": "Restaurar una instantánea limpia puede sobrescribir los archivos que mostraban cómo se comprometió el bot. Después, podría ser imposible reconstruir la cronología original del incidente."
      }
    }
  ],
  "answer": [
    2,
    3,
    0,
    1
  ],
  "success": "Contener → conservar → investigar y reconstruir → probar. No intentaste «limpiar» un bot comprometido que seguía funcionando esperando que todo saliera bien.",
  "lesson": "Reconstruye desde un punto limpio y rota lo que haya quedado expuesto. Si la infraestructura o el host están comprometidos, la respuesta debe ser mucho más amplia.",
  "why": [
    "En un compromiso de una instancia de Hermes, la guía rota los tokens de reemplazo de ese amigo porque las credenciales reales no estaban almacenadas allí.",
    "Un compromiso de la infraestructura puede exponer tokens reales del bot, claves de API y la CA; esos elementos también deben reemplazarse.",
    "Si el propio host está comprometido, reconstruye todo el servidor. Ya no se puede confiar en las capas inferiores."
  ],
  "term": {
    "word": "Contención de incidentes",
    "meaning": "Detener la actividad dañina en curso y restringir el acceso antes de investigar y reconstruir."
  },
  "source": "s15",
  "reward": "Respondedor de incidentes",
  "unlocks": [],
  "weight": 12,
  "challenge_type": "order",
  "order_rules": [
    {
      "before": 2,
      "after": 3,
      "reason": "La contención debe ocurrir antes de recopilar pruebas para que la instancia sospechosa de estar comprometida no siga cambiando la escena mientras la capturas.",
      "consequence": "Si recopilas pruebas primero dejando el bot activo, el atacante podría seguir modificando archivos o haciendo solicitudes durante la captura."
    },
    {
      "before": 3,
      "after": 0,
      "reason": "Conserva las pruebas antes de investigar y hacer una reconstrucción limpia. La reconstrucción cambia o reemplaza el estado que podría mostrar lo ocurrido.",
      "consequence": "Si reconstruyes primero, los archivos o la memoria alterados que necesitabas como pruebas podrían sobrescribirse. Después no podrás recuperar de forma fiable el estado original del incidente."
    },
    {
      "before": 0,
      "after": 1,
      "reason": "La verificación final debe probar la configuración recién reconstruida, no la copia comprometida que será reemplazada.",
      "consequence": "Si pruebas antes de reconstruir y después reemplazas la instancia, ese resultado satisfactorio no dice nada sobre los tokens, las herramientas o las restricciones de red de la sustituta."
    }
  ]
}