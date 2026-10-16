# Apps von Dorent Azemi

Öffentliche Entwicklerwebsite: https://rasalghulgaming.github.io/app-recht/

Statische Website ohne Build-Schritt, externe Schriftarten oder neue Laufzeit-Abhängigkeiten. GitHub Pages veröffentlicht `main` aus dem Root-Verzeichnis.

## Inhalte pflegen

- `index.html`: App-Übersicht, Kontakt und die bestehenden Rechtstexte.
- `styles.css`: gemeinsame Gestaltung und responsive Ansichten.
- `navigation.js`: öffnet eingeklappte Rechtstexte bei Aufruf bestehender Anker-URLs.
- `privacy-ura.html` und `impressum.html`: bisherige eigenständige Dokumente mit unveränderten URLs.
- `assets/`: App-Icons und Shapey-Store-Vorschau aus den öffentlichen Apple-Store-Einträgen (abgerufen am 16.10.2026).

Die fünf iOS-Apps wurden mit Apples öffentlicher Entwicklerliste abgeglichen. Die bereits vorhandene IM Elektro Lernapp bleibt als sechster Eintrag erhalten. Google-Play-Links sind nur für die beim Abruf erreichbaren Einträge Ura, EBT und SimpleChess enthalten.

Bei neuen Apps Karte und Datenschutzlink ergänzen. Bestehende IDs wie `simplechess-datenschutz`, `im-elektro`, `ebt-impressum` und `iegs-datenschutz` erhalten: Store-Einträge und Apps verlinken direkt darauf. Rechtliche Inhalte wurden beim Design-Update nicht überarbeitet.

## Lokal ansehen

Im Repository `python -m http.server 8765 --bind 127.0.0.1` ausführen und http://127.0.0.1:8765/ öffnen.
