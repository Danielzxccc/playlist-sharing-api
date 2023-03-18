# playlist-sharing-api
I made this REST API for my playlist sharing application using Nodejs, Expressjs and PostgreSQL.

# GET
# Fetch playlists
/playlists/get?page=1&search=
get playlists based on query params

Query Params
page
1
search
# GET
# Fetch by id
/playlists/get/:id
get playlist details based on ID

# POST
# Fetch playlist info(url, image, embed)
/playlists/info
Bodyraw (json)
{
  "link": "playlist link here"
}
