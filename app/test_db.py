import json
from models import db, Artist

artists = db.session.query(Artist).limit(9).all()
dicts = {'Artists':[]}

def create_dict(a) :
	return {'name':a.name, 'image_url':a.image_url, 'country':a.country, 'decade':a.decade, 'genre':a.genre}

for a in artists :
	dicts['Artists'].append(create_dict(a))


print(json.dumps(dicts, indent=2))

