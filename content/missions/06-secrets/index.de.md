{
  "id": "secrets",
  "chapter": "Baue die Grenzen",
  "title": "Die leere Schatztruhe",
  "goal": "Halte echte Zugangsdaten aus der Umgebung des Agenten heraus.",
  "scene": "Ein Angreifer hat jede Datei und jede Umgebungsvariable in Rezas Bot-Instanz gelesen. Diese Leseaktion kannst du jetzt nicht mehr stoppen. Du kannst aber entscheiden, was dort von Anfang an überhaupt lag.",
  "speaker": "Angreifer",
  "message": "Ich habe die Einstellungen des Bots gefunden. Zeit, den echten API-Schlüssel und den Bot-Token zu stehlen.",
  "task": "Welches Speichermodell begrenzt den Diebstahl von Zugangsdaten am besten?",
  "options": [
    {
      "title": "Echte Zugangsdaten in eine Datei namens secret.txt legen",
      "detail": "Der Name warnt alle davor, sie zu öffnen.",
      "feedback": {
        "reason": "Ein Dateiname ist nur ein Etikett, keine Einschränkung. Laut Szenario kann der Angreifer jede Datei in der Bot-Instanz lesen – auch eine namens secret.txt.",
        "consequence": "Der Angreifer liest den echten Schlüssel aus der Datei und kann ihn außerhalb deines Servers verwenden, bis du ihn widerrufst. Die Datei 'geheim' zu nennen, verhindert diese Wiederverwendung nicht."
      }
    },
    {
      "title": "Dem Bot Ersatz-Token geben und die echten Zugangsdaten in seinem Proxy aufbewahren",
      "detail": "Nur der kontrollierte Proxy tauscht die Ersatzwerte gegen die echten."
    },
    {
      "title": "Echte Zugangsdaten in den Umgebungsvariablen des Bots ablegen",
      "detail": "Sie sind im normalen Chat-Fenster nicht sichtbar.",
      "feedback": {
        "reason": "Umgebungsvariablen sind für die normale Chat-Oberfläche unsichtbar, aber nicht für einen kompromittierten Prozess. Der Angreifer in diesem Szenario kann sie lesen.",
        "consequence": "Ein kompromittierter Bot-Prozess könnte den echten API-Schlüssel oder den Bot-Token aus seiner Umgebung holen und diese Zugangsdaten direkt gegenüber dem Anbieter oder Telegram wiederverwenden."
      }
    }
  ],
  "answer": [
    1
  ],
  "success": "Der Angreifer findet Ersatz-Token, nicht den echten Anbieter-Schlüssel oder den Telegram-Bot-Token. Diese Ersatzwerte behalten über den autorisierten Proxy weiterhin Wirkung – sie müssen daher ebenfalls kontrolliert und nach einer Kompromittierung ausgetauscht werden.",
  "lesson": "Man kann kein echtes Geheimnis von einem Ort stehlen, an den es nie gelangt ist.",
  "why": [
    "Der Proxy verwahrt die echten Zugangsdaten und injiziert sie genau im Moment des Ausgangs.",
    "Ersatz-Token sind keine gültigen Zugangsdaten, wenn sie direkt an Telegram oder den Modell-Anbieter gesendet werden.",
    "Füge keine echten Token in dieses Spiel, in Chats oder in die Bot-Instanz ein. Dies ist nur eine Lernsimulation."
  ],
  "term": {
    "word": "Zugangsdaten",
    "meaning": "Ein Geheimnis wie ein API-Schlüssel oder ein Bot-Token, mit dem jemand als Konto oder Dienst handeln kann."
  },
  "source": "s10",
  "reward": "Hüter der Geheimnisse",
  "unlocks": [
    "Secrets"
  ],
  "weight": 6,
  "challenge_type": "choice"
}
