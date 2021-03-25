FROM node:14 
#Aqui le digo a docker que version de node voy a ocupar

WORKDIR /usr/src/app 
#Aqui le digo a docker donde va estar guardando mi aplicacion
#opt/app

COPY package*.json ./ 
#copia los package y muevelos al WORKDIR

RUN npm install 
#aqui instalo todas las dependencias de mi proyecto

RUN npm install nodemon -g
#instalando de manera global ndoemon

COPY . . 
#voy a copiar el resto de los archivos al WORKDIR

EXPOSE 3000
#Expone(abre el puerto) por el puerto para que te puedas conectar

CMD ["nodemon","-L" ,"--watch",".","server.js"]
#L-- polling to watch for changes
#ejecutar el comando node server.js como si se escribiera en la consola, se cambio node for nodemon