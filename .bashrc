# ~/.bashrc: executed by bash(1) for non-login shells.

# Note: PS1 and umask are already set in /etc/profile. You should not
# need this unless you want different defaults for root.
# PS1='${debian_chroot:+($debian_chroot)}\h:\w\$ '
# umask 022

# You may uncomment the following lines if you want `ls' to be colorized:
# export LS_OPTIONS='--color=auto'
# eval "`dircolors`"
# alias ls='ls $LS_OPTIONS'
# alias ll='ls $LS_OPTIONS -l'
# alias l='ls $LS_OPTIONS -lA'
#
# Some more alias to avoid making mistakes:
# alias rm='rm -i'
# alias cp='cp -i'
# alias mv='mv -i'
alias mplay='omxplayer -o both'
alias getDrives='sudo blkid -o list -w /dev/null'
alias mountDrive='sudo mount -t ntfs-3g -o utf8,uid=pi,gid=pi,noatime'
removeIP() { mysql -u root -p conka -e "DELETE FROM allowed_ips WHERE ip=\"$1\""; }
getIPS() { mysql -u root -p conka -e 'SELECT * FROM allowed_ips'; }
addIP() { mysql -u root -p conka -e "INSERT INTO allowed_ips (ip, bypass) VALUES(\"$1\", \"$2\")"; }
alias chisaii='cp /home/pi/webtemplates/chisaii /home/pi/SimpleAPI/public/pages/suche.html'
alias kiai='cp /home/pi/webtemplates/kiai /home/pi/SimpleAPI/public/pages/suche.html'
alias ohana='cp /home/pi/webtemplates/ohana /home/pi/SimpleAPI/public/pages/suche.html'
alias liubice='cp /home/pi/webtemplates/liubice /home/pi/SimpleAPI/public/pages/suche.html'
alias nipponcon='cp /home/pi/webtemplates/nipponcon /home/pi/SimpleAPI/public/pages/suche.html'
alias animaco='cp /home/pi/webtemplates/animaco /home/pi/SimpleAPI/public/pages/suche.html'
alias default='cp /home/pi/webtemplates/default /home/pi/SimpleAPI/public/pages/suche.html'
alias einsong='cp /home/pi/webtemplates/einsong /home/pi/SimpleAPI/routes/wishlist/wishlistService.js'
alias zweisongs='cp /home/pi/webtemplates/zweisongs /home/pi/SimpleAPI/routes/wishlist/wishlistService.js'
alias dreisongs='cp /home/pi/webtemplates/dreisongs /home/pi/SimpleAPI/routes/wishlist/wishlistService.js'
alias whiteadmin='cp /home/pi/webtemplates/whiteadmin /home/pi/SimpleAPI/public/pages/admin.html'
alias darkadmin='cp /home/pi/webtemplates/darkadmin /home/pi/SimpleAPI/public/pages/admin.html'

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
