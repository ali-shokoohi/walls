{
  "id": "final",
  "chapter": "Das abschließende Briefing",
  "title": "Was wirst du deinem Freund sagen?",
  "goal": "Gib ein ehrliches Versprechen, statt eines unmöglichen.",
  "scene": "Deine sechs Schutzmaßnahmen sind durchdacht, und die echte Inbetriebnahme braucht noch Umsetzung und Tests. Reza fragt, ob er diesen Bot wie ein komplett privates, unhackbares Tagebuch behandeln kann.",
  "speaker": "Reza",
  "message": "Also ist er nicht zu hacken, und niemand kann meine Chats sehen?",
  "task": "Wähle die verantwortungsvolle Antwort.",
  "options": [
    {
      "title": "Ja. Sechs Ebenen machen einen Einbruch unmöglich",
      "detail": "Du musst dir keine Gedanken mehr über Privatsphäre oder Updates machen.",
      "feedback": {
        "reason": "Mehrere Ebenen verringern die Auswirkung von Fehlern, machen aber weder Bugs noch Kontodiebstahl unmöglich. Außerdem entfernen sie nicht den Zugriff des Betreibers oder des Modell-Anbieters auf Konversationsdaten.",
        "consequence": "Wenn Reza den Bot wie ein privates, unhackbares Tagebuch behandelt, könnte er Geheimnisse eingeben, die der Administrator lesen kann oder die der Anbieter im normalen Betrieb erhält."
      }
    },
    {
      "title": "Es begrenzt den Schaden, ist aber nicht perfekt oder vollständig privat",
      "detail": "Der Betreiber und der Modell-Anbieter können auf Konversationsdaten zugreifen; schütze dein Konto und teile sensible Geheimnisse nicht."
    },
    {
      "title": "Die KI wird ab jetzt immer Angriffe erkennen",
      "detail": "Die Ebenen haben dem Modell beigebracht, nie Fehler zu machen.",
      "feedback": {
        "reason": "Die Grenzen beschränken, was das System tun kann; sie trainieren das Modell nicht, jeden Angriff zu erkennen. Prompt-Injection und Softwarefehler können weiterhin auftreten.",
        "consequence": "Ein vergiftetes Dokument könnte das Modell weiterhin irreführen. Die Schutzmaßnahmen sollen die daraus resultierende Aktion einschränken, nicht garantieren, dass das Modell sie nie wählt."
      }
    }
  ],
  "answer": [
    1
  ],
  "success": "Das ist das richtige Versprechen. Das Design zielt darauf ab, den Schaden einzudämmen, nicht jeden Bug, jeden Kontodiebstahl oder jeden Privatsphären-Kompromiss zu eliminieren.",
  "lesson": "Eine vertrauenswürdige Sicherheitserklärung sagt sowohl, was geschützt ist, als auch was weiterhin in Gefahr ist.",
  "why": [
    "Container teilen sich einen Kernel; Infrastruktur und Administratorzugriff bleiben hochattraktive Ziele.",
    "Der Modell-Anbieter erhält die Konversationen, und der Administrator kann auf die Serverdaten zugreifen.",
    "Als normaler Nutzer: Aktiviere die Zwei-Faktor-Verifizierung von Telegram, prüfe aktive Sitzungen, teile niemals Bot-/API-Geheimnisse und melde unerwartetes Verhalten dem Betreiber."
  ],
  "term": {
    "word": "Restrisiko",
    "meaning": "Das Risiko, das auch nach der Einführung von Schutzmaßnahmen bleibt."
  },
  "source": "s18",
  "reward": "Ehrlicher Beschützer",
  "unlocks": [],
  "weight": 14,
  "challenge_type": "choice"
}
