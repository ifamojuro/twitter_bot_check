# server.py
from flask import Flask, render_template,request,jsonify
import utils
from flask_cors import CORS


app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
CORS(app)
model = utils.load_model()
auth = utils.auth_api()

"""
@app.route("/auth/twitter")
def twitter_auth():
"""

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/result", methods=["POST"])
def do_the_work():
	#print(request.json)
	screen_name = request.json["screen_name"]["name"]
	#print(screen_name)
	#print("getting_ids")
	f_ids = utils.get_user_friend_id(auth, screen_name)
	print("getting_data")
	f_data = utils.get_friend_data(auth,f_ids)
	print("making preds")
	friend_predictions = utils.predict_friends(model,f_data)
	print("displaying_preds")
	pred_dict = utils.simplify_predictions(friend_predictions)
	print(pred_dict)

	return jsonify(pred_dict)


@app.route("/hello")
def hello():
    return "Hello World!"


if __name__ == "__main__":
	app.run(debug=True)