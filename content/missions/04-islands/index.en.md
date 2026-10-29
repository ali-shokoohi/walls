{
  "id": "islands",
  "chapter": "Build the boundaries",
  "title": "One island per friend",
  "goal": "Keep one friend’s trouble from spreading to another.",
  "scene": "Reza and Sina will both use a bot. You are arranging their homes and connections. Convenience is tempting, but you want separate failure zones.",
  "speaker": "Sina",
  "message": "If Reza’s bot gets taken over, can it get to my conversations?",
  "task": "Choose the layout that best contains a compromise.",
  "options": [
    {
      "title": "One shared bot process and one shared folder",
      "detail": "Put each friend’s name on a different chat.",
      "feedback": {
        "reason": "Chat names are not access controls on a shared process or folder. A takeover of that process can expose whatever data the process can read, regardless of which chat it belongs to.",
        "consequence": "A compromised shared bot could read Sina’s stored conversations while acting through Reza’s chat, because both use the same accessible storage."
      }
    },
    {
      "title": "Two profile folders on an otherwise shared system",
      "detail": "Different folder names should be the whole boundary.",
      "feedback": {
        "reason": "Separate profile folders organize state, but folder names alone do not restrict operating-system access. A compromised process may still have permission to read both profiles.",
        "consequence": "If Reza’s process can open Sina’s profile directory, it can read Sina’s data without changing its own profile name or joining Sina’s chat."
      }
    },
    {
      "title": "Separate isolated instances, networks, and proxies",
      "detail": "Each friend has their own environment and restricted routes."
    }
  ],
  "answer": [
    2
  ],
  "success": "Separate islands limit the paths between friends. Labels and profile folders alone do not stop a compromised process from reaching the operating system.",
  "lesson": "Separate environments are the boundary; separate names are not.",
  "why": [
    "Incus creates isolated environments. Unprivileged containers use restricted identities on the host.",
    "Containers still share a kernel. When available and correctly configured, virtual machines add a separate kernel and a hardware virtualization boundary.",
    "The guide also separates each friend’s bridge and proxy rather than treating a shared network as safe."
  ],
  "term": {
    "word": "Isolation",
    "meaning": "A technical boundary that restricts what one environment can access in another."
  },
  "source": "s8",
  "reward": "Island builder",
  "unlocks": [
    "Isolation"
  ],
  "weight": 4,
  "challenge_type": "choice"
}
