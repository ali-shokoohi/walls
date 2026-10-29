{
  "id": "maintenance",
  "chapter": "Practice the response",
  "title": "The update that reopened a door",
  "goal": "Treat updates as changes to a security boundary.",
  "scene": "A maintenance update installed new packages. Some package permissions and defaults may have changed. Installation needed temporary internet access.",
  "speaker": "Maintenance reminder",
  "message": "The software is updated. Are we finished?",
  "task": "Choose the complete maintenance habit.",
  "options": [
    {
      "title": "Snapshot, controlled update, restore restrictions, and test again",
      "detail": "Review changed settings and refresh the integrity baseline after legitimate changes."
    },
    {
      "title": "Leave the install network open for convenience",
      "detail": "The next update will be easier.",
      "feedback": {
        "reason": "The install network was a temporary exception, not the intended running environment. Leaving it open makes the previous closed-network assumption false.",
        "consequence": "A later compromised bot could attempt direct internet connections through the install route instead of using only its controlled proxy."
      }
    },
    {
      "title": "Trust the previous tests forever",
      "detail": "They passed before the software changed.",
      "feedback": {
        "reason": "Earlier tests checked an earlier configuration and software version. The update may have changed permissions, defaults, or networking.",
        "consequence": "A package could restore a privileged permission or a changed setting could reopen access. Last week’s passing result would not detect today’s change."
      }
    }
  ],
  "answer": [
    0
  ],
  "success": "An update is not finished until the protections are restored and tested. A green test from last week describes last week’s system.",
  "lesson": "Security is a maintained process, not a setup you finish once.",
  "why": [
    "Updates can restore privileged program permissions or introduce new options with unsuitable defaults.",
    "Containers use the host kernel, so an installed kernel patch needs a reboot to take effect.",
    "A fresh integrity baseline distinguishes legitimate maintenance from unexplained later changes."
  ],
  "term": {
    "word": "Integrity baseline",
    "meaning": "A saved record of expected file contents or hashes, used to detect later changes."
  },
  "source": "s16",
  "reward": "Boundary maintainer",
  "unlocks": [],
  "weight": 13,
  "challenge_type": "choice"
}
