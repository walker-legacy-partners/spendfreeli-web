# .well-known files — placeholders to replace before magic links work

Two files in this directory carry placeholder values that MUST be filled
in before Android App Links / iOS Universal Links open the SpendFreeli
app instead of the browser.

## `assetlinks.json` — Android App Links

Replace the string `PLACEHOLDER_SHA256` with the actual SHA-256 signing
fingerprint from EAS.

Get the fingerprint from Expo Application Services:

```
eas credentials
# → select Android → production → keystore → show signing key SHA-256
```

Then Google's assetlinks validator:
<https://developers.google.com/digital-asset-links/tools/generator>

## `apple-app-site-association` — iOS Universal Links

Replace `PLACEHOLDER_TEAM_ID` with the Apple Developer Team ID (a
10-character alphanumeric string, e.g. `A1B2C3D4E5`).

Find it in <https://developer.apple.com/account> → Membership → Team ID.

Then Apple's AASA validator:
<https://branch.io/resources/aasa-validator/>

## Vercel serving

`vercel.json` sets:

- `Cache-Control: public, max-age=3600` on both files (short TTL so a
  fingerprint update propagates within an hour).
- `Content-Type: application/json` on `apple-app-site-association`
  (Apple requires JSON content-type; the file intentionally has no
  extension per Apple's spec).
