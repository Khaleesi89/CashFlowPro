# CashFlowPro


Materia: Trabajo Final : desarrollo de una app web

Alumna: Klimisch Marcia

Carrera: Tecnicatura Universitaria en Desarrollo Web

Año : 2023



Comandos:

1) crear base de datos con nombre          cashflowpro
2) al tener bajado el repo, entrar a Frontend con :         cd Frontend
3) ejecutar           npm install
4) luego hacer cd..  para subir una carpeta y luego poner     cd Back
5) ejecutar      composer update
6) en el archivo .env poner el nombre de la base de datos
7) para realizar migraciones usamos     php artisan migrate
8) para realizar las ejecuciones de los seeders       php artisan db:seed
9) para ejecutar el backend se usa        php artisan serve
10) para ejecutar el frontend se usa       npm run dev
11) para ejecutar el backend se usa (en una terminal diferente a la anterior)       php artisan serve

tener en cuenta que si en algún momento la app tiene dificultades y no renderiza correctamente puede hacer:

php artisan cache:clear
php artisan view:clear

si persiste el problema, deberá realizar migraciones y seeders nuevamente

