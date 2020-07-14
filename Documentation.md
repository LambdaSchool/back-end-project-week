# NOTES API
Heroku deployment exists @ `https://peaceful-sands-23658.herokuapp.com/`

## '/'
Basic api check
returns "api": "operational" if api is up.

## 'GET /notes'
Returns status 200 and the list of all notes if successful
Returns status 500 and the error if it fails

## 'GET /notes/:id'
Returns status 200 and a single note if successful
Returns status 404 and 'note not found' if it fails

## 'POST /notes', (title, textBody)
Adds a new note with title and textBody in their respective places
Returns status 201 and the new note's id if successful
Returns status 500 and 'Error inserting' plus the error if it fails

## 'PUT /notes/:id', (id, {title, textBody})
Updates note @ id with title and textBody
Returns status 200 and a count of 1 if successful
Returns status 200 and a count of 0 if there isn't a note with that id to update
Returns status 500 and the error if it fails


## 'DELETE /notes/:id'
Deletes note @ id
Returns status 200 and a count of 1 if successful
Returns status 200 and a count of 0 if there isn't a note with that id to delete
Returns status 500 and the error if it fails