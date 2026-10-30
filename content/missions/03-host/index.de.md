{
  "id": "host",
  "chapter": "Baue die Grenzen",
  "title": "Baue nicht auf dem Boden deines Wohnzimmers",
  "goal": "Wähle ein sicheres Zuhause für den geteilten Bot.",
  "scene": "Du kannst den Bot auf einen von drei Computern stellen. Stell dir vor, ein Angreifer übernimmt irgendwann die volle Kontrolle über den Computer, der ihn beherbergt.",
  "speaker": "Dein zukünftiges Ich",
  "message": "Wenn diese ganze Maschine verloren geht, was verlieren wir dann noch damit?",
  "task": "Wähle den besten Ort, um den Dienst aufzubauen.",
  "options": [
    {
      "title": "Dein alltäglicher privater Computer",
      "detail": "Er hat bereits deine Fotos, Arbeitsdateien und gespeicherte Zugangsdaten.",
      "feedback": {
        "reason": "Dein privater Computer enthält wertvolle Dinge, die mit dem Bot nichts zu tun haben. In diesem Szenario erhält der Angreifer die Kontrolle über den gesamten Host, und wenn der Bot neben diesen Schätzen steht, liegen sie in derselben Fehlerzone.",
        "consequence": "Die Übernahme des Hosts könnte neben dem Bot auch Arbeitsdateien oder gespeicherte Zugangsdaten preisgeben. Den Bot neu aufzubauen würde den Diebstahl dieser fremden Dateien nicht rückgängig machen."
      }
    },
    {
      "title": "Ein dedizierter Server ohne fremde persönliche Daten",
      "detail": "Halte seine Einstiegswege gering, installiere Updates und schütze den Administratorzugriff."
    },
    {
      "title": "Der Allzweck-Server eines Freundes",
      "detail": "Teile ihn mit dessen anderen Diensten, um Setup-Zeit zu sparen.",
      "feedback": {
        "reason": "Der Allzweck-Server deines Freundes enthält immer noch fremde Dienste und Daten. Den Bot auf die geteilte Maschine einer anderen Person zu verlegen, beseitigt nicht das Risiko einer vollständigen Host-Übernahme.",
        "consequence": "Wenn dieser Host verloren geht, kann dein Freund auch den Zugang zu anderen Diensten oder deren Daten verlieren. Gesparte Setup-Zeit begrenzt diesen Schaden nicht."
      }
    }
  ],
  "answer": [
    1
  ],
  "success": "Du hast fremde Schätze aus dem Schadensradius gehalten. Ein dedizierter Host verhindert nicht jeden Angriff, aber sein Verlust muss deinen privaten Computer nicht ebenfalls preisgeben.",
  "lesson": "Gib dem Bot ein Zuhause, das du es dir leisten kannst, neu aufzubauen. Schütze den Administratorzugriff mit starken SSH-Schlüsseln und halte das System gepatcht.",
  "why": [
    "Der Host ist das Fundament unter all den anderen Grenzen.",
    "Ein kompromittierter Host kann die Infrastruktur und die darin enthaltenen Geheimnisse preisgeben.",
    "Der Host der Anleitung enthält keine fremden Arbeitsdaten, keine persönlichen Dienste und keine Schlüssel zu anderen Servern."
  ],
  "term": {
    "word": "Host",
    "meaning": "Der Hauptcomputer oder Server, der die isolierten Umgebungen und ihre unterstützenden Dienste ausführt."
  },
  "source": "s7",
  "reward": "Sauberes Fundament",
  "unlocks": [
    "Host"
  ],
  "weight": 3,
  "challenge_type": "choice"
}
