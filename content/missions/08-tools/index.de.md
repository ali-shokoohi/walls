{
  "id": "tools",
  "chapter": "Baue die Grenzen",
  "title": "Gib ihm weniger Hände",
  "goal": "Wähle die geringste Macht, die ein gewöhnlicher Chatbot braucht.",
  "scene": "Reza will nur Fragen stellen und chatten. Er braucht keinen Bot, der Websites durchsurft, Plugins installiert, Programme ausführt oder Aufgaben plant.",
  "speaker": "Einrichtungs-Menü",
  "message": "Soll ich alle Werkzeuge einschalten, nur für den Fall?",
  "task": "Wähle die sicherste Einrichtung für Rezas eigentliche Bedürfnisse.",
  "options": [
    {
      "title": "Nur Chat – unnötige Aktionswerkzeuge deaktiviert",
      "detail": "Füge Fähigkeiten bewusst nur hinzu, wenn sie wirklich gebraucht werden."
    },
    {
      "title": "Alles aktivieren, aber dem Bot sagen, er solle vorsichtig sein",
      "detail": "Ein langer Sicherheitshinweis kann Einschränkungen ersetzen.",
      "feedback": {
        "reason": "Ein Sicherheitshinweis entfernt weder die Fähigkeit noch den Zugriff eines Werkzeugs. Wird das Modell getäuscht, bleiben alle unnötigen Aktionen verfügbar.",
        "consequence": "Reza braucht nur Chat, aber ein bösartiges Dokument könnte trotzdem versuchen, einen aktivierten Browser, eine Programmlaufzeit oder einen Aufgabenplaner auszulösen. Diese Fähigkeiten schaffen Risiko, ohne Rezas erklärten Bedarf zu erfüllen."
      }
    },
    {
      "title": "Alles aktivieren und im selben Chat um eine Ja/Nein-Zustimmung bitten",
      "detail": "Ein Angreifer mit diesem Konto könnte eine Aktion nie genehmigen.",
      "feedback": {
        "reason": "Die Zustimmung geht an genau jenes Konto, das vielleicht gestohlen wurde. Wer dieses Konto kontrolliert, kann die Genehmigungsanfrage ebenfalls beantworten.",
        "consequence": "Ein Angreifer, der Rezas Telegram-Sitzung nutzt, kann eine Aktion anfordern und anschließend einfach 'Ja' drücken. Dieser Hin- und Rückweg beweist nicht, dass eine andere, vertrauenswürdige Person zugestimmt hat."
      }
    }
  ],
  "answer": [
    0
  ],
  "success": "Du hast Aktionen entfernt, die Reza nicht braucht. Weniger Werkzeuge bedeutet weniger Wege, wie eine schlechte Nachricht zu einer schädlichen Aktion wird.",
  "lesson": "Minimalprivilegien heißt, einem System nur die Macht zu geben, die es braucht – nicht jede Macht, die es eines Tages nutzen könnte.",
  "why": [
    "Die Anleitung schaltet das Durchsuchen von Websites, das Planen von Aufgaben, die Delegation und andere unnötige Fähigkeiten ab.",
    "Der Agent sollte die Sicherheitseinstellungen und den installierten Code nicht frei umschreiben können.",
    "Eine Zustimmung, die in denselben kompromittierten Chat zurückkommt, ist keine unabhängige Sicherheitsgrenze."
  ],
  "term": {
    "word": "Minimalprivilegien",
    "meaning": "Nur die Zugriffe und Fähigkeiten gewähren, die für die eigentliche Aufgabe nötig sind."
  },
  "source": "s11",
  "reward": "Sorgfältiger Werkzeugbauer",
  "unlocks": [
    "Hermes"
  ],
  "weight": 8,
  "challenge_type": "choice"
}
