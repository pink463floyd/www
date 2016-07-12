#docker build -t slarribeau/sm_front_end .
#docker run --name smfe -d -p 8080:80 slarribeau/sm_front_end

FROM nginx:1.10
COPY bbb.html           /usr/share/nginx/html/index.html
COPY mystyle.css        /usr/share/nginx/html
COPY yellow_MarkerC.png /usr/share/nginx/html
COPY bus_logo.png       /usr/share/nginx/html

