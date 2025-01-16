from flask import Flask, request
import subprocess

app = Flask(__name__)

@app.route('/deploy', methods=['POST'])
def deploy():
    if request.method == 'POST':
        # Run the deployment script
        subprocess.call(['/home/omkarsbdev/RecruiterOmegle/recruiter-omegle/deploy.sh'])
        return 'Deployed Successfully', 200
    else:
        return 'Invalid Request', 400
