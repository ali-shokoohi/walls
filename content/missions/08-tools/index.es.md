{
  "id": "tools",
  "chapter": "Construye los límites",
  "title": "Dale menos herramientas",
  "goal": "Elige el menor nivel de poder necesario para un bot de chat común.",
  "scene": "Reza solo quiere hacer preguntas y conversar. No necesita que el bot navegue por sitios web, instale complementos, ejecute programas ni programe tareas.",
  "speaker": "Menú de configuración",
  "message": "¿Quieres activar todas las herramientas, por si acaso?",
  "task": "Elige la configuración más segura para las necesidades reales de Reza.",
  "options": [
    {
      "title": "Solo chat, con las herramientas de acción innecesarias desactivadas",
      "detail": "Añade capacidades de forma deliberada solo cuando sean realmente necesarias."
    },
    {
      "title": "Activa todo, pero dile al bot que tenga cuidado",
      "detail": "Un mensaje largo de seguridad puede sustituir a las restricciones.",
      "feedback": {
        "reason": "Un mensaje de seguridad no elimina la capacidad ni el acceso de una herramienta. Si engañan al modelo, todas las acciones innecesarias siguen disponibles.",
        "consequence": "Reza solo necesita chatear, pero un documento malicioso aún podría intentar activar un navegador, un ejecutor de programas o un programador de tareas habilitado. Esas capacidades crean riesgos sin atender a su necesidad declarada."
      }
    },
    {
      "title": "Activa todo y pide una aprobación de sí o no en el mismo chat",
      "detail": "Un atacante con esa cuenta nunca podría aprobar una acción.",
      "feedback": {
        "reason": "La aprobación llega a la misma cuenta que podría haber sido robada. Quien controle esa cuenta también puede responder a la solicitud de aprobación.",
        "consequence": "Un atacante que use la sesión de Telegram de Reza puede solicitar una acción y después pulsar «sí». Ese intercambio no demuestra que la haya aprobado una persona de confianza diferente."
      }
    }
  ],
  "answer": [
    0
  ],
  "success": "Has eliminado las acciones que Reza no necesita. Menos herramientas significa menos formas de que un mensaje malicioso se convierta en una acción dañina.",
  "lesson": "El principio de mínimo privilegio consiste en dar a un sistema solo el poder que necesita, no todo el poder que podría usar algún día.",
  "why": [
    "La guía desactiva la navegación, la programación, la delegación y otras capacidades innecesarias.",
    "El agente no debería poder reescribir libremente la configuración de seguridad ni el código instalado.",
    "Una aprobación que vuelve al mismo chat comprometido no es un límite de seguridad independiente."
  ],
  "term": {
    "word": "Mínimo privilegio",
    "meaning": "Conceder únicamente el acceso y las capacidades necesarias para el trabajo real."
  },
  "source": "s11",
  "reward": "Constructor cuidadoso de herramientas",
  "unlocks": [
    "Hermes"
  ],
  "weight": 8,
  "challenge_type": "choice"
}