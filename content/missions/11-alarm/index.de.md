{
  "id": "alarm",
  "chapter": "Übe die Reaktion",
  "title": "Ein Klopfen an einer verbotenen Tür",
  "goal": "Erkenne ein Signal, das eine Untersuchung wert ist.",
  "scene": "Der Bot nutzt normalerweise nur seine erlaubten Dienste. Heute hält der Proxy einen Versuch fest, pastebin.com zu erreichen – ein Ziel, das dieses Design nicht erlaubt.",
  "speaker": "Prüfprotokoll des Proxys · vereinfacht",
  "message": "Anfrage abgelehnt: Ziel nicht erlaubt — pastebin.com",
  "task": "Wie sollte der Betreiber reagieren?",
  "options": [
    {
      "title": "Ignoriere es, weil die Anfrage blockiert wurde",
      "detail": "Ein gestoppter Versuch kann uns nichts lehren.",
      "feedback": {
        "reason": "Diese Anfrage zu blockieren zeigt, dass eine Mauer funktioniert hat – nicht, warum die unerwartete Anfrage überhaupt aufgetreten ist. Ein irregeleiteter oder kompromittierter Bot kann weiterhin andere Aktionen versuchen.",
        "consequence": "Das Ereignis zu ignorieren könnte vergiftete Inhalte, veränderten Zustand oder eine vom Angreifer kontrollierte Sitzung unentdeckt lassen, während der Bot weiterläuft."
      }
    },
    {
      "title": "Untersuche schnell und prüfe verwandte Aktivitäten",
      "detail": "Eine Ablehnung kann einen irregeleiteten Bot, eine Kompromittierung oder ein Konfigurationsproblem aufdecken."
    },
    {
      "title": "Füge die Website sofort zur Erlaubnisliste hinzu",
      "detail": "Das Ziel ist, die Warnung verschwinden zu lassen.",
      "feedback": {
        "reason": "Eine Ablehnung ist ein Beweis dafür, dass die Anfrage gegen die Richtlinien verstoßen hat – nicht ein Beweis, dass die Richtlinien gelockert werden sollten. Das Ziel hinzuzufügen, entfernt die Mauer, bevor du weißt, warum sie ausprobiert wurde.",
        "consequence": "Wenn die Anfrage von einem Versuch des Datendiebstahls kam, könnte der nächste Upload zu dieser neu erlaubten Website durchgehen, statt eine Ablehnung auszulösen."
      }
    }
  ],
  "answer": [
    1
  ],
  "success": "Dass die Mauer funktioniert, ist eine gute Nachricht; der unerwartete Versuch ist trotzdem wichtig. Untersuche, bevor du die Grenze lockerst.",
  "lesson": "Eine Ablehnung ist ein Beweis – kein Grund, die Tür automatisch aufzumachen.",
  "why": [
    "Die Anleitung überwacht Proxy-Ablehnungen, Netzwerk-Drops, veränderte Konfigurationsdateien und unerwartete Host-Logins.",
    "Jeder unerwartete Datenabgang aus der Ausführungssandbox ist besonders beunruhigend, denn sie sollte kein einziges erlaubtes externes Ziel haben.",
    "Protokolle können sensible Metadaten enthalten. Schütze sie und denk daran: Der Serverbetreiber kann mehr sehen als ein normaler Bot-Nutzer."
  ],
  "term": {
    "word": "Prüfprotokoll",
    "meaning": "Eine Aufzeichnung von Aktionen und Entscheidungen, die einem Betreiber hilft zu verstehen, was passiert ist."
  },
  "source": "s14",
  "reward": "Aufmerksamer Betreiber",
  "unlocks": [],
  "weight": 11,
  "challenge_type": "choice"
}
