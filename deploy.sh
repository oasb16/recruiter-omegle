#!/bin/bash

# Navigate to the project directory
cd /home/omkarsbdev/RecruiterOmegle/recruiter-omegle

# Activate the virtual environment
workon recruiter_env

# Pull the latest changes from GitHub
git pull -f origin main

# Install any new dependencies
pip install -r requirements.txt

# Reload the WSGI application to apply changes
touch /var/www/omkarsbdev_pythonanywhere_com_wsgi.py
