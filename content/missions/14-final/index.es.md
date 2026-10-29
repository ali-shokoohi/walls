{
  "id": "final",
  "chapter": "La sesión informativa final",
  "title": "¿Qué le dirás a tu amigo?",
  "goal": "Haz una promesa honesta en lugar de una imposible.",
  "scene": "Has diseñado tus seis defensas, pero la implementación real todavía necesita desarrollo y pruebas. Reza pregunta si puede tratar este bot como un diario completamente privado e imposible de hackear.",
  "speaker": "Reza",
  "message": "Entonces es imposible hackearlo y nadie puede ver mis chats, ¿verdad?",
  "task": "Elige la respuesta responsable.",
  "options": [
    {
      "title": "Sí. Seis capas hacen imposible una intrusión",
      "detail": "Ya no hace falta pensar en la privacidad ni en las actualizaciones.",
      "feedback": {
        "reason": "Varias capas reducen el impacto de los fallos, pero no hacen imposibles los errores ni el robo de cuentas. Tampoco eliminan el acceso del operador o del proveedor del modelo a los datos de las conversaciones.",
        "consequence": "Si Reza trata el bot como un diario privado imposible de hackear, podría introducir secretos que el administrador puede leer o que el proveedor recibe durante el funcionamiento normal."
      }
    },
    {
      "title": "Limita los daños, pero no es perfecto ni completamente privado",
      "detail": "El operador y el proveedor del modelo pueden acceder a los datos de las conversaciones; protege tu cuenta y evita compartir secretos sensibles."
    },
    {
      "title": "La IA detectará siempre los ataques a partir de ahora",
      "detail": "Las capas enseñaron al modelo a no equivocarse nunca.",
      "feedback": {
        "reason": "Los límites restringen lo que el sistema puede hacer; no entrenan al modelo para reconocer todos los ataques. Aún pueden ocurrir inyecciones de instrucciones y fallos de software.",
        "consequence": "Un documento manipulado aún podría engañar al modelo. Las defensas pretenden restringir la acción resultante, no garantizar que el modelo nunca la elija."
      }
    }
  ],
  "answer": [
    1
  ],
  "success": "Esa es la promesa correcta. El diseño busca contener los daños, no eliminar todos los errores, robos de cuentas o renuncias de privacidad.",
  "lesson": "Una explicación de seguridad confiable dice tanto qué está protegido como qué sigue estando en riesgo.",
  "why": [
    "Los contenedores comparten un kernel; la infraestructura y el acceso del administrador siguen siendo objetivos de gran valor.",
    "El proveedor del modelo recibe las conversaciones y el administrador puede acceder a los datos del servidor.",
    "Como usuario normal: activa la verificación en dos pasos de Telegram, comprueba las sesiones activas, no compartas nunca secretos del bot o de la API e informa al operador de cualquier comportamiento inesperado."
  ],
  "term": {
    "word": "Riesgo residual",
    "meaning": "El riesgo que permanece incluso después de establecer medidas de protección."
  },
  "source": "s18",
  "reward": "Defensor honesto",
  "unlocks": [],
  "weight": 14,
  "challenge_type": "choice"
}