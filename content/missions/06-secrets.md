{
  "id": "secrets",
  "chapter": "Build the boundaries",
  "title": "The empty treasure chest",
  "goal": "Keep real credentials out of the agent’s environment.",
  "scene": "An attacker has read every file and environment variable in Reza’s bot instance. You cannot stop that read now. You can decide what was there in the first place.",
  "speaker": "Attacker",
  "message": "I found the bot’s settings. Time to steal the real API key and bot token.",
  "task": "Which storage plan best limits credential theft?",
  "options": [
    {
      "title": "Put real credentials in a file called secret.txt",
      "detail": "The name warns everyone not to open it.",
      "feedback": {
        "reason": "A filename is a label, not a restriction. The scenario says the attacker can already read every file in the bot instance, including one named secret.txt.",
        "consequence": "The attacker reads the real key from that file and may use it outside your server until you revoke it. Naming the file ‘secret’ does not prevent that reuse."
      }
    },
    {
      "title": "Give the bot replacement tokens; keep real credentials in its proxy",
      "detail": "Only the controlled proxy swaps replacements for real values."
    },
    {
      "title": "Put real credentials in the bot’s environment variables",
      "detail": "They are not visible in the normal chat window.",
      "feedback": {
        "reason": "Environment variables are hidden from the normal chat interface, but not from a process compromise. The attacker in this scenario can read them.",
        "consequence": "A compromised bot process could obtain the real API key or bot token from its environment and reuse those credentials directly with the provider or Telegram."
      }
    }
  ],
  "answer": [
    1
  ],
  "success": "The attacker finds replacement tokens, not the real provider key or Telegram bot token. Those replacements still have power through the authorized proxy, so they must also be controlled and rotated after compromise.",
  "lesson": "You cannot steal a real secret from a place it never entered.",
  "why": [
    "The proxy holds the real credentials and injects them at the moment of egress.",
    "Replacement tokens are not valid credentials when sent directly to Telegram or the model provider.",
    "Do not paste real tokens into this game, into chats, or into the bot instance. This is a teaching simulation only."
  ],
  "term": {
    "word": "Credential",
    "meaning": "A secret, such as an API key or bot token, that lets someone act as an account or service."
  },
  "source": "s10",
  "reward": "Secret keeper",
  "unlocks": [
    "Secrets"
  ],
  "weight": 6,
  "challenge_type": "choice"
}

You cannot steal a real secret from a place it never entered.
