# attempt to renew SSL before messing with port :80
# /opt/letsencrypt/letsencrypt-auto renew
# /etc/init.d/nginx reload


# start app
iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 1080
#iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 1080
ufw allow 80/tcp
ufw allow 443/tcp

eval "$(ssh-agent -s)"
ssh-add ~/.ssh/ps1-git
cd /www/sand-slc
git reset HEAD -\-hard;
git pull

i=0;
# while true; do
# 	i=$[$i+1]
# 	echo node www.js \#$i
# 	node www.js
# 	sleep 5
# done