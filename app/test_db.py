import json
from models import db, Artist, Track

artists = db.session.query(Artist).limit(9).all()

vals = []

def create_dict(a, t) :
	return {'name':a.name, 'image_url':a.image_url, 'country':a.country, 'decade':a.decade, 'genre':a.genre, 'most_popular_track_id':t}

for a in artists :
	vals.append(create_dict(a, a.tracks[-1].id))


print(json.dumps({'Artists' : sorted(vals, key=lambda x:x['name'], reverse=False)}, indent=2) )


"""

Steps for sorting database queries into a VERy NICE JSON format!!!!

1. copy and paste this code
2. on line two, add in any additional models you would like to query
3. on line three, change 'artists' to whatever you're querying, and 'Artist' to the model name
4. Set the limit and how much you want from here as well
5. in create_dict, replace the attribute names with the actual attributes of your model
6. change the 'artists' in line 11 to whatever you named the var in line 4
7. change the parameters of create_dict so it makes sense
8. change the 'Artists' in line 15 to the name of your model. change the x['name'] to whatever attribute you would like to sort by
9. change reverse to True if you want Descending order
10. revel in the fact that you just sorted a hECk of a lot of data


"""