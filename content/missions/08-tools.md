{
  "id": "tools",
  "chapter": "Build the boundaries",
  "title": "Give it fewer hands",
  "goal": "Choose the least power needed for an ordinary chat bot.",
  "scene": "Reza only wants to ask questions and chat. He does not need the bot to browse websites, install plugins, run programs, or schedule tasks.",
  "speaker": "Setup menu",
  "message": "Would you like every tool switched on, just in case?",
  "task": "Pick the safest setup for Reza’s actual needs.",
  "options": [
    {
      "title": "Chat-only, with unnecessary action tools disabled",
      "detail": "Add capabilities deliberately only when they are really needed."
    },
    {
      "title": "Enable everything but tell the bot to be careful",
      "detail": "A long safety prompt can replace restrictions."
    },
    {
      "title": "Enable everything and ask for a yes/no approval in the same chat",
      "detail": "An attacker with that account could never approve an action."
    }
  ],
  "answer": [
    0
  ],
  "success": "You removed actions Reza does not need. Fewer tools means fewer ways a bad message can become a damaging action.",
  "lesson": "Least privilege means giving a system only the power it needs—not every power it might someday use.",
  "why": [
    "The guide turns off browsing, scheduling, delegation, and other unnecessary capabilities.",
    "Security settings and installed code should not be freely rewritable by the agent itself.",
    "An approval coming back to the same compromised chat is not an independent security boundary."
  ],
  "term": {
    "word": "Least privilege",
    "meaning": "Grant only the access and capabilities required for the actual job."
  },
  "source": "s11",
  "reward": "Careful toolmaker",
  "unlocks": [
    "Hermes"
  ],
  "weight": 8,
  "challenge_type": "choice"
}

Least privilege means giving a system only the power it needs—not every power it might someday use.
