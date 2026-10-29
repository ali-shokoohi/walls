{
  "id": "sandbox",
  "chapter": "Construye los límites",
  "title": "Un taller lejos de casa",
  "goal": "Separa la ejecución de comandos del estado propio del bot.",
  "scene": "Sina sí necesita que el bot ejecute un programa pequeño. Ese programa podría ser hostil. Tú eliges dónde se ejecuta.",
  "speaker": "Sina",
  "message": "¿Puede tener un lugar de trabajo sin darle las llaves de la casa del bot?",
  "task": "Selecciona las tres propiedades que debe tener el taller de ejecución.",
  "options": [
    {
      "title": "Separado de la instancia de Hermes",
      "detail": "Un programa no debería ejecutarse junto a la memoria, la configuración ni las credenciales del bot.",
      "feedback": {
        "reason": "Sin un entorno de ejecución separado, el programa hostil puede ejecutarse junto al estado propio del bot con los mismos permisos. Restringir la red no impide el acceso a los archivos locales.",
        "consequence": "El programa podría intentar leer conversaciones o modificar la memoria escribible de la carpeta de Hermes. El aislamiento de red por sí solo no separa esos archivos locales."
      }
    },
    {
      "title": "Sin acceso a la red",
      "detail": "No des a un programa que no es de confianza una ruta hacia Internet ni hacia el proxy.",
      "feedback": {
        "reason": "Un taller separado aún puede enviar información fuera si tiene una ruta de red. Separar los archivos no impide por sí mismo las solicitudes salientes.",
        "consequence": "Un programa hostil podría intentar subir cualquier dato accesible o contactar con otro servicio. Un taller sin red elimina esa ruta en lugar de confiar en que el programa se comporte bien."
      }
    },
    {
      "title": "Escrituras temporales que se descartan al terminar la sesión",
      "detail": "No conserves como estado permanente y confiable los cambios del programa.",
      "feedback": {
        "reason": "Si las escrituras se conservan permanentemente, un programa que no es de confianza puede dejar cambios para sesiones futuras. Terminar la sesión no eliminaría esos cambios.",
        "consequence": "Un archivo de inicio modificado o un archivo de trabajo manipulado podría leerse en la siguiente ejecución. Descartar las escrituras de la sesión evita esa forma concreta de persistencia."
      }
    },
    {
      "title": "Una carpeta compartida que contiene la configuración y los secretos del bot",
      "detail": "Haz que todos los archivos estén disponibles para que el programa nunca se quede bloqueado.",
      "feedback": {
        "reason": "Montar la configuración y los secretos del bot en el taller pone esos elementos protegidos al alcance del programa hostil. Llamar al entorno «sandbox» no cambia los archivos a los que puede acceder.",
        "consequence": "Un programa podría leer un archivo de configuración montado o modificarlo si el montaje permite escribir. El taller separado ya no mantendría esos archivos del bot fuera de su alcance."
      }
    }
  ],
  "answer": [
    0,
    1,
    2
  ],
  "success": "Un taller separado, desconectado y temporal. En la guía, los comandos pasan por SSH restringido a otra instancia y se ejecutan dentro de gVisor.",
  "lesson": "Un sandbox es un área de trabajo restringida. No debería contener los elementos valiosos que intentas proteger.",
  "why": [
    "gVisor añade un límite de kernel en el espacio de usuario entre un comando y el sistema subyacente.",
    "La guía lo combina con una instancia separada y restricciones de red; ninguna capa se considera perfecta por sí sola.",
    "No supongas que todas las herramientas siguen el backend de terminal. Las herramientas de archivos y la ejecución de código deben permanecer desactivadas hasta demostrar dónde se ejecutan realmente."
  ],
  "term": {
    "word": "Sandbox",
    "meaning": "Un lugar restringido para ejecutar código potencialmente no confiable, con acceso limitado y cambios desechables."
  },
  "source": "s12",
  "reward": "Constructor de talleres",
  "unlocks": [
    "Sandbox"
  ],
  "weight": 9,
  "challenge_type": "multi"
}