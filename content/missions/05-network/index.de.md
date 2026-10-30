{
  "id": "network",
  "chapter": "Baue die Grenzen",
  "title": "Schließe die Seitentüren",
  "goal": "Verstehe, warum Netzwerke standardmäßig verweigern.",
  "scene": "Ein kompromittierter Bot will einen privaten Chat auf eine unbekannte Website hochladen. Du entscheidest, welche externen Verbindungen seine Umgebung herstellen darf.",
  "speaker": "Türsteher des Netzwerks",
  "message": "Gib mir eine explizite Liste. Alles, was nicht darauf steht, bleibt geschlossen.",
  "task": "Erlaube nur den einen Weg, den dieser Bot im Design der Anleitung braucht.",
  "options": [
    {
      "title": "Sein eigener, kontrollierter Proxy",
      "detail": "Der Proxy prüft die Ziele und stellt die echten Zugangsdaten bereit.",
      "feedback": {
        "reason": "Werden der kontrollierte Proxy weggelassen, fehlt die vorgesehene Route für die erlaubten Dienstanfragen des Bots. Fremde Ausgänge geschlossen zu halten genügt nicht, wenn auch die legitime Route fehlt.",
        "consequence": "Mit blockiertem direktem Internetzugriff und ohne erlaubte Proxy-Route schlagen auch ganz normale Telegram- oder Modell-Anfragen fehl. Ein nützliches Design muss die vorgesehene Arbeit erlauben und anderen Verkehr verweigern."
      }
    },
    {
      "title": "Jede Website, wenn der Bot sagt, sie sei nützlich",
      "detail": "Lass das Modell entscheiden, welche Websites vertrauenswürdig sind.",
      "feedback": {
        "reason": "Das gibt die Sicherheitsentscheidung genau jenem Modell zurück, das selbst getäuscht werden kann. Ein kompromittierter oder irreführter Bot kann die Website eines Angreifers als nützlich beschreiben.",
        "consequence": "Ein vergiftetes Dokument könnte den Bot überzeugen, einen privaten Chat auf genau diese Website hochzuladen. Erlaubt das Netzwerk jedes Ziel, hält keine externe Kontrolle das Hochladen auf."
      }
    },
    {
      "title": "Ein öffentlicher DNS-Resolver",
      "detail": "Erlaube ihm, beliebige Domainnamen direkt nachzuschlagen.",
      "feedback": {
        "reason": "Ein beliebiger DNS-Nachschlag ist trotzdem eine ausgehende Nachricht. Sein Domainname kann kodierte Daten enthalten, selbst wenn keine Webseite geöffnet wird.",
        "consequence": "So könnte der Nachschlag für PRIVATE-DATA.attacker.example genau diesen Namen an Infrastruktur preisen, die der Angreifer kontrolliert. Direkter DNS öffnet also einen weiteren möglichen Ausgang."
      }
    },
    {
      "title": "Der Proxy des anderen Freundes",
      "detail": "Nützlich als Reserve, falls sein eigener ausfällt.",
      "feedback": {
        "reason": "Der Proxy eines anderen Freundes ist keine autorisierte Ausfahrt für diesen Bot. Diese Route zu erlauben schwächt die beabsichtigte Trennung zwischen den Freunden – selbst wenn der andere Proxy eigene Prüfungen der Zugangsdaten vornimmt.",
        "consequence": "Nach einer Kompromittierung könnte der Angreifer sich zumindest mit dem Proxy des anderen Freundes verbinden und ihn auskundschaften. Eine Ausnahme als 'Reserve' hat einen Weg geschaffen, den die Grenze 'ein Freund' gerade verbieten sollte."
      }
    }
  ],
  "answer": [
    0
  ],
  "success": "Ein kontrollierter Ausgang. Anfragen müssen weiterhin die Prüfungen des Proxys bestehen, und andere direkte Routen bleiben geschlossen.",
  "lesson": "Standardmäßig verweigern heißt: 'Nichts ist erlaubt, es sei denn, wir erlauben es ausdrücklich.' Eine Erlaubnisliste ist kleiner als eine Liste aller möglichen schlechten Ziele.",
  "why": [
    "Das Netzwerk des Freundes hat keine Internet-NAT, keinen externen DNS und nur eine eng eingegrenzte Netzwerkregel.",
    "DNS-Nachschläge können selbst kodierte Daten tragen – 'kein Web-Surfen' ist also nicht dasselbe wie 'kein Weg heraus'.",
    "Diese Einschränkungen erzwingen das Netzwerk und der Proxy – nicht das Vertrauen, dass sich das Modell benimmt."
  ],
  "term": {
    "word": "Proxy",
    "meaning": "Ein kontrollierter Dienst dazwischen, der Anfragen im Namen eines anderen Systems abwickelt."
  },
  "source": "s9",
  "reward": "Türsteher",
  "unlocks": [
    "Network"
  ],
  "weight": 5,
  "challenge_type": "multi"
}
