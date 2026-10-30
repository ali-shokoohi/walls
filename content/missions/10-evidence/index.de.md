{
  "id": "evidence",
  "chapter": "Übe die Reaktion",
  "title": "Beweise, nicht grünes Licht",
  "goal": "Erkenne Beweise dafür, dass eine Grenze tatsächlich funktioniert.",
  "scene": "Eine Konfigurationsanzeige zeigt „Sicher“. Bevor du deine Freunde einlädst, willst du Beweise. Wähle Tests, die echte Einschränkungen prüfen, nicht nur den Anschein.",
  "speaker": "Dein Freund",
  "message": "Der Bot hat versprochen, dass nie etwas ausläuft. Reicht das nicht?",
  "task": "Wähle die drei nützlichen Prüfungen.",
  "options": [
    {
      "title": "Versuche eine verbotene Verbindung von innerhalb der Instanz aus",
      "detail": "Prüfe, dass die erzwungene Netzwerkgrenze sie blockiert – sogar als Root der Instanz.",
      "feedback": {
        "reason": "Ohne eine verbotene Verbindung zu testen, hast du nicht geprüft, ob die Netzwerkeinschränkung tatsächlich erzwungen wird. Eine Konfiguration kann existieren, ohne auf die richtige Instanz angewendet zu sein.",
        "consequence": "Eine fehlende oder falsch angewendete Regel könnte den direkten Internetzugriff offen lassen, während die Anzeige weiter „Sicher“ zeigt. Ein negativer Verbindungstest prüft genau diesen Anspruch."
      }
    },
    {
      "title": "Frag den Bot, ob er sicher ist",
      "detail": "Behandle seine Antwort als vollständige Sicherheitsprüfung.",
      "feedback": {
        "reason": "Die Antwort des Bots ist nur eine weitere Aussage, die vom geprüften System selbst erzeugt wird. Sie beobachtet und beweist nicht alle Grenzen des Betriebssystems und des Netzwerks.",
        "consequence": "Der Bot könnte „Ich bin sicher“ sagen, während eine Firewall-Regel fehlt oder ein Werkzeug in der falschen Umgebung läuft. Die beruhigende Antwort würde trotzdem erscheinen – obwohl die Grenze gescheitert ist."
      }
    },
    {
      "title": "Prüfe, wo die Werkzeugaktionen tatsächlich ausgeführt werden",
      "detail": "Beweise, dass sie in die Sandbox und nicht ins eigene Home des Bots gelangen.",
      "feedback": {
        "reason": "Ein konfigurierter Backend beweist nicht, wo jedes Werkzeug ausgeführt wird. Manche Werkzeuge können einen anderen Ausführungsweg als die Terminalbefehle nutzen.",
        "consequence": "Ein Dateiwerkzeug könnte in der Hermes-Instanz laufen und auf ihren Zustand zugreifen, selbst wenn ein Terminalbefehl in die Sandbox gelangt. Den tatsächlichen Ort zu testen, deckt diese Abweichung auf."
      }
    },
    {
      "title": "Prüfe, dass der Proxy einen fremden Token ablehnt",
      "detail": "Stelle sicher, dass die Anfrage nicht einfach bei Telegram ankommt und dort fehlschlägt.",
      "feedback": {
        "reason": "Ohne einen fremden Token zu testen, kann eine Domain-Erlaubnisliste korrekt aussehen und trotzdem die Anfragen des falschen Kontos durchlassen.",
        "consequence": "Eine fremde Anfrage könnte Telegram erreichen und dort einen 401 zurückgeben. Das beweist nicht, dass der Proxy sie abgelehnt hat, bevor sie Telegram erreichte; die Grenze der Zugangsdaten braucht ihren eigenen Test."
      }
    }
  ],
  "answer": [
    0,
    2,
    3
  ],
  "success": "Du hast beobachtbares Verhalten gewählt. Eine Konfiguration ist eine Behauptung; ein Test prüft, ob diese Behauptung in dieser Umgebung hält.",
  "lesson": "Bauen, abschließen, testen. Wiederhole die Tests nach Aktualisierungen und Konfigurationsänderungen.",
  "why": [
    "Teste sowohl erlaubtes als auch verbotenes Verhalten: Blockierte falsche Anfragen nützen nichts, wenn dadurch auch jede gute Anfrage kaputt geht.",
    "Eine schnelle Verbindungsaablehnung kann bedeuten, dass ein Paket das Ziel erreicht hat. Die Anleitung unterscheidet sie von der erwarteten Drop-Zeitüberschreitung.",
    "Dieses Spiel zu bestehen ist Lernen, kein Beweis dafür, dass ein echter Server sicher ist."
  ],
  "term": {
    "word": "Verifizierung",
    "meaning": "Das tatsächliche Verhalten mit einem erwarteten Ergebnis abgleichen, anstatt eine Beschriftung, eine Konfiguration oder eine Zusage zu vertrauen."
  },
  "source": "s13",
  "reward": "Beweisjäger",
  "unlocks": [],
  "weight": 10,
  "challenge_type": "multi"
}
