## LES MEG

### Kom i gang
```
npm install
npm run dev
```

Du kan oppleve å få følgende feil første gangen du kjører `npm run dev`
```
Electron failed to install correctly, please delete node_modules/electron and try installing again
```

Det mangler mest sannsynlig `path.txt` fra ELectron, det kan du fikse ved å kjøre følgende:
```
node node_modules/electron/install.js
```

[Lenke til GitHub-issue for fix](https://github.com/electron/electron/issues/20731#issuecomment-546616376)

### Script
Lokal utvikling med hot reloading `npm run dev` 

Bygge: `npm run build` 

### Utvikling
For å redigere UI er det bare å endre i `/src` slik du ville gjort i hvilken som helst annen React-app \\
For å gjøre behind-the-scenes endringer (som å interagere med hardware) redigerer du i `/electron` mappen (tror jeg)
Les deg opp på doc på electron arkitektur [her](https://www.electronjs.org/docs/latest/tutorial/process-model)

## Kjøretidsmiljø på Raspberry-PI
`armv7l`-image som genereres av `npm run build-pi` må kopieres over til skrivebordet på raspberry PI.

Dette finner du under `release/0.0.1`-mappen.

Det samme gjelder python scriptet som ligger under `embedded/pi-listener.py` (om det ikke ligger der fra før).
Dette pleier vi å gjøre vha. en minnepenn. 

**NB! Pass på at de nye filene er gjort executable for alle brukere**


Python scriptet er nødvendig for at de fysiske knappene på skjermplaten skal fungere.
PI-en er nå konfigurert for å starte både python-scriptet og electron-appen ved oppstart.

### Konfigurere PI til å starte applikasjonen ved oppstart
Skal du legge til flere ting som skal starte ved oppstart må det legges inn i `~/.config/lxsession/LXDE-pi/autostart`.
For at dette skal fungere må du passe på at disse filene er "executable".
Se [denne guiden](https://forums.raspberrypi.com/viewtopic.php?t=294014) for mer informasjon. 

### Håndtering av highscore-lister
Highscore-listene legges på relativ filsti, altså er det relevant hvor appen startes fra.
Ved autostart vil filene legges i home-mappen til brukeren (den heter mini på PI-en vi bruker per 2024).

Slik vi har gjort det med premiering er at vi kjører `head pin.csv` fra home-mappen for å hente ut de øverste highscorene (listene er sortert).

Når man skal resette scoreboardet kan man bare flytte highscore-filen til en annen mappe eller slette den.
Slik det er gjort på JZ23 og -24 har de blitt lagt inn i `oldscores`- og `2024oldscores`-mappene.

Deretter kjører vi `reboot` i terminalen for å resette. Programmet er laget sånn at dersom filene ikke finnes så vil de bli opprettet,
så du trenger ikke opprette disse manuelt. **Ikke start programmet manuelt selv igjen, da blir den relative filstien feil**


## Notater
### Konsept:
1. Brukerregistrering: Brukernavn
2. Meny: x valg av spill, bruker piltastene rundt minibankskjermen

#### Spillene:
1. Betale faktura: KID-nummer og kontonummer
2. Chrome dino (spillet når man ikke har internett) -> På vei til banken
3. Quiz om bank 
4. Whackamole med knappene på minibanken: Knappene lyser opp også må du trykke før de slutter å lyse igjen
5. Oppdatere passord: Passwordgame
6. Få ny pin-kode 
 
