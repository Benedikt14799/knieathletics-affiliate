# Brevo (früher Sendinblue) Formular & Automations-Setup

Diese Anleitung zeigt dir exakt, wie du in Brevo die Lead-Generierung für das *KNIEATHLETICS Reha-Programm* einrichtest und mit der von mir gebauten `LeadForm.astro` Komponente verbindest. Es dauert ca. 10-15 Minuten.

---

## Schritt 1: Kontaktliste für Leads anlegen
Zuerst brauchen wir einen "Sammelbehälter" für die Formular-Daten.
1. Logge dich in [Brevo](https://www.brevo.com/de/) ein.
2. Gehe in der Navigation links auf **Kontakte** > **Listen**.
3. Klicke auf "Liste hinzufügen".
4. Nenne sie z.B. **KNIEATHLETICS Leads**.

---

## Schritt 2: Formular erstellen (für den Action Endpoint)
Damit unser HTML-Formular funktioniert, müssen wir in Brevo ein leeres technisches Formular erstellen, das uns lediglich die Ziel-URL generiert.
1. Gehe in der Navigation auf **Kontakte** > **Formulare**.
2. Klicke auf **Neues Formular erstellen** (Abonnement Formular).
3. **Schritt: Aufbau** (Design ist egal, da wir unser eigenes Astro-Formular nutzen!):
   - Füge auf jeden Fall die Felder hinzu, die in unserer `LeadForm.astro` stehen:
     - `VORNAME` (Typ: Text)
     - `NACHNAME` (Typ: Text)
     - `EMAIL` (Typ: Email)
     - `TELEFON` (Typ: Telefon/Text oder SMS-Attribut)
     - `VERLETZUNG` (Typ: Dropdown/Auswahl)
     - `MESSAGE` (Typ: Text/Freitext)
     - `DSGVO` (Typ: Bestätigungsfeld / Checkbox)
   *(Tipp: Lege diese Kontakt-Attribute in Brevo unter "Kontakte > Einstellungen > Kontaktattribute" an, falls sie noch nicht existieren).*
4. **Schritt: Listen**
   - Wähle hier zwingend die Liste **"KNIEATHLETICS Leads"** (aus Schritt 1) aus.
5. **Schritt: Bestätigung (Double Opt-In einrichten!)**
   - **Ganz wichtig für DSGVO:** Aktiviere hier **Double-Opt-In**.
   - Wähle das Standard-Bestätigungstemplate ("Double Optin Confirmation") aus oder erstelle dir ein eigenes ("Bitte bestätige deine E-Mail für die Erstberatung").
   - **Cashback-Anleitung für die E-Mail:** Ändere den Betreff und den Body der Vorlage in Brevo, sodass der Text den 200€ Cashback erwähnt:
     - **Betreff:** `Deine Anfrage bei Benedikt Faude – + dein 200 € Cashback ist vorgemerkt`
     - **Textinhalt:** Teile dem User mit, dass die Anfrage bestätigt ist und weise darauf hin: *"Nach Programmstart melde dich kurz bei mir per E-Mail mit deiner Buchungsbestätigung von KNIEATHLETICS – ich überweise dir dann 200 € direkt. Meine E-Mail lautet: [DEINE_EMAIL_HIER_EINTRAGEN]."*
   - Du kannst hier auch eine URL eintragen, auf die der User nach dem Klick im E-Mail-Postfach geleitet wird (z.B. zurück zu deiner Seite).
6. **Schritt: Teilen (Die Action URL holen)**
   - Wenn das Formular gespeichert ist, klicke auf "Teilen" und wähle **HTML**.
   - Kopiere im dort angezeigten Quelltext den Link, der bei `<form action="..."` steht. Er beginnt meist mit `https://[hash].sibforms.com/serve/...`

### Code-Integration in Astro
1. Öffne im VS Code die Datei `src/components/LeadForm.astro`.
2. Ganz oben in Zeile 5 siehst du: `const ACTION_URL = "HIER_URL_EINTRAGEN";`
3. Ersetze `"HIER_URL_EINTRAGEN"` mit dem exakten Link aus Brevo.

> **Wichtig:** Achte darauf, dass die `name=""` Attribute in `LeadForm.astro` exakt mit den in Brevo angelegten Attributnamen übereinstimmen (z.B. `name="VORNAME"` in der Datei muss in Brevo das Attribut `VORNAME` sein).

---

## Schritt 3: Automatisierung = Benachrichtigung an Dich
Sobald ein Lead bestätigt hat, möchtest du eine E-Mail bekommen.
1. Gehe in der linken Navigation in Brevo auf **Automations**.
2. Klicke **Workflow erstellen** > **Benutzerdefinierter Workflow**.
3. **Trigger / Einstiegspunkt:**
   - Wähle: Kontaktaktivität > Kontakt wird zu Liste hinzugefügt.
   - Wähle die Liste **"KNIEATHLETICS Leads"** aus.
4. **Aktion hinzufügen:**
   - Klicke auf das **+** Symbol unter dem Einstiegspunkt.
   - Wähle **Benachrichtigung senden** (Senden Sie sich selbst oder Ihrem Team eine E-Mail).
   - Hinterlege deine E-Mail-Adresse (benedikt@...).
   - Wähle "Standard-Template" oder richte dir eine Mail sein, die via Platzhalter (z.B. `{{ contact.VORNAME }}`) direkt die Daten anzeigt.

Das war's!
1. Nutzer füllt Astro aus.
2. Brevo fängt es ab und triggert DSGVO Bestätigungsmail.
3. Nutzer klickt in seiner Mail.
4. Er landet in der Liste "KNIEATHLETICS Leads".
5. Du bekommst vom Automations-Workflow direkt die Lead-E-Mail und kannst diese an das Reha-Zentrum weitergeben.
