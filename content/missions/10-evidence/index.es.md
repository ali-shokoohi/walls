{
  "id": "evidence",
  "chapter": "Practica la respuesta",
  "title": "Pruebas, no luces verdes",
  "goal": "Reconoce las pruebas de que un límite funciona de verdad.",
  "scene": "Una pantalla de configuración dice «Seguro». Quieres pruebas antes de invitar a tus amigos. Elige pruebas que comprueben restricciones reales, no apariencias.",
  "speaker": "Tu amigo",
  "message": "El bot prometió que nunca filtraría nada. ¿No es suficiente?",
  "task": "Selecciona las tres comprobaciones útiles.",
  "options": [
    {
      "title": "Intenta una conexión prohibida desde dentro de la instancia",
      "detail": "Verifica que el límite de red impuesto la bloquee, incluso como root de la instancia.",
      "feedback": {
        "reason": "Sin intentar una conexión prohibida, no has comprobado si la restricción de red se aplica realmente. Puede existir una configuración sin aplicarse a la instancia correcta.",
        "consequence": "Una regla ausente o mal aplicada podría dejar abierto el acceso directo a Internet aunque la pantalla de configuración siga diciendo «Seguro». Una prueba de conexión negativa comprueba esa afirmación."
      }
    },
    {
      "title": "Pregúntale al bot si es seguro",
      "detail": "Trata su respuesta como una auditoría de seguridad completa.",
      "feedback": {
        "reason": "La respuesta del bot es otra afirmación producida por el sistema que se está evaluando. No observa ni demuestra todos los límites del sistema operativo y de la red.",
        "consequence": "El bot podría decir «Estoy seguro» mientras falta una regla del firewall o una herramienta se ejecuta en el entorno equivocado. La respuesta tranquilizadora seguiría apareciendo aunque el límite hubiera fallado."
      }
    },
    {
      "title": "Comprueba dónde se ejecutan realmente las acciones de las herramientas",
      "detail": "Demuestra que llegan al sandbox y no a la propia carpeta del bot.",
      "feedback": {
        "reason": "Un backend configurado no demuestra dónde se ejecuta cada herramienta. Algunas herramientas pueden seguir una ruta de ejecución diferente de la de los comandos de terminal.",
        "consequence": "Una herramienta de archivos podría ejecutarse en la instancia de Hermes y acceder a su estado aunque un comando de terminal llegue al sandbox. Probar la ubicación real detecta esa discrepancia."
      }
    },
    {
      "title": "Comprueba que el proxy rechaza un token ajeno",
      "detail": "Confirma que la solicitud no llega simplemente a Telegram para fallar allí.",
      "feedback": {
        "reason": "Sin probar un token ajeno, una lista de dominios permitidos puede parecer correcta y aun así permitir que las solicitudes de la cuenta equivocada pasen.",
        "consequence": "Una solicitud ajena podría llegar a Telegram y devolver allí un 401. Eso no demuestra que el proxy la rechazara antes de llegar a Telegram; el límite de credenciales necesita su propia prueba."
      }
    }
  ],
  "answer": [
    0,
    2,
    3
  ],
  "success": "Has elegido un comportamiento observable. Una configuración es una afirmación; una prueba comprueba si esa afirmación se cumple en este entorno.",
  "lesson": "Construye, bloquea y prueba. Repite las pruebas después de las actualizaciones y los cambios de configuración.",
  "why": [
    "Prueba tanto el comportamiento permitido como el prohibido: bloquear las solicitudes incorrectas no sirve si también se rompe cada solicitud correcta.",
    "Un rechazo rápido de conexión puede significar que un paquete llegó al destino. La guía lo distingue del tiempo de espera por descarte esperado.",
    "Aprobar este juego es aprender, no demostrar que un servidor real sea seguro."
  ],
  "term": {
    "word": "Verificación",
    "meaning": "Comprobar el comportamiento real frente a un resultado esperado, en vez de confiar en una etiqueta, una configuración o una promesa."
  },
  "source": "s13",
  "reward": "Buscador de pruebas",
  "unlocks": [],
  "weight": 10,
  "challenge_type": "multi"
}