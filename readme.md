## LES MEG

### Script
Lokal utvikling med hot reloading `npm run dev` 

Bygge: `npm run build` 

### Utvikling
For å redigere UI er det bare å endre i `/src` slik du ville gjort i hvilken som helst annen React-app \\
For å gjøre behind-the-scenes endringer (som å interagere med hardware) redigerer du i `/electron` mappen (tror jeg)
Les deg opp på doc på electron arkitektur [her](https://www.electronjs.org/docs/latest/tutorial/process-model)


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
 
