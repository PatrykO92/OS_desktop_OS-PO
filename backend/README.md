# OS PO® Operating System - Patryk Orlowski - Backend

The backend has been constructed using Django and features a REST API.

## Running the App

### 1) Environment Setup - Ensure you have Python installed on your system.

### 2) Add .env file with those variables

- DJANGO_SECRET_KEY

Create or use you own email:

- EMAIL_HOST ="eg.smtp.gmail.com"
- EMAIL_HOST_USER ="eg.email@gmail.com"
- EMAIL_HOST_PASSWORD ="eg.asdasasdasdk"

Create account at https://neon.tech/ and add correct values:

- DB_ENGINE="eg.django.db.backends.postgresql"
- DB_NAME="eg.DataBASEName"
- DB_USER="eg.UserName"
- DB_PASSWORD="eg.Pasword1234"
- DB_HOST="eg.ep-restless-water-5123123.eu-central-1.aws.neon.tech"
- DB_PORT="eg.5432"

Create an account at https://newsapi.org/ and add the key:

- NEWS_API_KEY="eg.password1234"

Create an account at www.dropbox.com and add keys:

- DROPBOX_APP_KEY
- DROPBOX_APP_SECRET

You also need this dropbox refresh token:

- DROPBOX_APP_REFRESH_TOKEN

Here in comment is solution, step-by-step, how to get it [https://www.dropboxforum.com/t5/Dropbox-API-Support-Feedback/Get-refresh-token-from-access-token/td-p/596739]

### 3) Instal and activate Virtual Environment

- python -m venv venv
- activate virtual env by using correct script
- pip install -r requirements.txt
- python manage.py makemigrations
- python manage.py migrate

### 4) Run the Development Server:

python manage.py runserver

## Dependencies

- Django
- djangorestframework
- psycopg2-binary
- Pillow
- requests
- oauthlib
- dropbox
- django-allauth
- django-cors-headers

## TODO

1. **FIX BUGS**
2. Edit password reset template
