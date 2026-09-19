# Dmei-Kiss, standalone app

Same shape as TidyTime. Firebase Firestore for the data, GitHub Pages for the app, installed on each phone from the browser.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole app. The only file you edit. |
| `manifest.webmanifest` | Makes it installable, sets the name and icon |
| `sw.js` | Offline cache, so it opens with no signal |
| `icon-512.png` `icon-192.png` `icon-180.png` `icon-32.png` | App icons |
| `icon.svg` | Source of the icon, if you ever want it changed |
| `firestore.rules` | Paste into Firebase, Firestore, Rules |

All files go in the same folder. No build step, no npm, nothing to compile.

## 1. Firebase

1. Firebase console, Add project. Call it `dmei-kiss`. Analytics off.
2. Build, Firestore Database, Create database. Start in production mode, pick a region near you, `europe-west2` is fine.
3. Rules tab, paste everything from `firestore.rules`, Publish.
4. Project settings, Your apps, Web, register the app. Copy the config object.
5. Open `index.html`, find the block near the top marked PASTE YOUR FIREBASE CONFIG HERE, replace the six values. That is the only edit in the whole file.

## 2. GitHub Pages

1. New repo, `dmei-kiss`, public.
2. Upload all the files above into the root.
3. Settings, Pages, Source: Deploy from a branch, `main`, `/ (root)`, Save.
4. A minute later it is live at `https://<your-user>.github.io/dmei-kiss/`

## 3. First open

The first phone to open it writes your current data into Firebase automatically: both girls' ledgers, the task list, Yuli's ₪140 payday, the three registrations, and the two profile photos. It only does this if the database is completely empty, so it can never overwrite anything later.

Liv and Yuli's phones will recognise them from their old registration, so they should not have to set up again, but if a phone does show the setup card they just type their name exactly as before and everything comes back.

## 4. Install on the phones

- iPhone: open the link in Safari, Share, Add to Home Screen
- Android: open in Chrome, menu, Install app

It then runs full screen with the pocket icon and no browser bars.

## When you change something later

Upload the new `index.html`, then bump the version line at the top of `sw.js`, for example `dmeikiss-v17` becomes `dmeikiss-v18`. Without that bump the phones keep serving the cached old copy.

## Worth knowing

**Location now works.** It was blocked before because the app ran inside a frame. On your own HTTPS domain the phone will ask once and then every tick gets a real position, so the at home and distance chips come alive.

**Anyone with the link can use it.** There is no sign in, same as TidyTime before you added the PIN. Keep the URL in the family. When you want the parent PIN, it is a small job.

**The artifact and this app are separate.** They do not sync. Once this one is running, stop ticking in the artifact or you will split the history.

**Photos** are still stored in the database as compressed images and still clear themselves after 7 days. Firebase's free tier handles that size easily.
