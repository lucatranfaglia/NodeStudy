# Plugin vs studio code
Live Server

# OpenWeatherMap (API)
https://home.openweathermap.org/
cose.grandi // S89

# Install Node with NVM
https://github.com/nvm-sh/nvm

nvm install --lts (installa l'ultima versione LTS - Long Term Support)
nvm use 12 (versione che si vuole usare)

# Package (https://docs.npmjs.com/files/package.json)

# The semantic versioner for npm (https://docs.npmjs.com/misc/semver.html)
per verificare il tipo di versione da acquisire andare su npm->semver
< , <=, >, =>, =
>=1.2.3 
>=1.2

# Caret Ranges
qualunque cambiamento che non modifichi il numero che non sia zero [major, minor, patch]
1.0.0 => cambia il minor e la patch
0.1.0 => cambia major e la patch

# tilde ranges 
Consente modifiche a livello di patch se una versione secondaria è specificata nel comparatore. In caso contrario, consente modifiche di livello minore.
tilde: permette di aggiorna 
~1.2.3 := >=1.2.3 <1.(2+1).0 := >=1.2.3 <1.3.0
~1.2 := >=1.2.0 <1.(2+1).0 := >=1.2.0 <1.3.0 (Same as 1.2.x)
~1 := >=1.0.0 <(1+1).0.0 := >=1.0.0 <2.0.0 (Same as 1.x)

# librerie LODASH 
manipolare oggetti o array o collection
npm update lodash
