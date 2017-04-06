import json
from models import db, Artist, Track

artists = db.session.query(Artist).limit(9).all()
dicts = {'Artists':[]}

def create_dict(a, t) :
	return {'name':a.name, 'image_url':a.image_url, 'country':a.country, 'decade':a.decade, 'genre':a.genre, 'most_popular_track_id':t}

for a in artists :
	dicts['Artists'].append(create_dict(a, a.tracks[-1].id))


print(json.dumps(dicts, indent=2))

