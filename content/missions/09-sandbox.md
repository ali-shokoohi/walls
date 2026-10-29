{
  "id": "sandbox",
  "chapter": "Build the boundaries",
  "title": "A workshop away from home",
  "goal": "Separate command execution from the bot’s own state.",
  "scene": "Sina does need the bot to run a small program. That program might be hostile. You choose where it runs.",
  "speaker": "Sina",
  "message": "Can it have a place to work without giving it the keys to the bot’s home?",
  "task": "Select all three properties the execution workshop should have.",
  "options": [
    {
      "title": "Separate from the Hermes instance",
      "detail": "A program should not run next to the bot’s memory, settings, or credentials."
    },
    {
      "title": "No network access",
      "detail": "Do not give an untrusted program a route to the internet or the proxy."
    },
    {
      "title": "Temporary writes that are discarded when the session ends",
      "detail": "Do not keep the program’s changes as permanent trusted state."
    },
    {
      "title": "A shared folder containing the bot’s settings and secrets",
      "detail": "Make every file available so the program never gets stuck."
    }
  ],
  "answer": [
    0,
    1,
    2
  ],
  "success": "A separate, disconnected, temporary workshop. In the guide, commands go over restricted SSH to another instance and run inside gVisor.",
  "lesson": "A sandbox is a restricted work area. It should not contain the valuables you are trying to protect.",
  "why": [
    "gVisor adds a user-space kernel boundary between a command and the underlying system.",
    "The guide combines it with a separate instance and network restrictions; no single layer is treated as perfect.",
    "Do not assume every tool follows the terminal backend. File tools and code execution must stay disabled until their actual execution location is proven."
  ],
  "term": {
    "word": "Sandbox",
    "meaning": "A restricted place to run potentially untrusted code with limited access and disposable changes."
  },
  "source": "s12",
  "reward": "Workshop builder",
  "unlocks": [
    "Sandbox"
  ],
  "weight": 9,
  "challenge_type": "multi"
}

A sandbox is a restricted work area. It should not contain the valuables you are trying to protect.
