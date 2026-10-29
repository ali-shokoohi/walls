{
  "id": "evidence",
  "chapter": "Practice the response",
  "title": "Proof, not green lights",
  "goal": "Recognize evidence that a boundary actually works.",
  "scene": "A setup screen says ‘Secure.’ You want evidence before inviting your friends. Choose tests that check real restrictions rather than appearances.",
  "speaker": "Your friend",
  "message": "The bot promised it would never leak anything. Isn’t that enough?",
  "task": "Select the three useful checks.",
  "options": [
    {
      "title": "Try a forbidden connection from inside the instance",
      "detail": "Verify that the enforced network boundary blocks it, even as instance root."
    },
    {
      "title": "Ask the bot whether it is secure",
      "detail": "Treat its answer as a complete security audit."
    },
    {
      "title": "Check where tool actions actually execute",
      "detail": "Prove they reach the sandbox, not the bot’s own home."
    },
    {
      "title": "Check that a foreign token is rejected by the proxy",
      "detail": "Confirm the request does not simply reach Telegram and fail there."
    }
  ],
  "answer": [
    0,
    2,
    3
  ],
  "success": "You chose observable behavior. A configuration is a claim; a test checks whether that claim holds in this environment.",
  "lesson": "Build, lock, test. Repeat the tests after updates and configuration changes.",
  "why": [
    "Test both allowed behavior and forbidden behavior: blocked bad requests are not useful if every good request is broken too.",
    "A fast connection refusal can mean a packet reached the destination. The guide distinguishes it from the expected drop timeout.",
    "Passing this game is learning, not evidence that a real server is secure."
  ],
  "term": {
    "word": "Verification",
    "meaning": "Checking actual behavior against an expected result, rather than trusting a label, configuration, or promise."
  },
  "source": "s13",
  "reward": "Evidence seeker",
  "unlocks": [],
  "weight": 10,
  "challenge_type": "multi"
}

Build, lock, test. Repeat the tests after updates and configuration changes.
