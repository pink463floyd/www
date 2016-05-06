
print("begin cat")
filenames = ['/home/slarribeau/ftp/controllers.1.js', '/home/slarribeau/ftp/controllers.2.js', '/home/slarribeau/ftp/controllers.3.js']
with open('/home/slarribeau/ftp/controllers.js', 'w') as outfile:
    for fname in filenames:
        with open(fname) as infile:
            outfile.write(infile.read())

print("end cat")

