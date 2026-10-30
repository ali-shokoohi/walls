{
  "id": "sandbox",
  "chapter": "Setze die Grenzen",
  "title": "Eine Werkstatt fern von zu Hause",
  "goal": "Trenne die Befehlsausführung vom eigenen Zustand des Bots.",
  "scene": "Sina braucht den Bot tatsächlich, um ein kleines Programm auszuführen. Dieses Programm könnte bösartig sein. Du wählst, wo es ausgeführt wird.",
  "speaker": "Sina",
  "message": "Kann es einen Arbeitsplatz haben, ohne dass man ihm die Schlüssel zum Haus des Bots gibt?",
  "task": "Wähle alle drei Eigenschaften, die die Ausführungswerkstatt haben soll.",
  "options": [
    {
      "title": "Getrennt von der Hermes-Instanz",
      "detail": "Ein Programm sollte nicht neben dem Speicher, der Konfiguration oder den Zugangsdaten des Bots laufen.",
      "feedback": {
        "reason": "Ohne eine getrennte Ausführungsumgebung läuft das bösartige Programm mit denselben Berechtigungen neben dem Zustand des Bots selbst. Dem Programm das Netzwerk zu beschränken, stoppt den Zugriff auf lokale Dateien nicht.",
        "consequence": "Das Programm könnte versuchen, Gespräche zu lesen oder den beschreibbaren Speicher im Hermes-Home zu verändern. Netzwerkisolation allein trennt diese lokalen Dateien nicht."
      }
    },
    {
      "title": "Kein Netzwerkzugriff",
      "detail": "Gib einem Programm, dem du nicht vertraust, keinen Weg zu Internet oder zum Proxy.",
      "feedback": {
        "reason": "Eine getrennte Werkstatt kann weiterhin Informationen nach außen senden, wenn sie einen Netzwerkweg hat. Getrennte Dateien verhindern allein nicht ausgehende Anfragen.",
        "consequence": "Ein bösartiges Programm könnte versuchen, beliebige erreichbare Daten hochzuladen oder einen anderen Dienst zu kontaktieren. Eine Werkstatt ohne Netz entfernt diesen Weg, anstatt darauf zu vertrauen, dass sich das Programm ordentlich benimmt."
      }
    },
    {
      "title": "Temporäre Schreibvorgänge, die bei Sitzungsende verworfen werden",
      "detail": "Bewahre die Änderungen des Programms nicht als dauerhaften, vertrauenswürdigen Zustand auf.",
      "feedback": {
        "reason": "Wenn Schreibvorgänge dauerhaft behalten werden, kann ein Programm, dem du nicht vertraust, Änderungen für spätere Sitzungen hinterlassen. Das Beenden der Sitzung würde diese Änderungen nicht entfernen.",
        "consequence": "Eine veränderte Startdatei oder ein vergiftetes Arbeitsfile könnte beim nächsten Lauf gelesen werden. Das Verwerfen der Schreibvorgänge der Sitzung verhindert genau diese Form der Persistenz."
      }
    },
    {
      "title": "Ein gemeinsam genutzter Ordner mit der Konfiguration und den Geheimnissen des Bots",
      "detail": "Mach alle Dateien verfügbar, damit das Programm nie feststeckt.",
      "feedback": {
        "reason": "Wenn du die Konfiguration und Geheimnisse des Bots in die Werkstatt einbindst, landen die geschützten Schätze in der Reichweite des bösartigen Programms. Die Umgebung als Sandbox zu bezeichnen, ändert nichts an den Dateien, auf die sie zugreifen kann.",
        "consequence": "Ein Programm könnte eine eingebundene Konfigurationsdatei lesen oder verändern, wenn das Mount schreibbar ist. Die getrennte Werkstatt würde diese Bot-Dateien dann nicht mehr aus der Reichweite halten."
      }
    }
  ],
  "answer": [
    0,
    1,
    2
  ],
  "success": "Eine getrennte, abgekoppelte und temporäre Werkstatt. In der Anleitung werden Befehle über eingeschränktes SSH zu einer anderen Instanz geschickt und in gVisor ausgeführt.",
  "lesson": "Eine Sandbox ist eine eingeschränkte Arbeitsumgebung. Sie sollte nicht die Schätze enthalten, die du schützen willst.",
  "why": [
    "gVisor fügt zwischen einem Befehl und dem darunterliegenden System eine Kernel-Grenze im Benutzerbereich ein.",
    "Die Anleitung kombiniert es mit einer getrennten Instanz und Netzwerkeinschränkungen; keine einzelne Schicht wird als perfekt betrachtet.",
    "Nimm nicht an, dass jedes Werkzeug über denselben Backend wie die Terminalbefehle läuft. Dateiwerkzeuge und die Codeausführung müssen deaktiviert bleiben, bis bewiesen ist, wo sie tatsächlich ausgeführt werden."
  ],
  "term": {
    "word": "Sandbox",
    "meaning": "Ein eingeschränkter Ort, um potenziell nicht vertrauenswürdigen Code mit begrenztem Zugriff und wegwerfbaren Änderungen auszuführen."
  },
  "source": "s12",
  "reward": "Werkstattbauer",
  "unlocks": [
    "Sandbox"
  ],
  "weight": 9,
  "challenge_type": "multi"
}
