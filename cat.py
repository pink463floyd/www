print("begin cat")

filenames = ['/home/slarribeau/www/controllers.1.js', '/home/slarribeau/www/controllers.2.js', '/home/slarribeau/www/controllers.3.js']
with open('/home/slarribeau/www/controllers.js', 'w') as outfile:
    for fname in filenames:
        with open(fname) as infile:
            outfile.write(infile.read())

print("end cat")

