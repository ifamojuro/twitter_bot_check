# server.py
from flask import Flask, render_template,request,jsonify,session,redirect,make_response
from flask_session import Session
import utils
from flask_cors import CORS
import tweepy


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
	session['request_token'] = api.request_token['oauth_token']
	response = {"red_url":redirect_url}
	return jsonify(response)

@app.route('/api/callback', methods=["GET","POST"])
def callback():
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
	auth.request_token = { 'oauth_token' : token, 'oauth_token_secret' : verifier }
	auth.get_access_token(verifier)

	#insantiate all the api with new auth
	api = tweepy.API(auth)
	user = api.me()
	screen_name = user.screen_name
	#print(screen_name)
	#print("getting_ids")
	f_ids = utils.get_user_friend_id(api, screen_name)
	print("getting_data")
	f_data = utils.get_friend_data(api,f_ids)
	print("making preds")
	friend_predictions = utils.predict_friends(model,f_data)
	print("displaying_preds")
	pred_dict = utils.simplify_predictions(friend_predictions)
	print(pred_dict)

	return jsonify(items=pred_dict)


@app.route("/hello")
def hello():
    return "Hello World!"


if __name__ == "__main__":
	app.run(debug=True)