# server.py
from flask import Flask, render_template,request,jsonify,session,redirect,make_response
import utils
from flask_cors import CORS
import tweepy
from operator import itemgetter
from collections import Counter

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
CORS(app)
model = utils.load_model()
app.secret_key = 'Bruh, Fam, Les, Go'

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template("index.html")

@app.route("/api/auth/twitter", methods=["GET","POST"])
def twitter_auth():
	api = utils.user_auth()
	redirect_url = api.get_authorization_url()
	session['got_acc'] = False
	session['request_token'] = api.request_token['oauth_token']
	response = {"red_url":redirect_url}
	return jsonify(response)

@app.route('/api/callback', methods=["GET","POST"])
def callback():
	if request.args.get('denied'):
		return redirect("/error")
	api = utils.user_auth()
	verifier = request.args.get('oauth_verifier')
	print(verifier)
	token = session.get('request_token')
	session['oauth_token_secret'] = verifier
	return redirect("/load")


@app.route("/api/result", methods=["POST"])
def do_the_work():
	#start new auth object
	auth = utils.user_auth()
	#verify now that we have all the tokens
	token = session['request_token']
	verifier = session['oauth_token_secret']
	
	if (session['got_acc'] == True):
		auth.set_access_token(session["a_token"],session["a_token_secret"])
	else:
		auth.request_token = { 'oauth_token' : token, 'oauth_token_secret' : verifier }
		auth.get_access_token(verifier)
		session["a_token"] = auth.access_token
		session["a_token_secret"] = auth.access_token_secret
		session['got_acc'] = True
	
	#insantiate all the api with new auth
	api = tweepy.API(auth)
	user = api.me()
	screen_name = user.screen_name

	#getting friend data
	f_ids = utils.get_user_friend_id(api, screen_name)
	f_data = utils.get_friend_data(api,f_ids)

	#making predictions
	friend_predictions = utils.predict_friends(model,f_data)

	#prettyfying prdictions
	pred_dict = utils.simplify_predictions(friend_predictions)
	
	#getting data to send to json
	pred_dict = sorted(pred_dict, key=itemgetter('pred'), reverse=True)
	values = Counter(pred['pred'] for pred in pred_dict)
	cp = values[1]
	return jsonify(items=pred_dict, friends=len(pred_dict), bots=cp)


if __name__ == "__main__":
	app.run(debug=True)