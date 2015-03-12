var mongoose = require('mongoose');
var user = require('./user.js');
var article = require('./article.js');
var Schema = mongoose.Schema;

var CommentaireSchema = new mongoose.Schema({
	author : {type : Schema.Types.ObjectId, ref:'user'},
	article : {type : Schema.Types.ObjectId, ref:'Artcile'},
	date : Date,
	content : String,
});

var Commentaire = mongoose.model('Commentaire',CommentaireSchema);

exports.commentaire=Commentaire;

exports.create = function(req,res,next){

	  var commentaireObj = {
	  							author: req.body.author, 
		  						article: req.body.article,
		  						date: req.body.date, 
		  						content:req.body.content
	  						};

	  var model = new Commentaire(commentaireObj);
	  model.save(function(err,doc){
	        if(err || !doc){
	        	console.log('error for saving comment')
	        	return next(err);
	        }else{
	        		console.log('succes for saving comment')
	            	res.json(doc);
	        	}
	       });
               
};

/*
exports.get = function(req,res,next){
	Commentaire.find({article : req.params.id} ,(function(err,result){
	   	if(err){
	       	return next(err);
    	}else {
        	res.json(result);
        }
	}));
}; 
   */
exports.get = function(req,res,next){   
	Commentaire.find({article : req.params.id}).populate('author').exec(function(err,result){
		   	if(err){
		       	return next(err);
	    	}else {
	    		//console.log('this is our test comment acount ..................................'+result.length);
	        	res.json(result);
	        }
		});
}

exports.getNbcomment = function(req,res,next){   
	Commentaire.find({author : req.params.id} ,(function(err,result){
		   	if(err){
		       	return next(err);
	    	}else {
	    		console.log('this is our test comment acount .............. '+ result.length);
	        	var resultat =  result.length
	        	console.log(resultat);
	        	res.json(resultat);
	        }
		}));
}


exports.getNbcommentByArticle = function(req,res,next){   
	Commentaire.find({article : req.params.id} ,(function(err,result){
		   	if(err){
		       	return next(err);
	    	}else {
	    		console.log('this is our test comment acount .............. '+ result.length);
	        	var resultat =  result.length
	        	console.log(resultat);
	        	res.json(resultat);
	        }
		}));
}

exports.deleteComment =function(req, res, next){
    Commentaire.findById(req.params.id, function(err,doc){
        if(err || !doc) return next(err);
        doc.remove();
        res.json(doc);
    });
};  

exports.getLastComments = function(req,res,next){
	  var currentDate = Date.now;
	      currentDate.setDate(currentDate.getDate() - 3);
	      Commentaire.find({date: {$gte: currentDate}}, function(err,results){
	      	   if(err){
	      	   	    return next(err);
	      	   } else {
	      	   	    res.json(results);
	      	   }
	      });
};  
