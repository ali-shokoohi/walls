{
  "id": "alarm",
  "chapter": "Practica la respuesta",
  "title": "Un golpe en una puerta prohibida",
  "goal": "Detecta una señal que merece investigación.",
  "scene": "El bot normalmente solo usa sus servicios permitidos. Hoy el proxy registra un intento de llegar a pastebin.com, un destino que este diseño no permite.",
  "speaker": "Registro de auditoría del proxy · simplificado",
  "message": "Solicitud rechazada: destino no permitido — pastebin.com",
  "task": "¿Cómo debería responder el operador?",
  "options": [
    {
      "title": "Ignorarlo porque la solicitud fue bloqueada",
      "detail": "Un intento detenido no puede enseñarnos nada.",
      "feedback": {
        "reason": "Bloquear esta solicitud demuestra que un muro funcionó, no por qué ocurrió la solicitud inesperada. Un bot engañado o comprometido podría seguir intentando otras acciones.",
        "consequence": "Ignorar el evento podría dejar sin descubrir contenido manipulado, estado modificado o una sesión controlada por un atacante mientras el bot sigue funcionando."
      }
    },
    {
      "title": "Investigar pronto y comprobar la actividad relacionada",
      "detail": "Un rechazo puede revelar un bot engañado, un compromiso o un problema de configuración."
    },
    {
      "title": "Añadir el sitio web a la lista de permitidos inmediatamente",
      "detail": "El objetivo es hacer desaparecer la advertencia.",
      "feedback": {
        "reason": "Un rechazo es una prueba de que la solicitud infringió la política, no una prueba de que debas relajarla. Añadir el destino elimina el muro antes de saber por qué se puso a prueba.",
        "consequence": "Si la solicitud procedía de un intento de robo de datos, la siguiente carga a ese sitio web recién permitido podría pasar en lugar de producir un rechazo."
      }
    }
  ],
  "answer": [
    1
  ],
  "success": "Que el muro funcione es una buena noticia; el intento inesperado sigue siendo importante. Investiga antes de relajar el límite.",
  "lesson": "Un rechazo es una prueba, no un motivo para abrir la puerta automáticamente.",
  "why": [
    "La guía supervisa los rechazos del proxy, los descartes de red, los archivos de configuración modificados y los inicios de sesión inesperados en el host.",
    "Cualquier salida inesperada del sandbox de ejecución es especialmente preocupante porque no debería tener ningún destino externo permitido.",
    "Los registros pueden contener metadatos sensibles. Protégelos y recuerda que el operador del servidor puede ver más que un usuario normal del bot."
  ],
  "term": {
    "word": "Registro de auditoría",
    "meaning": "Un registro de acciones y decisiones que ayuda al operador a entender lo ocurrido."
  },
  "source": "s14",
  "reward": "Operador atento",
  "unlocks": [],
  "weight": 11,
  "challenge_type": "choice"
}