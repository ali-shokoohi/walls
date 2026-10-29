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
      "detail": "A program should not run next to the bot’s memory, settings, or credentials.",
      "feedback": {
        "reason": "Without a separate execution environment, the hostile program can run beside the bot’s own state under the same permissions. Restricting the program’s network does not stop local file access.",
        "consequence": "The program could try to read conversations or alter writable memory in the Hermes home. Network isolation alone does not separate those local files."
      }
    },
    {
      "title": "No network access",
      "detail": "Do not give an untrusted program a route to the internet or the proxy.",
      "feedback": {
        "reason": "A separate workshop can still send information out if it has a network route. Separation of files does not itself prevent outgoing requests.",
        "consequence": "A hostile program could try to upload any accessible data or contact another service. A network-free workshop removes that route rather than relying on the program to behave."
      }
    },
    {
      "title": "Temporary writes that are discarded when the session ends",
      "detail": "Do not keep the program’s changes as permanent trusted state.",
      "feedback": {
        "reason": "If writes are kept permanently, an untrusted program can leave changes for future sessions. A session ending would not remove those changes.",
        "consequence": "A modified startup file or poisoned working file could be read on the next run. Discarding the session’s writes prevents that particular form of persistence."
      }
    },
    {
      "title": "A shared folder containing the bot’s settings and secrets",
      "detail": "Make every file available so the program never gets stuck.",
      "feedback": {
        "reason": "Mounting the bot’s settings and secrets into the workshop puts the protected valuables inside reach of the hostile program. Calling the environment a sandbox does not change the files it can access.",
        "consequence": "A program could read a mounted settings file, or change it if the mount is writable. The separate workshop would no longer keep those bot files out of reach."
      }
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
