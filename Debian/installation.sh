#!/bin/bash

apt update && apt upgrade -y

apt install -y vim curl wget git ufw

apt install -y docker.io docker-compose

timedatectl set-timezone Europe/Paris

ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 2356/tcp
ufw enable

read -p "Entrez le nom du nouvel utilisateur: " username
adduser $username
usermod -aG sudo $username

sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl restart ssh

apt install -y fail2ban

cat <<EOF > /etc/fail2ban/jail.local
[sshd]
enabled = true
port = ssh
logpath = %(sshd_log)s
bantime = 3600

[mariadb
enabled = true
port = 2356
filter = mariadb
logpath = /var/log/mysql/error.log
maxretry = 3
EOF

cat <<EOF > /etc/fail2ban/filter.d/mariadb.conf
[Definition]
failregex = ^.*Access denied for user .*@'<HOST>' .*
ignoreregex =
EOF

systemctl restart fail2ban

apt autoremove -y
apt clean

reboot