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
      "detail": "Verify that the enforced network boundary blocks it, even as instance root.",
      "feedback": {
        "reason": "Without trying a forbidden connection, you have not tested whether the network restriction is actually enforced. A configuration can exist without being applied to the right instance.",
        "consequence": "A missing or misapplied rule could leave direct internet access open while the setup screen still says ‘Secure.’ A negative connection test checks that claim."
      }
    },
    {
      "title": "Ask the bot whether it is secure",
      "detail": "Treat its answer as a complete security audit.",
      "feedback": {
        "reason": "The bot’s answer is another statement produced by the system being assessed. It does not observe or prove all the operating-system and network boundaries.",
        "consequence": "The bot could say ‘I am secure’ while a firewall rule is missing or a tool runs in the wrong environment. The reassuring answer would still appear even though the boundary had failed."
      }
    },
    {
      "title": "Check where tool actions actually execute",
      "detail": "Prove they reach the sandbox, not the bot’s own home.",
      "feedback": {
        "reason": "A configured backend does not prove where every tool executes. Some tools may use a different execution path from terminal commands.",
        "consequence": "A file tool could run in the Hermes instance and reach its state even though a terminal command reaches the sandbox. Testing the actual location catches that mismatch."
      }
    },
    {
      "title": "Check that a foreign token is rejected by the proxy",
      "detail": "Confirm the request does not simply reach Telegram and fail there.",
      "feedback": {
        "reason": "Without testing a foreign token, a domain allowlist may look correct while still permitting the wrong account’s requests to pass through.",
        "consequence": "A foreign request could reach Telegram and return 401 there. That is not proof that the proxy rejected it before it reached Telegram; the credential boundary needs its own test."
      }
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
