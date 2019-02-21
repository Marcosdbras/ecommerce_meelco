#!/bin/bash

DATA=`date +%Y-%m-%d`
DIR_BACKUP="/var/www/html/bkp"

mysqldump -u admin -p904gi7WxDl bd_meelco > $DIR_BACKUP/$DATA-bd_meelco.sql
