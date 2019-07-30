### Instalaciones necesarias 

* **Docker version 18.09.8**         o Superior 
* **Docker-compose version 1.24.0**  o Superior
* **Node Version v11.15.0**          o Superior
* **yarn Version 1.17.3**            o Superior

### Pasantes.do

instalar servicio de mongo
```
docker-compose up -d --build
```

instalar dependecias
```
yarn install
```

Correr en desarrollo
```
yarn dev
```

Correr en Produccion
```
yarn start
```