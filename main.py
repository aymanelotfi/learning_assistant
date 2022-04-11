########################################################################################
######################          Import packages      ###################################
########################################################################################
from flask import Blueprint, render_template, flash
from flask_login import login_required, current_user
from __init__ import create_app, db

########################################################################################
# our main blueprint
main = Blueprint('main', __name__, static_folder = 'static', template_folder = 'templates')

@main.route('/') # home page that return 'index'
def index():
    return render_template('index.html')

@main.route('/profile') # profile page that return 'profile'
@login_required
def profile():
    return render_template('profile.html', name=current_user.name)

@main.route('/edit') # edit today's file
@login_required
def edit():
	return render_template("editor.html", text = "Todays's file")

@main.route('/read') # read today's recap
@login_required
def read():
	return render_template("editor.html", text = "Recap todo")

app = create_app() # we initialize our flask app using the __init__.py function
if __name__ == '__main__':
    db.create_all(app=create_app()) # create the SQLite database
    app.run(debug=True) # run the flask app on debug mode
