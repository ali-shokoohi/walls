{
  "id": "foreign",
  "chapter": "Construye los límites",
  "title": "El truco de la dirección permitida",
  "goal": "Descubre por qué un dominio permitido no basta.",
  "scene": "Tu proxy permite Telegram. Una solicitud maliciosa intenta enviar datos mediante el bot de Telegram del atacante, usando el token del atacante en lugar del token de reemplazo de Reza.",
  "speaker": "Solicitud sospechosa",
  "message": "Voy a Telegram, y Telegram está permitido. Déjame pasar, por favor.",
  "task": "¿Qué debería hacer el proxy?",
  "options": [
    {
      "title": "Permitirla porque el sitio web es Telegram",
      "detail": "Toda solicitud a un dominio permitido es segura.",
      "feedback": {
        "reason": "Telegram aloja muchos bots y cuentas. Comprobar solo el destino no dice nada sobre si esta solicitud usa la identidad prevista de Reza o el bot del atacante.",
        "consequence": "La solicitud podría enviar datos mediante el bot del atacante y seguir dirigiéndose a api.telegram.org. Una comprobación que solo mire el dominio permitiría la solicitud hacia el destinatario que quieres excluir."
      }
    },
    {
      "title": "Preguntar a la IA si la solicitud parece sospechosa",
      "detail": "Deja que el modelo tome la decisión final de seguridad.",
      "feedback": {
        "reason": "El modelo forma parte del sistema potencialmente comprometido. Preguntarle si su propia solicitud parece sospechosa no añade un punto de control independiente.",
        "consequence": "Un modelo confundido podría aprobar el token del atacante porque el destino dice Telegram. Entonces el proxy no tendría un motivo aplicado de forma obligatoria para detener esa identidad ajena."
      }
    },
    {
      "title": "Rechazarla a menos que lleve el token de reemplazo esperado de Reza",
      "detail": "Comprueba la identidad además del destino antes de que algo llegue a Telegram."
    }
  ],
  "answer": [
    2
  ],
  "success": "La comprobación del destino pasa, pero el requisito de credencial detiene la solicitud. «Sitio web permitido» no significa «permitido usar cualquier cuenta allí».",
  "lesson": "Comprueba tanto adónde va una solicitud como qué identidad puede usar.",
  "why": [
    "La guía usa una opción del proxy llamada require para rechazar las solicitudes que no incluyen el token de reemplazo esperado.",
    "Un error 401 de Telegram no demuestra que el proxy haya rechazado la solicitud: puede significar que la solicitud llegó a Telegram y falló allí.",
    "Las implementaciones reales deben probarse, incluida la forma en que funcionan los requisitos de credenciales en el modo de túnel del proxy."
  ],
  "term": {
    "word": "Lista de permitidos",
    "meaning": "Una lista explícita de lo que está permitido. Todo lo demás se deniega."
  },
  "source": "s13",
  "reward": "Comprobador de identidades",
  "unlocks": [],
  "weight": 7,
  "challenge_type": "choice"
}