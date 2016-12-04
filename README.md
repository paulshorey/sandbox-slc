"npm install" then "gulp" to start the server, lint, and restart the server on file changes  
or for production environment "bash _cron/www.sh"  
  
(づ｡◕‿‿◕｡)づ  
  
(▰˘◡˘▰)  
  
(✿◠‿◠)  
  
(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧  
  
✌.ʕʘ‿ʘʔ.✌  
  
◎[▪‿▪]◎  
  
（ミ￣ー￣ミ）  
  
(●´ω｀●)  
  
!!!   
  
  


*** SSL CERTIFICATE + NGINX PROXY SERVER ***


https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-14-04#step-2-—-obtain-a-certificate


vim /etc/nginx/sites-available/default
server {
        listen 80;
        listen [::]:80;

        listen 443 ssl;
        listen [::]:443 ssl;

        #root /www/html;
        #index index.html index.htm index.nginx-debian.html;

        ssl_certificate /etc/letsencrypt/live/sslcs.us/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/sslcs.us/privkey.pem;

        location ~ /html {
                root /www; #this will serve from /www/html
                allow all;
        }

        location ~ /.well-known {
                root /www/html;
                allow all;
        }
        location ~ /.well-known/acme-challenge {
                root /www/html;
                allow all;
        }

        location / {
                proxy_set_header   X-Forwarded-For $remote_addr;
                proxy_set_header   Host $http_host;
                proxy_pass         "http://127.0.0.1:2080";
        }

        location /api {
                proxy_set_header   X-Forwarded-For $remote_addr;
                proxy_set_header   Host $http_host;
                proxy_pass         "http://127.0.0.1:1080";
        }

}


// comment out  ssl_certificate lines in above file below running this:
sudo certbot-auto certonly -a webroot --webroot-path=/www/html -d sslcs.us -d www.sslcs.us


// then run this weekly:
sudo /opt/letsencrypt/letsencrypt-auto renew
/etc/init.d/nginx reload