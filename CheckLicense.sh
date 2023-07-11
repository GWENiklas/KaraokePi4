md5=($(md5sum /sys/class/net/eth0/address))
mac=($(cat /sys/class/net/eth0/address))
echo $md5$mac
