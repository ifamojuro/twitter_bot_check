import pandas as pd 
import tweepy
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

def load_model():
	#load_data
	training = pd.read_csv("data/training.csv")

	#make columns
	x = training.drop(["bot","created","collected", "Unnamed: 0"], axis = 1)
	y = training["bot"]

	#seperate data, get features selected prior
	train_x, test_x, train_y, test_y = train_test_split(x,y, test_size=0.2, random_state=0)
	features = ['following', 'num_tweets', 'len_name']
	
	train_y = pd.DataFrame(data=train_y, columns=['bot'])
	final_x = train_x[features]
	final_y = train_y['bot']

	regres = LogisticRegression()
	regres.fit(final_x, final_y)

	return regres


def user_auth():
	consumer_key = '6qhxfyGHdnt92g25yi0W48NRY'
	consumer_secret = 'UlkNAzJx1dMqOBShRRyQsGqRB5hKvzkhL0VfiMb3vN7KK7mEij'
	callback = 'http://127.0.0.1:5000/api/callback'
	auth = tweepy.OAuthHandler(consumer_key, consumer_secret, callback)
	return auth


def get_user_friend_id(api, user_name):
	ids = []
	for page in tweepy.Cursor(api.friends_ids, screen_name=user_name).pages():
		ids.extend(page)

	return ids


def get_friend_data(api,ids):
	info = []
	
	for i in range(0, len(ids), 100):
	    seg = ids[i: i+100]
	    users = api.lookup_users(user_ids=seg)
	    #relevant info is screen name, friends_count, num_tweets
	    for user in users:
	        user_dict = {
	            "screen_name":user.screen_name,
	            "len_name": len(user.screen_name),
	            "following": user.friends_count,
	            "num_tweets":user.statuses_count,
	            "pic":(user.profile_image_url).replace("_normal", "")
	        }
	        info.append(user_dict)

	friend_data = pd.DataFrame(info)

	return friend_data 


def predict_friends(model,friend_data):
	features = ['following', 'num_tweets', 'len_name']
	friend_data_x = friend_data[features]
	predctions=model.predict(friend_data_x)
	friend_data["pred"] = predctions
	return friend_data

def simplify_predictions(preds):
	return preds.to_dict('records')