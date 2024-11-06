import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, window } from "./utils";

const RAYCAST_PREFIX = "raycast://extensions/raycast";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
    ],
  },
  ...createHyperSubLayers({
    spacebar: open(`${RAYCAST_PREFIX}/file-search/search-files`),
    x: open(`${RAYCAST_PREFIX}/clipboard-history/clipboard-history`),
    c: open(`${RAYCAST_PREFIX}/screenshots/search-screenshots`),
    d: {
      o: open("https://outlook.office.com/mail/inbox"),
      p: open("https://teladocpa-my.sharepoint.com/personal/sebastian_daza_teladochealth_com/"),
      k: open("https://adb-4022166418081681.1.azuredatabricks.net/"),
      m: open("https://mail.google.com"),
      l: open("https://keep.google.com/u/0/#home")
    },
    e: {
      g: app("Arc"),
      v: app("Visual Studio Code - Insiders"),
      r: app("Terminal"),        
      f: app("Finder"),
      t: app("Microsoft Teams"),
      k: app("FortiClient"),
      b: app("Spotify")
    },
    s: {
      k: open(`${RAYCAST_PREFIX}/system/open-camera`),
      p: open(`${RAYCAST_PREFIX}/raycast/confetti`),
      h: open(`${RAYCAST_PREFIX}/raycast-ai/ai-chat`),
      g: open(`${RAYCAST_PREFIX}/navigation/search-menu-items`),
      n: open(`raycast://extensions/raycast/raycast-notes/search-notes`),
      d: open(`raycast://script-commands/connect-azure-vpn`),
      f: open(`raycast://script-commands/disconnect-azure-vpn`),
      y: open(`raycast://script-commands/start-my-fav-db-cluster`),
      u: open(`raycast://script-commands/terminate-my-db-clusters`),
      i: open(`raycast://ai-commands/improve-writting-en`),
      j: open(`raycast://ai-commands/improve-writting-es`),
      b: open(`raycast://ai-commands/improve-my-code`),
      l: open(`raycast://extensions/marky/world-clock/index`)
    },
    w: {
      left_arrow: window(`${RAYCAST_PREFIX}/window-management/left-half`),
      right_arrow: window(`${RAYCAST_PREFIX}/window-management/right-half`),
      up_arrow: window(`${RAYCAST_PREFIX}/window-management/top-half`),
      down_arrow: window(`${RAYCAST_PREFIX}/window-management/bottom-half`),
      return_or_enter: window(`${RAYCAST_PREFIX}/window-management/maximize`),
      right_shift: window(`${RAYCAST_PREFIX}/window-management/next-display`),
    }
  }  
)];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
