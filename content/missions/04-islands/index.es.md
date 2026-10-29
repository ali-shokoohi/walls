{
  "id": "islands",
  "chapter": "Construye los límites",
  "title": "Una isla para cada amigo",
  "goal": "Evita que el problema de un amigo se extienda a otro.",
  "scene": "Reza y Sina usarán un bot. Estás organizando sus hogares y conexiones. La comodidad resulta tentadora, pero quieres zonas de fallo separadas.",
  "speaker": "Sina",
  "message": "Si toman el control del bot de Reza, ¿podrá llegar a mis conversaciones?",
  "task": "Elige la distribución que mejor contenga un compromiso.",
  "options": [
    {
      "title": "Un proceso de bot compartido y una carpeta compartida",
      "detail": "Pon el nombre de cada amigo en un chat diferente.",
      "feedback": {
        "reason": "Los nombres de los chats no controlan el acceso en un proceso o una carpeta compartidos. Si toman el control de ese proceso, puede exponer todos los datos que pueda leer, sin importar a qué chat pertenezcan.",
        "consequence": "Un bot compartido comprometido podría leer las conversaciones guardadas de Sina mientras actúa desde el chat de Reza, porque ambos usan el mismo almacenamiento accesible."
      }
    },
    {
      "title": "Dos carpetas de perfil en un sistema compartido por lo demás",
      "detail": "Los nombres de carpetas diferentes deberían ser todo el límite.",
      "feedback": {
        "reason": "Las carpetas de perfil separadas organizan el estado, pero sus nombres por sí solos no restringen el acceso del sistema operativo. Un proceso comprometido aún podría tener permiso para leer ambos perfiles.",
        "consequence": "Si el proceso de Reza puede abrir el directorio de perfil de Sina, puede leer sus datos sin cambiar el nombre de su propio perfil ni entrar en el chat de Sina."
      }
    },
    {
      "title": "Instancias, redes y proxies aislados por separado",
      "detail": "Cada amigo tiene su propio entorno y rutas restringidas."
    }
  ],
  "answer": [
    2
  ],
  "success": "Las islas separadas limitan las rutas entre amigos. Las etiquetas y las carpetas de perfil por sí solas no impiden que un proceso comprometido llegue al sistema operativo.",
  "lesson": "Los entornos separados son el límite; los nombres separados no lo son.",
  "why": [
    "Incus crea entornos aislados. Los contenedores sin privilegios usan identidades restringidas en el host.",
    "Los contenedores siguen compartiendo un kernel. Cuando están disponibles y bien configuradas, las máquinas virtuales añaden un kernel separado y un límite de virtualización del hardware.",
    "La guía también separa el bridge y el proxy de cada amigo, en lugar de considerar segura una red compartida."
  ],
  "term": {
    "word": "Aislamiento",
    "meaning": "Un límite técnico que restringe a qué puede acceder un entorno desde otro."
  },
  "source": "s8",
  "reward": "Constructor de islas",
  "unlocks": [
    "Isolation"
  ],
  "weight": 4,
  "challenge_type": "choice"
}