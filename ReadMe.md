## Article API

This is a simple CRUD API that allows the users to:
* Create an Article
* Read an Article
* Update an Article
* Delete an Article

### API ROUTES

Verb | Article Routes | Action | Returns
------------ | -------------
GET | /api/v1/all?user=<user> | Gets all article of a given user |JSON
GET | /api/v1/articles/:articleId/ | Gets a specific article using the article id | JSON
POST | /api/v1/articles/create | Create an article
PATCH | /api/v1/articles/:articleId/edit/ | Updates a specific article using the article id | JSON
DELETE | /api/v1/articles/:articleId | Deletes an article using the article id | JSON
DELETE | /api/v1/articles?user=<user> | Deletes all the articles using the user | JSON

### JSON Examples

On success 

Returns ```{
    status: "success",
    data: [{
        "article_id": number,
        "article_body": string,
        "article_title": string,
        "created_by: string
    }]
}``` 

On user error (404)

Returns ```{
    "status": "error",
    "message": ""
}```

On server error (500)

Returns ```{
    "status": "error",
    "message": "Something unexpected happen"
}```



You can interact with the live API [here](https://krudio.herokuapp.com)