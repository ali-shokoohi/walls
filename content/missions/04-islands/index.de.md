{
  "id": "islands",
  "chapter": "Baue die Grenzen",
  "title": "Eine Insel pro Freund",
  "goal": "Verhindere, dass die Probleme eines Freundes auf einen anderen übergreifen.",
  "scene": "Reza und Sina werden beide einen Bot nutzen. Du richtest deren Unterkünfte und Verbindungen ein. Bequemlichkeit ist verlockend, aber du möchtest getrennte Fehlerzonen.",
  "speaker": "Sina",
  "message": "Wenn Rezas Bot übernommen wird, kann er an meine Gespräche kommen?",
  "task": "Wähle die Anordnung, die eine Übernahme am besten eindämmt.",
  "options": [
    {
      "title": "Ein geteilter Bot-Prozess und ein geteilter Ordner",
      "detail": "Jeder Freund bekommt einen anderen Chat mit seinem Namen.",
      "feedback": {
        "reason": "Chat-Namen sind keine Zugangssteuerung für einen geteilten Prozess oder Ordner. Die Übernahme dieses Prozesses kann alle Daten preisgeben, die der Prozess lesen kann, egal welchem Chat sie gehören.",
        "consequence": "Ein kompromittierter geteilter Bot könnte Sinas gespeicherte Gespräche lesen, während er über Rezas Chat agiert, weil beide denselben zugänglichen Speicher nutzen."
      }
    },
    {
      "title": "Zwei Profil-Ordner auf ansonsten geteiltem System",
      "detail": "Unterschiedliche Ordnernamen sollten die ganze Grenze sein.",
      "feedback": {
        "reason": "Getrennte Profil-Ordner ordnen den Zustand an, aber Ordnernamen allein schränken den Zugriff des Betriebssystems nicht ein. Ein kompromittierter Prozess kann weiterhin die Erlaubnis haben, beide Profile zu lesen.",
        "consequence": "Wenn Rezas Prozess Sinas Profil-Ordner öffnen kann, kann er Sinas Daten lesen, ohne seinen eigenen Profilnamen zu ändern oder in Sinas Chat einzutreten."
      }
    },
    {
      "title": "Getrennte isolierte Instanzen, Netzwerke und Proxys",
      "detail": "Jeder Freund hat seine eigene Umgebung und eingeschränkte Routen."
    }
  ],
  "answer": [
    2
  ],
  "success": "Getrennte Inseln begrenzen die Wege zwischen den Freunden. Etiketten und Profil-Ordner allein verhindern nicht, dass ein kompromittierter Prozess das Betriebssystem erreicht.",
  "lesson": "Getrennte Umgebungen sind die Grenze; getrennte Namen sind es nicht.",
  "why": [
    "Incus erstellt isolierte Umgebungen. Nicht privilegierte Container verwenden auf dem Host eingeschränkte Identitäten.",
    "Container teilen weiterhin einen Kernel. Wenn virtuelle Maschinen verfügbar und korrekt konfiguriert sind, fügen sie einen separaten Kernel und eine Hardware-Virtualisierungsgrenze hinzu.",
    "Die Anleitung trennt auch Bridge und Proxy jedes Freundes, anstatt ein geteiltes Netz für sicher zu halten."
  ],
  "term": {
    "word": "Isolierung",
    "meaning": "Eine technische Grenze, die einschränkt, was eine Umgebung in einer anderen Umgebung erreichen kann."
  },
  "source": "s8",
  "reward": "Inselbauer",
  "unlocks": [
    "Isolation"
  ],
  "weight": 4,
  "challenge_type": "choice"
}
