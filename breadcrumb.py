import uuid

unique_filename = uuid.uuid4()
with open('/home/slarribeau/www/tmp/'+ unique_filename.bytes, 'w') as outfile:
     outfile.write("python was here");
