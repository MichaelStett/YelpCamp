# docker kill $(docker ps -a -q) # Shut down all continers 
docker rm $(docker ps -a -q) # Remove all continers 
# docker rmi $(docker images -q) # Remove all images
docker build -t michaelstett/yelpcamp .
docker run -p 49160:8080 -d michaelstett/yelpcamp
