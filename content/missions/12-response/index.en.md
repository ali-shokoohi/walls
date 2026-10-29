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
      "detail": "Do not trust the compromised bot’s memory or settings.",
      "feedback": {
        "reason": "Leaving out investigation and a clean rebuild leaves the suspected compromised state in use; leaving the old replacement tokens valid also retains their proxy access.",
        "consequence": "Poisoned memory or altered files could affect later runs, and a stolen replacement token could remain usable through its authorized proxy until rotated."
      }
    },
    {
      "title": "Run the full verification checks before sharing access again",
      "detail": "Refresh clean snapshots and integrity records afterward.",
      "feedback": {
        "reason": "Without verification after the rebuild, you do not know whether the restrictions and new configuration actually work together.",
        "consequence": "A rebuilt instance could accidentally retain an open install-network route or a wrong token setting. Sharing access before testing would expose that mistake to real use."
      }
    },
    {
      "title": "Contain the bot and its sandbox; close its proxy exit",
      "detail": "Stop the ongoing activity before doing cleanup.",
      "feedback": {
        "reason": "Without containment, the suspected compromised instance can continue acting while you investigate or rebuild parts of the service.",
        "consequence": "An attacker could keep making permitted service requests or changing writable state while you collect evidence. Closing its exit stops that ongoing activity first."
      }
    },
    {
      "title": "Preserve evidence",
      "detail": "Save incident snapshots and relevant logs before rebuilding.",
      "feedback": {
        "reason": "Without preserving evidence, cleanup can destroy the information needed to understand the incident and its scope.",
        "consequence": "Restoring a clean snapshot can overwrite the files that showed how the bot was compromised. Afterward, the original incident timeline may be impossible to reconstruct."
      }
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
  "challenge_type": "order",
  "order_rules": [
    {
      "before": 2,
      "after": 3,
      "reason": "Containment must happen before evidence collection so the suspected compromised instance cannot keep changing the scene while you capture it.",
      "consequence": "If you collect evidence first while leaving the bot active, the attacker could continue altering files or making requests during the capture."
    },
    {
      "before": 3,
      "after": 0,
      "reason": "Preserve evidence before investigation and a clean rebuild. Rebuilding changes or replaces the state that could show what happened.",
      "consequence": "If you rebuild first, the altered files or memory you needed as evidence may be overwritten. You cannot reliably recover that original incident state afterward."
    },
    {
      "before": 0,
      "after": 1,
      "reason": "The final verification must test the newly rebuilt configuration, not the compromised copy that will be replaced.",
      "consequence": "If you test before the rebuild and then replace the instance, that passing result says nothing about the replacement's tokens, tools, or network restrictions."
    }
  ]
}
