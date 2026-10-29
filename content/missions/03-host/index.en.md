{
  "id": "host",
  "chapter": "Build the boundaries",
  "title": "Don’t build on your living room floor",
  "goal": "Choose a safe home for the shared bot.",
  "scene": "You can put the bot on one of three computers. Imagine that an attacker eventually takes full control of the computer hosting it.",
  "speaker": "Your future self",
  "message": "If this whole machine is lost, what else do we lose with it?",
  "task": "Pick the best place to build the service.",
  "options": [
    {
      "title": "Your everyday personal computer",
      "detail": "It already has your photos, work files, and saved logins.",
      "feedback": {
        "reason": "Your personal computer contains unrelated valuables. In this scenario the attacker gains control of the whole host, so putting the bot beside those valuables puts them within the same failure zone.",
        "consequence": "A host takeover could expose work files or saved logins as well as the bot. Rebuilding the bot would not undo the theft of those unrelated files."
      }
    },
    {
      "title": "A dedicated server with no unrelated personal data",
      "detail": "Keep its entry points few, patch it, and protect administrator access."
    },
    {
      "title": "A friend’s all-purpose server",
      "detail": "Share it with their other services to save setup time.",
      "feedback": {
        "reason": "Your friend’s all-purpose server still contains unrelated services and data. Moving the bot to somebody else’s shared machine does not remove the risk of a full host takeover.",
        "consequence": "If that host is lost, your friend may lose access to other services or their data too. Saving setup time does not limit that damage."
      }
    }
  ],
  "answer": [
    1
  ],
  "success": "You kept unrelated valuables out of the blast radius. A dedicated host does not prevent every attack, but losing it need not expose your personal computer too.",
  "lesson": "Give the bot a home you can afford to rebuild. Protect administrator access with strong SSH keys and keep the system patched.",
  "why": [
    "The host is the foundation beneath all the other boundaries.",
    "A host compromise can expose the infrastructure and the secrets it contains.",
    "The guide’s host holds no unrelated work data, personal services, or keys to other servers."
  ],
  "term": {
    "word": "Host",
    "meaning": "The main computer or server that runs the isolated environments and their supporting services."
  },
  "source": "s7",
  "reward": "Clean foundation",
  "unlocks": [
    "Host"
  ],
  "weight": 3,
  "challenge_type": "choice"
}
