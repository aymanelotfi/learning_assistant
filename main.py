########################################################################################
######################          Import packages      ###################################
########################################################################################
from flask import Blueprint, render_template, flash, request
from flask_login import login_required, current_user
from __init__ import create_app, db
from os import path, mkdir
from datetime import date

########################################################################################
# our main blueprint
main = Blueprint('main', __name__, static_folder = 'static', template_folder = 'templates')
start_day = date(2022, 4, 12)

@main.route('/') # home page that return 'index'
def index():
    return render_template('index.html')

@main.route('/profile') # profile page that return 'profile'
@login_required
def profile():
    return render_template('profile.html', name=current_user.name)

@main.route('/edit', methods=['POST', 'GET']) # edit today's file
@login_required
def edit():
	ID = current_user.id
	cur_day = (date.today()-start_day).days
	text = ""
	if request.method == 'POST':
		text = [k for k in request.form.to_dict().keys()][0]
		if not path.exists(f'./{ID}'):
			mkdir(f'./{ID}')
		f = open(f'./{ID}/{ID}_{cur_day}.md', "w")
		f.write(text)
		f.close()
	if path.exists(f'./{ID}/{ID}_{cur_day}.md'):
		text = open(f'./{ID}/{ID}_{cur_day}.md', "r").read()
	return render_template("editor.html", text=text)

@main.route('/read') # read today's recap
@login_required
def read():
	texts = []
	ID = current_user.id
	day = (date.today()-start_day).days
	fn = 0
	fnn = 1
	while day >= 0:
		if path.exists(f'./{ID}/{ID}_{day}.md'):
			texts.append("**Day " + str(-day)+"**\n\n"+open(f'./{ID}/{ID}_{day}.md', "r").read() + "\n\n")
		day -= fnn
		fnn += fn
		fn = fnn
	texts.reverse()
	text = ""
	for d in texts:
		text += d
	return render_template("reader.html", text=text)

app = create_app() # we initialize our flask app using the __init__.py function
if __name__ == '__main__':
    db.create_all(app=create_app()) # create the SQLite database
    app.run(debug=True) # run the flask app on debug mode
