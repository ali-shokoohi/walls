{
  "id": "secrets",
  "chapter": "Construye los límites",
  "title": "El cofre del tesoro vacío",
  "goal": "Mantén las credenciales reales fuera del entorno del agente.",
  "scene": "Un atacante ha leído todos los archivos y variables de entorno de la instancia del bot de Reza. Ahora no puedes impedir esa lectura. Sí puedes decidir qué había allí desde el principio.",
  "speaker": "Atacante",
  "message": "Encontré las configuraciones del bot. Ahora robaré la clave de API real y el token del bot.",
  "task": "¿Qué plan de almacenamiento limita mejor el robo de credenciales?",
  "options": [
    {
      "title": "Pon las credenciales reales en un archivo llamado secret.txt",
      "detail": "El nombre avisa a todo el mundo de que no debe abrirlo.",
      "feedback": {
        "reason": "El nombre de un archivo es una etiqueta, no una restricción. El escenario dice que el atacante ya puede leer todos los archivos de la instancia del bot, incluido uno llamado secret.txt.",
        "consequence": "El atacante lee la clave real de ese archivo y puede usarla fuera de tu servidor hasta que la revoques. Llamar «secreto» al archivo no impide que la reutilice."
      }
    },
    {
      "title": "Dale al bot tokens de reemplazo; guarda las credenciales reales en su proxy",
      "detail": "Solo el proxy controlado cambia los reemplazos por los valores reales."
    },
    {
      "title": "Pon las credenciales reales en las variables de entorno del bot",
      "detail": "No son visibles en la ventana de chat normal.",
      "feedback": {
        "reason": "Las variables de entorno están ocultas para la interfaz de chat normal, pero no para un proceso comprometido. El atacante de este escenario puede leerlas.",
        "consequence": "Un proceso del bot comprometido podría obtener la clave de API real o el token del bot desde su entorno y reutilizar esas credenciales directamente con el proveedor o Telegram."
      }
    }
  ],
  "answer": [
    1
  ],
  "success": "El atacante encuentra tokens de reemplazo, no la clave real del proveedor ni el token del bot de Telegram. Esos reemplazos siguen teniendo poder a través del proxy autorizado, así que también deben controlarse y rotarse después de un compromiso.",
  "lesson": "No puedes robar un secreto real de un lugar al que nunca llegó.",
  "why": [
    "El proxy guarda las credenciales reales y las inyecta en el momento de la salida.",
    "Los tokens de reemplazo no son credenciales válidas cuando se envían directamente a Telegram o al proveedor del modelo.",
    "No pegues tokens reales en este juego, en chats ni en la instancia del bot. Esto es solo una simulación educativa."
  ],
  "term": {
    "word": "Credencial",
    "meaning": "Un secreto, como una clave de API o un token de bot, que permite actuar como una cuenta o un servicio."
  },
  "source": "s10",
  "reward": "Guardián de secretos",
  "unlocks": [
    "Secrets"
  ],
  "weight": 6,
  "challenge_type": "choice"
}