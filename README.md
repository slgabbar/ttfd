# Take That For Data
Take That For Data is a web application built using the Django web framework, that allows users to scout basketball games in real time, and record advanced statistics. 

### Setup Instructions:

- This project currently requires postgresql to be installed on your local machine.After installing postgresql navigate to the  postgres shell and run:

  CREATE USER myuser WITH PASSWORD 'mypass';\
  CREATE DATABASE ttfd_db;\
  GRANT ALL PRIVILEGES ON DATABASE ttfd_db to myuser;
  
  This will create the database used by our django project. To use a different user or password, you must update the database settings in mysite/mysite/settings.py
  
  
- After succesfully installing postgres and creating database, clone the repo and install packages in requirements.txt:

  pip install -r requirements.txt
  
  ## Running the app:
  - Before starting the app you must apply migrations, and create a superuser
  
    python manage.py migrate
    python manage.py createsuperuser
    
 - Finally, start the application with 'python manage.py runserver'. To view the admin page navigate to http://127.0.0.1:8000/admin/
  
  
  

