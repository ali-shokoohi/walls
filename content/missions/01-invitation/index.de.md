{
  "id": "invitation",
  "chapter": "Vor den Mauern",
  "title": "Dein erster Besucher",
  "goal": "Verstehe, was das Teilen eines KI-Bots wirklich bedeutet.",
  "scene": "Ein Freund bittet, deinen neuen KI-Bot nutzen zu dürfen. Er kann chatten, Dateien lesen und Programme ausführen. Sein Telegram-Konto ist zum Benutzen des Bots freigegeben.",
  "speaker": "Dein Freund",
  "message": "Das ist doch nur ein Chatbot. Was könnte schiefgehen, wenn ich reindarf?",
  "task": "Was solltest du annehmen, bevor du den Bot teilst?",
  "options": [
    {
      "title": "Nur ein Server-Experte könnte ihn gefährlich machen",
      "detail": "Eine normale Nachricht kann keine Computeraktion auslösen.",
      "feedback": {
        "reason": "Das geht davon aus, dass eine normale Nachricht keine Computeraktion auslösen kann. Aber dieser Bot hat bereits Werkzeuge zum Lesen von Dateien und Ausführen von Programmen; die Person, die darum bittet, muss diese Aktionen nicht selbst umsetzen.",
        "consequence": "Zum Beispiel kann jemand, der das freigegebene Konto nutzt, den Bot bitten, eine Datei zu lesen. Wenn ein aktiviertes Werkzeug auf diese Datei zugreifen kann, ist fehlendes Serverwissen kein Hindernis."
      }
    },
    {
      "title": "Ein freigegebenes Konto kann jedes aktivierte Werkzeug auslösen",
      "detail": "Jemand, der dieses Konto nutzt, könnte den Bot auch bitten, Aktionen auszuführen."
    },
    {
      "title": "Der Bot erkennt jede schädliche Anfrage",
      "detail": "Seine Anweisungen schützen den Server ausreichend.",
      "feedback": {
        "reason": "Das setzt voraus, dass das Modell jede schädliche Anfrage zuverlässig erkennt. Nicht vertrauenswürdige Inhalte können eine Anweisung als normalen Teil eines Dokuments tarnen, sodass diese Erkennung fehlschlagen kann.",
        "consequence": "Zum Beispiel kann ein Dokument dem Bot sagen, als Teil einer dringenden Prüfung private Einstellungen zu lesen. Wenn der Bot dem folgt und Zugriff hat, stoppt eine Sicherheitsanweisung allein das Lesen nicht."
      }
    }
  ],
  "answer": [
    1
  ],
  "success": "Genau. Zugang bedeutet nicht nur, Nachrichten senden zu können. Er kann auch Zugriff auf alle Werkzeuge geben, die der Bot verwenden darf.",
  "lesson": "Ein KI-Agent ist ein Chatbot mit Händen. Bevor du einen teilst, überlege, was diese Hände erreichen können.",
  "why": [
    "Es braucht keine besonderen technischen Fähigkeiten, um einen Agenten um die Nutzung eines aktivierten Werkzeugs zu bitten.",
    "Dazu gehört auch jemand, der das Konto deines Freundes stiehlt.",
    "Modelle und ihre Anweisungen sind keine zuverlässigen Sicherheitsgrenzen."
  ],
  "term": {
    "word": "KI-Agent",
    "meaning": "Ein KI-System, das über Werkzeuge Aktionen ausführen kann, nicht nur mit Text antworten."
  },
  "source": "s1",
  "reward": "Denke in Aktionen, nicht in Nachrichten",
  "unlocks": [],
  "weight": 1,
  "challenge_type": "choice"
}
