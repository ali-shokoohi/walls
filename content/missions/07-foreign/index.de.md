{
  "id": "foreign",
  "chapter": "Baue die Grenzen",
  "title": "Der Trick mit der erlaubten Adresse",
  "goal": "Sieh, warum eine erlaubte Domain nicht ausreicht.",
  "scene": "Dein Proxy erlaubt Telegram. Eine bösartige Anfrage versucht, Daten über den eigenen Telegram-Bot des Angreifers zu senden – mit dem Token des Angreifers statt Rezas Ersatz-Token.",
  "speaker": "Verdächtige Anfrage",
  "message": "Ich gehe zu Telegram, und Telegram ist erlaubt. Lass mich bitte durch.",
  "task": "Was sollte der Proxy tun?",
  "options": [
    {
      "title": "Sie erlauben, weil die Website Telegram ist",
      "detail": "Jede Anfrage an eine erlaubte Domain ist sicher.",
      "feedback": {
        "reason": "Auf Telegram laufen viele Bots und Konten. Nur das Ziel zu prüfen, sagt nichts darüber aus, ob diese Anfrage Rezas vorgesehene Identität nutzt oder den Bot des Angreifers.",
        "consequence": "Die Anfrage könnte Daten über den Bot des Angreifers senden und trotzdem nach api.telegram.org gehen. Eine Prüfung, die nur die Domain ansieht, würde die Anfrage genau zu jenem Empfänger durchlassen, den du ausschließen willst."
      }
    },
    {
      "title": "Die KI fragen, ob die Anfrage verdächtig wirkt",
      "detail": "Lass das Modell die finale Sicherheitsentscheidung treffen.",
      "feedback": {
        "reason": "Das Modell ist Teil des möglicherweise kompromittierten Systems. Es zu fragen, ob seine eigene Anfrage verdächtig wirkt, fügt keinen unabhängigen Kontrollpunkt hinzu.",
        "consequence": "Ein irreführtes Modell könnte das Token des Angreifers genehmigen, nur weil das Ziel Telegram sagt. Der Proxy hätte dann keinen erzwungenen Grund, diese fremde Identität aufzuhalten."
      }
    },
    {
      "title": "Sie verweigern, außer sie trägt Rezas erwartetes Ersatz-Token",
      "detail": "Prüfe Identität und Ziel, bevor irgendetwas Telegram erreicht."
    }
  ],
  "answer": [
    2
  ],
  "success": "Die Zielprüfung besteht, aber die Anforderung an die Zugangsdaten stoppt die Anfrage. 'Erlaubte Website' heißt nicht 'jedes Konto dort darf verwendet werden'.",
  "lesson": "Prüfe sowohl, wohin eine Anfrage geht, als auch welche Identität sie nutzen kann.",
  "why": [
    "Die Anleitung nutzt eine Proxy-Option namens require, um Anfragen zu verweigern, die das erwartete Ersatz-Token nicht mitbringen.",
    "Ein Telegram-Fehler 401 ist kein Beweis, dass der Proxy die Anfrage abgewiesen hat: Er kann bedeuten, dass die Anfrage Telegram erreicht hat und dort fehlgeschlagen ist.",
    "Echte Umsetzungen müssen getestet werden – auch, wie sich die Zugangsdaten-Anforderungen im Tunnelmodus des Proxys verhalten."
  ],
  "term": {
    "word": "Erlaubnisliste",
    "meaning": "Eine explizite Liste dessen, was erlaubt ist. Alles andere wird verweigert."
  },
  "source": "s13",
  "reward": "Identitätsprüfer",
  "unlocks": [],
  "weight": 7,
  "challenge_type": "choice"
}
