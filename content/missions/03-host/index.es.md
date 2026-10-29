{
  "id": "host",
  "chapter": "Construye los límites",
  "title": "No lo construyas en el suelo de tu sala",
  "goal": "Elige un hogar seguro para el bot compartido.",
  "scene": "Puedes poner el bot en uno de tres ordenadores. Imagina que, con el tiempo, un atacante toma el control total del ordenador que lo aloja.",
  "speaker": "Tu yo del futuro",
  "message": "Si perdemos toda esta máquina, ¿qué más perdemos con ella?",
  "task": "Elige el mejor lugar para construir el servicio.",
  "options": [
    {
      "title": "Tu ordenador personal de uso diario",
      "detail": "Ya tiene tus fotos, archivos de trabajo y sesiones guardadas.",
      "feedback": {
        "reason": "Tu ordenador personal contiene bienes valiosos que no tienen relación con el bot. En este escenario el atacante obtiene el control de todo el host, así que poner el bot junto a esos bienes los coloca en la misma zona de fallo.",
        "consequence": "La toma de control del host podría exponer archivos de trabajo o sesiones guardadas además del bot. Reconstruir el bot no desharía el robo de esos archivos independientes."
      }
    },
    {
      "title": "Un servidor dedicado sin datos personales ajenos",
      "detail": "Mantén pocos puntos de entrada, aplica parches y protege el acceso de administración."
    },
    {
      "title": "El servidor multiuso de un amigo",
      "detail": "Compártelo con sus otros servicios para ahorrar tiempo de configuración.",
      "feedback": {
        "reason": "El servidor multiuso de tu amigo todavía contiene servicios y datos ajenos. Mover el bot a la máquina compartida de otra persona no elimina el riesgo de que tomen el control total del host.",
        "consequence": "Si se pierde ese host, tu amigo también podría perder el acceso a otros servicios o a sus datos. Ahorrar tiempo de configuración no limita ese daño."
      }
    }
  ],
  "answer": [
    1
  ],
  "success": "Mantuviste los bienes valiosos ajenos fuera del radio de impacto. Un host dedicado no evita todos los ataques, pero perderlo no tiene por qué exponer también tu ordenador personal.",
  "lesson": "Dale al bot un hogar que puedas reconstruir. Protege el acceso de administración con claves SSH seguras y mantén el sistema actualizado.",
  "why": [
    "El host es la base sobre la que se apoyan todos los demás límites.",
    "Un host comprometido puede exponer la infraestructura y los secretos que contiene.",
    "El host de la guía no contiene datos de trabajo ajenos, servicios personales ni claves para otros servidores."
  ],
  "term": {
    "word": "Host",
    "meaning": "El ordenador o servidor principal que ejecuta los entornos aislados y sus servicios de apoyo."
  },
  "source": "s7",
  "reward": "Base limpia",
  "unlocks": [
    "Host"
  ],
  "weight": 3,
  "challenge_type": "choice"
}