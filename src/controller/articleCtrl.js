import pool from '../model/db.js';

class Article{

    /**
     * @static
     * @params {Object} req
     * @params {Object} res
     * @returns Appropriate JSON Response with Status and Data
     * @memberof Article
     */
    
    static async createArticle(req, res) {

        try{
            //! THE DATE OF PUB SHOULD ONE BE SET BY JAVASCRIPT OR POSTGRES

            const {article_title, article_body, created_by} = req.body;
        
            const query =  `INSERT INTO articles(article_title, article_body, created_by) VALUES($1, $2, $3) RETURNING *`
            
            const values = [article_title, article_body, created_by];
    
            const result = await pool.query(query, values);

            if (result.rowCount === 0) {
                res.status(404).json({
                    status: "error",
                    message: "You didn\'t complete all required field"
                });
            }else {
                // server response
                res.status(201).json({
                    status: "success",
                    message: "Article successfully posted",
                });
            }
        }catch(error){

            res.status(500).json({
                status: "error",
                message: "Something went wrong l",
            });
        }
    }

    /**
     * @static
     * @params {Object} req
     * @params {Object} res
     * @returns Appropriate JSON Response with Status and Data
     * @memberof Article
     */
    static async getAllArticle(req, res) {
        
        try {
            const { user } = req.query

            const result = await pool.query(
                `SELECT * FROM articles WHERE created_by=$1 ORDER BY created_on DESC`, [user]);
               
            if (result.rowCount > 0) {     
                res.status(200).json({
                    status: "success",
                    data: result.rows
                });
            }else {
                res.status(404).json({
                    status: "error",
                    data: {
                        message: "Articles not found with this username",
                    }
                });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status: "error",
                data:{
                    message: "Something went wrong"
                }
            });
        }
    }

    /**
     * @static
     * @params {Object} req
     * @params {Object} res
     * @returns Appropriate JSON Response with Status and Data
     * @memberof Article
     */

    static async getOneArticle(req, res) {
        
        try {
            const articleId = Number(req.params.articleId);
            
            const query = 'SELECT * FROM articles WHERE article_id=$1;';

            const result = await pool.query( query, [articleId]);

            if (result.rowCount > 0) {

                res.status(200).json({
                    status: "success",
                    data: result.rows
                });
            }else{

                res.status(404).json({
                    status: "error",
                    statusCode: 404,
                    message: "Couldn\'t find article"
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: "error",
                message: "Something went wrong"
            });
        }
    }

     /**
     * @static
     * @params {Object} req
     * @params {Object} res
     * @returns Appropriate JSON Response with Status and Data
     * @memberof Article
     */

     static async editOneArticle(req, res) {

        try {
            const articleId = Number(req.params.articleId);
            const {article_title} = req.body;
            const {article_body} = req.body;
            const {created_by} = req.body;
            console.log(article_body, article_title, created_by);

            const query = "UPDATE articles SET article_body=$1, article_title=$2, created_by=$3 WHERE article_id=$4 ;";
         
            const values = [article_body, article_title, created_by, articleId];

            const result = await pool.query(query, values);

            if (result.rowCount > 0) {
                console.log(result.rowCount)

                res.status(201).json({
                    status: 'success',
                    message: 'Article has been updated',
                });

            }else{
                res.status(404).json({
                    status: error,
                    message: "Article not updated"
                });
            }
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: "Something unexpected happen",
                error
            });
        }
     }

    /**
     * @static
     * @params {Object} req
     * @params {Object} res
     * @returns Appropriate JSON Response with Status and Data
     * @memberof Article
     */

    static async deleteOneArticle(req, res){
        try {
            const articleId = Number(req.params.articleId);
            const result = await pool.query( "DELETE FROM articles WHERE article_id=$1", [articleId]);
           
            if (result.rowCount > 0) {

                // server response
                res.status(200).json({
                    message: "Article has been deleted successfully"
                });

            }else{
                res.status(404).json({
                    message: "Article does not exist"
                });
            }
           
        } catch (error) {
            res.status(500).json({
                status: "error",
                data: {
                    message: "Something went wrong"
                }
            });
        }
    }

    /**
     * @static
     * @params {Object} req
     * @params {Object} res
     * @returns Appropriate JSON Response with Status and Data
     * @memberof Article
     */

     static async deleteAllArticle(req, res) {
         try {
             const user = req.query.user;
            
             const result = await pool.query("DELETE FROM articles WHERE created_by=$1", [user]);
           
            if(result.rowCount > 0){

                res.status(200).json({
                    status: "success",
                    message: "All article deleted"
                });
            }else{
                res.status(404).json({
                    status: "error",
                    message: "All articles have already been deleted"
                });
            }  
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: "Something went wrong",
                error
            });
        }
     }
}

export default Article;