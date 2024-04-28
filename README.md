### Run this project yourself

* Clone the repository
* Run: npm install - this will install the necessary frontend packages
* Run: npm build - this will create a production build
* Run: python3 -m venv venv
* Activate the virtual environment
* Run: pip install -r requirements.txt
* In investment_app/settings.py, under DATABASES change PASSWORD to your postgres database password
* In investment_app/settings.py, under EMAIL_HOST_USER, set the email and password to your email and password (for testing you can use the one there)
* If you have changed the email and password, in contacts/views.py, in the send_mail function change the email as well
* 
