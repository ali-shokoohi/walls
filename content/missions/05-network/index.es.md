{
  "id": "network",
  "chapter": "Construye los límites",
  "title": "Cierra las puertas laterales",
  "goal": "Entiende las redes con denegación predeterminada.",
  "scene": "Un bot comprometido quiere subir un chat privado a un sitio web desconocido. Tú decides qué conexiones externas puede hacer su entorno.",
  "speaker": "Guardián de la red",
  "message": "Dame una lista explícita. Todo lo que no esté en ella queda cerrado.",
  "task": "Permite solo la ruta que este bot necesita en el diseño de la guía.",
  "options": [
    {
      "title": "Su propio proxy controlado",
      "detail": "El proxy comprueba los destinos y proporciona las credenciales reales.",
      "feedback": {
        "reason": "Dejar fuera el proxy controlado elimina la ruta prevista para las solicitudes de servicio permitidas del bot. Mantener cerradas las salidas ajenas no basta si también falta la ruta legítima.",
        "consequence": "Con el acceso directo a Internet bloqueado y sin una ruta de proxy permitida, las solicitudes normales de Telegram o del proveedor del modelo también fallan. Un diseño útil debe permitir su trabajo previsto y rechazar el resto del tráfico."
      }
    },
    {
      "title": "Cualquier sitio web si el bot dice que es útil",
      "detail": "Deja que el modelo decida qué sitios son confiables.",
      "feedback": {
        "reason": "Esto devuelve la decisión de seguridad al mismo modelo que puede ser engañado. Un bot comprometido o confundido puede describir el sitio de un atacante como útil.",
        "consequence": "Un documento envenenado podría convencer al bot de subir un chat privado a ese sitio. Si la red permite cualquier destino, ninguna barrera externa detiene la carga."
      }
    },
    {
      "title": "Un resolvedor DNS público",
      "detail": "Deja que busque nombres de dominio arbitrarios directamente.",
      "feedback": {
        "reason": "Una consulta DNS arbitraria también es un mensaje saliente. Su nombre de dominio puede contener datos codificados aunque no se abra ninguna página web.",
        "consequence": "Por ejemplo, una consulta para PRIVATE-DATA.attacker.example puede revelar ese nombre a una infraestructura controlada por el atacante. Por tanto, el DNS directo abre otra posible salida."
      }
    },
    {
      "title": "El proxy del otro amigo",
      "detail": "Es útil como respaldo si el suyo falla.",
      "feedback": {
        "reason": "El proxy de otro amigo no es la salida autorizada de este bot. Permitir esa ruta debilita la separación prevista entre amigos, aunque el otro proxy tenga sus propias comprobaciones de credenciales.",
        "consequence": "Después de un compromiso, el atacante al menos podría conectarse al proxy del otro amigo y sondearlo. Una excepción de «respaldo» ha creado una ruta que el límite de un amigo pretendía prohibir."
      }
    }
  ],
  "answer": [
    0
  ],
  "success": "Una salida controlada. Las solicitudes siguen pasando por las comprobaciones del proxy y las demás rutas directas permanecen cerradas.",
  "lesson": "Denegar por defecto significa que nada está permitido a menos que lo autoricemos deliberadamente. Una lista de permitidos es más pequeña que una lista de todos los destinos peligrosos posibles.",
  "why": [
    "La red del amigo no tiene NAT de Internet, ni DNS externo, ni una regla de red con un alcance amplio.",
    "Las consultas DNS pueden transportar datos codificados, así que «sin navegación web» no equivale a «sin ninguna forma de salir».",
    "Estas restricciones las aplican la red y el proxy; no dependen de confiar en que el modelo se comporte bien."
  ],
  "term": {
    "word": "Proxy",
    "meaning": "Un servicio intermedio controlado que gestiona solicitudes en nombre de otro sistema."
  },
  "source": "s9",
  "reward": "Guardián",
  "unlocks": [
    "Network"
  ],
  "weight": 5,
  "challenge_type": "multi"
}