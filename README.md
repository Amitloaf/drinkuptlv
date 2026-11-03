# Gamedev Drinkup TLV site

Files: index.html, style.css, script.js, config.js (event + links), i18n.js (English/Hebrew text), images/

## Updating
- Next event, RSVP links and community links: edit **config.js**.
- Wording in English or Hebrew: edit **i18n.js**.
- New event: replace images/cover.jpg with the new cover (2:1, e.g. 1200x600) and update config.js.
- Photos: images/photo-1.jpg ... photo-5.jpg (photo-1 is the big one).
- Hebrew link: https://www.gamedevdrinkuptlv.com/?lang=he (the switch button remembers each visitor's choice).

## Hosting (free): GitHub Pages
1. Repo on GitHub with these files at its root, plus a file named CNAME containing: www.gamedevdrinkuptlv.com
2. Repo Settings > Pages > Deploy from branch: main, / (root). Set custom domain www.gamedevdrinkuptlv.com, tick Enforce HTTPS once available.
3. GoDaddy > My Products > Domains > DNS for gamedevdrinkuptlv.com:
   - CNAME  www  -> <github-username>.github.io
   - A      @    -> 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 (four records; delete GoDaddy's existing @ A record "Parked")
   DNS takes from minutes to a few hours. HTTPS certificate follows automatically.
