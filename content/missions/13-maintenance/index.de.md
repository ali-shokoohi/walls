{
  "id": "maintenance",
  "chapter": "Übe die Reaktion",
  "title": "Das Update, das eine Tür wieder öffnete",
  "goal": "Behandle Updates als Änderungen an einer Sicherheitsgrenze.",
  "scene": "Ein Wartungs-Update hat neue Pakete installiert. Einige Paketberechtigungen und Standardwerte könnten sich geändert haben. Die Installation benötigte vorübergehenden Internetzugang.",
  "speaker": "Wartungserinnerung",
  "message": "Die Software ist aktualisiert. Sind wir fertig?",
  "task": "Wähle die vollständige Wartungsgewohnheit.",
  "options": [
    {
      "title": "Sicherung anlegen, kontrolliert aktualisieren, Einschränkungen wiederherstellen und erneut testen",
      "detail": "Prüfe die geänderten Einstellungen und erneuere die Integritätsbaseline nach berechtigten Änderungen."
    },
    {
      "title": "Das Installationsnetzwerk aus Bequemlichkeit offen lassen",
      "detail": "Das nächste Update wird einfacher.",
      "feedback": {
        "reason": "Das Installationsnetzwerk war eine vorübergehende Ausnahme, nicht die beabsichtigte Laufzeitumgebung. Wenn es offen bleibt, ist die frühere Annahme eines geschlossenen Netzwerks falsch.",
        "consequence": "Ein später kompromittierter Bot könnte versuchen, über den Installationsweg direkte Internetverbindungen aufzubauen, anstatt nur den kontrollierten Proxy zu verwenden."
      }
    },
    {
      "title": "Den früheren Tests für immer vertrauen",
      "detail": "Sie bestanden, bevor sich die Software geändert hat.",
      "feedback": {
        "reason": "Frühere Tests prüften eine frühere Konfiguration und Softwareversion. Das Update könnte Berechtigungen, Standardwerte oder die Netzwerkumgebung geändert haben.",
        "consequence": "Ein Paket könnte eine privilegierte Berechtigung wiederherstellen, oder eine geänderte Einstellung könnte den Zugriff wieder öffnen. Das bestandene Ergebnis der letzten Woche würde die Änderung von heute nicht erkennen."
      }
    }
  ],
  "answer": [
    0
  ],
  "success": "Ein Update ist erst abgeschlossen, wenn die Schutzmaßnahmen wiederhergestellt und getestet wurden. Ein bestandener Test aus der letzten Woche beschreibt das System der letzten Woche.",
  "lesson": "Sicherheit ist ein fortlaufender Prozess, keine einmalige Einrichtung.",
  "why": [
    "Updates können privilegierte Programmberechtigungen wiederherstellen oder neue Optionen mit ungeeigneten Standardwerten einführen.",
    "Container nutzen den Kernel des Hosts, daher braucht ein installierter Kernel-Patch einen Neustart, um wirksam zu werden.",
    "Eine frische Integritätsbaseline unterscheidet berechtigte Wartung von späteren, unerklärlichen Änderungen."
  ],
  "term": {
    "word": "Integritätsbaseline",
    "meaning": "Eine gespeicherte Aufzeichnung der erwarteten Dateiinhalte oder Hashes, die dazu dient, spätere Änderungen zu erkennen."
  },
  "source": "s16",
  "reward": "Grenzenhüter",
  "unlocks": [],
  "weight": 13,
  "challenge_type": "choice"
}
