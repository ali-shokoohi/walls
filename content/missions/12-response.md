{
  "id": "response",
  "chapter": "Practice the response",
  "title": "The bot is compromised",
  "goal": "Put the response in a safe order.",
  "scene": "You have evidence that Reza’s bot instance was taken over. Real credentials stayed in the separate proxy, but the bot’s writable memory may be poisoned.",
  "speaker": "Incident coordinator",
  "message": "Don’t keep chatting with the compromised copy. What comes first, and what comes next?",
  "task": "Tap these steps in the safest order.",
  "options": [
    {
      "title": "Investigate, rotate replacement tokens, and rebuild from a clean point",
      "detail": "Do not trust the compromised bot’s memory or settings."
    },
    {
      "title": "Run the full verification checks before sharing access again",
      "detail": "Refresh clean snapshots and integrity records afterward."
    },
    {
      "title": "Contain the bot and its sandbox; close its proxy exit",
      "detail": "Stop the ongoing activity before doing cleanup."
    },
    {
      "title": "Preserve evidence",
      "detail": "Save incident snapshots and relevant logs before rebuilding."
    }
  ],
  "answer": [
    2,
    3,
    0,
    1
  ],
  "success": "Contain → preserve → investigate and rebuild → test. You did not try to ‘clean up’ a running compromised bot and hope for the best.",
  "lesson": "Rebuild from a clean point, and rotate what was exposed. If the infrastructure or host is compromised, the response is much broader.",
  "why": [
    "For one Hermes-instance compromise, the guide rotates that friend’s replacement tokens because real credentials were not stored there.",
    "An infrastructure compromise can expose real bot tokens, API keys, and the CA: those must be replaced too.",
    "If the host itself is compromised, rebuild the whole server. Lower layers can no longer be trusted."
  ],
  "term": {
    "word": "Incident containment",
    "meaning": "Stopping ongoing harmful activity and restricting access before investigating and rebuilding."
  },
  "source": "s15",
  "reward": "Incident responder",
  "unlocks": [],
  "weight": 12,
  "challenge_type": "order"
}

Rebuild from a clean point, and rotate what was exposed. If the infrastructure or host is compromised, the response is much broader.
