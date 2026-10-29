{
  "id": "final",
  "chapter": "The final briefing",
  "title": "What will you tell your friend?",
  "goal": "Make an honest promise instead of an impossible one.",
  "scene": "Your six defenses are designed, and the real deployment still needs implementation and testing. Reza asks whether he can treat this bot like a completely private, impossible-to-hack diary.",
  "speaker": "Reza",
  "message": "So it’s impossible to hack, and nobody can see my chats?",
  "task": "Choose the responsible answer.",
  "options": [
    {
      "title": "Yes. Six layers make a breach impossible",
      "detail": "There is no need to think about privacy or updates anymore.",
      "feedback": {
        "reason": "Several layers reduce the impact of failures but do not make bugs or account theft impossible. They also do not remove the operator’s or model provider’s access to conversation data.",
        "consequence": "If Reza treats the bot as an impossible-to-hack private diary, he may enter secrets the administrator can read or that the provider receives during normal operation."
      }
    },
    {
      "title": "It limits damage, but it is not perfect or fully private",
      "detail": "The operator and model provider may access conversation data; protect your account and avoid sharing sensitive secrets."
    },
    {
      "title": "The AI will always detect attacks now",
      "detail": "The layers taught the model never to make mistakes.",
      "feedback": {
        "reason": "The boundaries constrain what the system can do; they do not train the model to recognize every attack. Prompt injection and software flaws can still occur.",
        "consequence": "A poisoned document may still mislead the model. The defenses are meant to restrict the resulting action, not guarantee that the model never chooses it."
      }
    }
  ],
  "answer": [
    1
  ],
  "success": "That is the right promise. The design aims to contain damage, not eliminate every bug, account theft, or privacy tradeoff.",
  "lesson": "A trustworthy security explanation says both what is protected and what is still at risk.",
  "why": [
    "Containers share a kernel; infrastructure and administrator access remain high-value targets.",
    "The model provider receives conversations, and the administrator can access the server’s data.",
    "As a normal user: enable Telegram two-step verification, check active sessions, never share bot/API secrets, and report unexpected behavior to the operator."
  ],
  "term": {
    "word": "Residual risk",
    "meaning": "Risk that remains even after safeguards are in place."
  },
  "source": "s18",
  "reward": "Honest defender",
  "unlocks": [],
  "weight": 14,
  "challenge_type": "choice"
}

A trustworthy security explanation says both what is protected and what is still at risk.
