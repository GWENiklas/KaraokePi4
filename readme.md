# KaraokePi4<br>
Raspberry PI Karaoke System with WebUi and Wishlist<br>
<br>
Willkommen zum Github-Repository des Conka Karaoke Systems.<br>
Das System ist auf einem Raspberry Pi 3 entstanden, um Karaoke Songs von einer Festplatte zu scannen und in eine Datenbank zu laden.<br>
Diese wird wiederum von dem SimpleAPI NodeJS Programm genutzt, um eine Songsuche, sowie eine Administrationsseite zur verfügung zu stellen, um auf Events das Karaoke zu steuern.<br>
Das System nutzt dazu den mplayer / omxplayer des Raspberrys.<br>
Da dieser nicht mehr weiterentwickelt wird, ist dieses Repository eine Entwicklungsumgebung, um zu einem neueren Player zu wechseln.<br>
Das System nutzt nun den VLC Player um auch neuere Videos abzuspielen.<br>
<br>
Das System lässt sich mit node /home/pi/SimpleAPI/app.js starten.<br>
Die Ports 80 und 443 müssen dazu verfügbar sein.<br>
Die Karaoke Lieder liegen unter <b>/media/Kara</b><br>
Die Datenbank heißt conka und hat den Login root/karaoke unter localhost.<br>
<br>
<br>
Installation des Systems:<br>
<br>
1: Repository klonen auf /home/pi/<br>
2. Installation von Mariadb-server mit root/karaoke Zugang<br>
3. Installation von Node<br>
4. Hinzufügen des init.d Scripts unter /etc/init.d/karaoke<br>
5. Hinzufügen des MoTDs unter /etc/motd<br>
6. Hinzufügen des CheckLicense Scriptes unter /usr/share/Karaoke/CheckLicense.sh<br>
7. Erstellung und hinzufügen einer Song-Liste unter /media/Kara/ mit dem Tool ./createSonglist und einem Ordner /media/Kara/songLists/<br>
8. Importierung der Songs anhand der importsongs.txt Anleitung<br>
9. Starten und aktivieren des Systems mit systemctl enable karaoke / systemctl start karaoke<br>
10. Öffnen der Suche unter http://IP/#/suche <br>
11. Aktivierung des Adminanlernmodus durch die Alias Befehle in der .bashrc.<br>
12. Öffnen der Admin Seite unter http://IP/#/admin<br>
<br>

<b>Bekannte Bugs:</b><br>
- Beim Hochladen von Songs über die Administrations Seite wird die länge des Liedes durch ffmpeg nicht ermittelt, wenn sich ein Leerzeichen im Namen befindet. Hierzu muss wohl ein neues ffmpeg modul installiert werden.<br>
- Das System stürtzt nach 24 Stunden ungefähr ab. Hierzu prüfen wir aktuell die nodejs Fehlerausgabe.<br>
<br>
<b>Gewünschte Funktionen:</b<br><br>
- Werden in Zukunft besprochen.
