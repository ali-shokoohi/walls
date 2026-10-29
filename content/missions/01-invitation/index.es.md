{
  "id": "invitation",
  "chapter": "Antes de los muros",
  "title": "Tu primer visitante",
  "goal": "Entiende lo que realmente implica compartir un bot de IA.",
  "scene": "Un amigo quiere usar tu nuevo bot de IA. Puede chatear, leer archivos y ejecutar programas. Su cuenta de Telegram tiene permiso para usarlo.",
  "speaker": "Tu amigo",
  "message": "Es solo un chatbot. ¿Qué podría salir mal si me dejas entrar?",
  "task": "¿Qué deberías dar por hecho antes de compartirlo?",
  "options": [
    {
      "title": "Solo un experto en servidores podría volverlo peligroso",
      "detail": "Un mensaje normal no puede convertirse en una acción en el ordenador.",
      "feedback": {
        "reason": "Esto supone que un mensaje normal no puede provocar una acción en el ordenador. Pero este bot ya tiene herramientas para leer archivos y ejecutar programas; la persona que pregunta no tiene que implementar esas acciones por sí misma.",
        "consequence": "Por ejemplo, alguien que use la cuenta autorizada puede pedirle al bot que lea un archivo. Si una herramienta habilitada puede acceder a ese archivo, no hace falta experiencia con servidores."
      }
    },
    {
      "title": "Una cuenta autorizada puede activar todas las herramientas habilitadas",
      "detail": "Quien use esa cuenta también podría pedirle al bot que realice acciones."
    },
    {
      "title": "El bot reconocerá todas las solicitudes maliciosas",
      "detail": "Sus instrucciones bastan para proteger el servidor.",
      "feedback": {
        "reason": "Esto depende de que el modelo reconozca de forma fiable todas las solicitudes maliciosas. El contenido no confiable puede disfrazar una instrucción como una parte normal de un documento, y ese reconocimiento puede fallar.",
        "consequence": "Por ejemplo, un documento puede decirle al bot que lea configuraciones privadas como parte de una comprobación urgente. Si el bot lo sigue y tiene acceso, una instrucción de seguridad por sí sola no impide la lectura."
      }
    }
  ],
  "answer": [
    1
  ],
  "success": "Exacto. El acceso no consiste solo en poder enviar mensajes. También puede dar acceso a cualquier herramienta que el bot tenga permitido usar.",
  "lesson": "Un agente de IA es un chatbot con manos. Antes de compartirlo, piensa a qué pueden llegar esas manos.",
  "why": [
    "No hace falta ninguna habilidad técnica especial para pedirle a un agente que use una herramienta habilitada.",
    "Eso incluye a alguien que robe la cuenta de tu amigo.",
    "Los modelos y sus instrucciones no son límites de seguridad fiables."
  ],
  "term": {
    "word": "Agente de IA",
    "meaning": "Un sistema de IA que puede realizar acciones mediante herramientas, no solo responder con texto."
  },
  "source": "s1",
  "reward": "Piensa en acciones, no en mensajes",
  "unlocks": [],
  "weight": 1,
  "challenge_type": "choice"
}