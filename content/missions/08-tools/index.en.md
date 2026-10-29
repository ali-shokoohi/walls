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
      "detail": "A long safety prompt can replace restrictions.",
      "feedback": {
        "reason": "A safety prompt does not remove a tool’s capability or access. If the model is fooled, all the unnecessary actions remain available.",
        "consequence": "Reza only needs chat, but a malicious document could still try to trigger an enabled browser, program runner, or scheduler. Those capabilities create risk without serving his stated need."
      }
    },
    {
      "title": "Enable everything and ask for a yes/no approval in the same chat",
      "detail": "An attacker with that account could never approve an action.",
      "feedback": {
        "reason": "The approval goes to the same account that may have been stolen. Whoever controls that account can also answer the approval prompt.",
        "consequence": "An attacker using Reza’s Telegram session can request an action and then press yes. That round trip does not prove that a separate trusted person approved it."
      }
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
