# server.py
from flask import Flask, render_template,request,jsonify,session,redirect,make_response
from flask_session import Session
import utils
from flask_cors import CORS
import tweepy
from operator import itemgetter
from collections import Counter

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
CORS(app, supports_credentials=True)
model = utils.load_model()


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return jsonify({"Hey":"This is the api route, what are you doing?"})

@app.route("/api/auth/twitter", methods=["GET","POST"])
def twitter_auth():
	api = utils.user_auth()
	redirect_url = api.get_authorization_url()
	session['got_acc'] = False
	session['request_token'] = api.request_token['oauth_token']
	print("this is the request token" + session['request_token'] )
	response = jsonify({"red_url":redirect_url})
	print("after auth")
	print(session)
	return response

@app.route('/api/callback', methods=["GET","POST"])
def callback():
	if request.args.get('denied'):
		return redirect("/error")
	api = utils.user_auth()
	verifier = request.args.get('oauth_verifier')
	token = session.get('request_token')
	print(token)
	session['oauth_token_secret'] = verifier
	print("after callback")
	print(session)
	return redirect("http://localhost:3000/load")


@app.route("/api/result", methods=["GET","POST"])
def do_the_work():
	#start new auth object
	auth = utils.user_auth()
	#verify now that we have all the tokens
	token = session['request_token']
	verifier = session['oauth_token_secret']
	print(token)
	print(verifier)

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
	response = jsonify(items=pred_dict, friends=len(pred_dict), bots=cp)
	return response


if __name__ == "__main__":
	app.secret_key = 'Bruh, Fam, Les, Go'
	app.run(debug=True)
	sess.init_app(app)
	app.config.update(SESSION_COOKIE_HTTPONLY=False)