# Deployment

- Signup on AWS
- Launch instance (create a EC2 instance)
- chmod 400 <secret>.pem (This is the key to enter machine)
- ssh -i "devTinder-secret.pem" ubuntu@ec2-3-27-8-31.ap-southeast-2.compute.amazonaws.com
- install node version v22.15.1 (because same version while developing)
- git clone backend and frontend from github
- frontend

  - install dependencies using npm
  - run npm run build (dist folder created)
  - install ngnix(provides you web server, you can host the application) - sudo apt update (to update your machine) - sudo apt install nginx (install nginx) - sudo systemctl start nginx (start nginx) - sudo systemctl enable nginx (to and run nginx) - sudo scp -r dist/\* /var/www/html/ - Copy code from dist(build files) to /var/www/html (We are copy our dist to html folder) - Enable port 80 of you instance (In AWS go to instance -> Security -> Security groups)
    -Backend - update DB password - allowed ec2 instance public IP on mongodb server - npm install pm2 -g

    - pm2 start npm -- start - commands available(pm2) - pm2 list, pm2 flush <name>, pm2 stop <name>, pm2 delete <name>
    - config nginx - /etc/nginx/sites-available/default
    - restart nginx - sudo systemctl restart nginx
    - Modify the BASEURL in frontend project to "/api"

      Frontend = http://3.27.8.31/
      Backend = http://3.27.8.31:3000/

      Domain name = devtinder.com => 3.27.8.31

      Frontend = devtinder.com
      Backend = devtinder.com:7777 => devtinder.com/api

      server {
      listen 80;
      server_name example.com;

      # Frontend/static site

      location / {
      root /var/www/html;
      try_files $uri $uri/ /index.html;
      }

      # Proxy /api to Node.js app

      location /api/ {
      proxy_pass http://127.0.0.1:3000/;

           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection "upgrade";

           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;

      }

    }
