{
  "id": "response",
  "chapter": "Übe die Reaktion",
  "title": "Der Bot ist kompromittiert",
  "goal": "Bringe die Reaktion in eine sichere Reihenfolge.",
  "scene": "Du hast Beweise dafür, dass Rezas Bot-Instanz übernommen wurde. Die echten Zugangsdaten blieben im getrennten Proxy, aber der beschreibbare Speicher des Bots könnte vergiftet sein.",
  "speaker": "Incident-Koordinator",
  "message": "Hör auf, mit der kompromittierten Kopie zu chatten. Was kommt zuerst, und was danach?",
  "task": "Tippe diese Schritte in der sichersten Reihenfolge an.",
  "options": [
    {
      "title": "Untersuchen, die Ersatz-Tokens rotieren und von einem sauberen Punkt aus neu aufbauen",
      "detail": "Vertraue weder dem Speicher noch den Einstellungen des kompromittierten Bots.",
      "feedback": {
        "reason": "Wenn du die Untersuchung und einen sauberen Neuaufbau auslässt, bleibt der mutmaßlich kompromittierte Zustand in Nutzung; solange die alten Ersatz-Tokens gültig bleiben, bleibt auch ihr Proxy-Zugriff erhalten.",
        "consequence": "Vergifteter Speicher oder veränderte Dateien könnten spätere Läufe beeinflussen, und ein gestohlenes Ersatz-Token könnte über seinen autorisierten Proxy nutzbar bleiben, bis es rotiert wird."
      }
    },
    {
      "title": "Führe vor der erneuten Zugangsweitergabe alle Verifizierungsprüfungen durch",
      "detail": "Aktualisiere danach die sauberen Sicherungskopien und die Integritätsaufzeichnungen.",
      "feedback": {
        "reason": "Ohne Verifizierung nach dem Neuaufbau weißt du nicht, ob die Einschränkungen und die neue Konfiguration tatsächlich zusammen funktionieren.",
        "consequence": "Eine neu aufgebaute Instanz könnte versehentlich eine offene Route zum Installationsnetzwerk oder eine falsche Token-Einstellung behalten. Zugang vor dem Testen freizugeben, würde diesen Fehler dem echten Gebrauch aussetzen."
      }
    },
    {
      "title": "Isolier den Bot und seine Sandbox; schließe seinen Proxy-Ausgang",
      "detail": "Stoppe die laufende Aktivität, bevor du aufräumst.",
      "feedback": {
        "reason": "Ohne Eindämmung kann die mutmaßlich kompromittierte Instanz weiter aktiv sein, während du untersuchst oder Teile des Dienstes neu aufbaust.",
        "consequence": "Ein Angreifer könnte weiterhin erlaubte Dienstanfragen senden oder beschreibbaren Zustand verändern, während du Beweise sammelst. Seinen Ausgang zu schließen, stoppt zuerst genau diese laufende Aktivität."
      }
    },
    {
      "title": "Bewahre Beweise auf",
      "detail": "Speichere die Vorfalls-Sicherungskopien und die relevanten Protokolle vor dem Neuaufbau.",
      "feedback": {
        "reason": "Ohne die Beweise aufzubewahren, kann das Aufräumen die Informationen zerstören, die man braucht, um den Vorfall und seinen Umfang zu verstehen.",
        "consequence": "Eine saubere Sicherungskopie wiederherzustellen, kann die Dateien überschreiben, die zeigten, wie der Bot kompromittiert wurde. Danach lässt sich der ursprüngliche Zeitverlauf des Vorfalls vielleicht nicht mehr rekonstruieren."
      }
    }
  ],
  "answer": [
    2,
    3,
    0,
    1
  ],
  "success": "Eindämmen → Bewahren → Untersuchen und neu aufbauen → Testen. Du hast nicht versucht, einen laufenden, kompromittierten Bot „aufzuräumen“ und auf das Beste zu hoffen.",
  "lesson": "Baue von einem sauberen Punkt aus wieder auf und rotiere, was exponiert wurde. Wenn Infrastruktur oder Host kompromittiert sind, ist die Reaktion viel umfassender.",
  "why": [
    "Bei der Kompromittierung einer einzelnen Hermes-Instanz rotiert die Anleitung die Ersatz-Tokens dieses Freundes, weil die echten Zugangsdaten dort nicht gespeichert waren.",
    "Eine kompromittierte Infrastruktur kann echte Bot-Tokens, API-Keys und die CA offenlegen: Auch diese müssen ersetzt werden.",
    "Ist der Host selbst kompromittiert, baue den gesamten Server neu auf. Auf die darunterliegenden Schichten kannst du dich nicht mehr verlassen."
  ],
  "term": {
    "word": "Eindämmung eines Vorfalls",
    "meaning": "Die laufende schädliche Aktivität stoppen und den Zugang einschränken – alles vor dem Untersuchen und Neuaufbau."
  },
  "source": "s15",
  "reward": "Incident-Responder",
  "unlocks": [],
  "weight": 12,
  "challenge_type": "order",
  "order_rules": [
    {
      "before": 2,
      "after": 3,
      "reason": "Die Eindämmung muss vor der Beweissicherung erfolgen, damit die mutmaßlich kompromittierte Instanz nicht weiter die Szene verändern kann, während du sie aufnimmst.",
      "consequence": "Wenn du zuerst Beweise sammelst und den Bot aktiv lässt, könnte der Angreifer während der Aufnahme weiterhin Dateien verändern oder Anfragen senden."
    },
    {
      "before": 3,
      "after": 0,
      "reason": "Bewahre Beweise vor der Untersuchung und dem sauberen Neuaufbau auf. Der Neuaufbau verändert oder ersetzt den Zustand, der zeigen könnte, was passiert ist.",
      "consequence": "Wenn du zuerst neu aufbaust, können die veränderten Dateien oder der Speicher, die du als Beweise brauchtest, überschrieben werden. Danach lässt sich dieser ursprüngliche Vorfallzustand nicht mehr zuverlässig wiederherstellen."
    },
    {
      "before": 0,
      "after": 1,
      "reason": "Die abschließende Verifizierung muss die neu aufgebaute Konfiguration testen – nicht die kompromittierte Kopie, die ersetzt wird.",
      "consequence": "Wenn du vor dem Neuaufbau testest und die Instanz danach ersetzt, sagt dieses bestandene Ergebnis nichts über die Tokens, Werkzeuge oder Netzwerkeinschränkungen des Ersatzes aus."
    }
  ]
}
