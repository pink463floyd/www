#!/bin/bash
# Proper header for a Bash script.
source /home/slarribeau/www/vp27/bin/activate
python /home/slarribeau/www/scrape.py > /home/slarribeau/www/controllers.2.js
python /home/slarribeau/www/cat.py
