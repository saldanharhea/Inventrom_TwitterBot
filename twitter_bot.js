/*
  *********************************************************************************************************

question 3
Create a bot that runs continuously which uses the twitter api to do the following on an user account:
a) List all the followers
b) List all the following users
c) Like a tweet once it is tweeted by @boltiot
d) Likeanytweetthathasthehashtag‘#IOT’

*/






console.log("the twiter api bot has started #Inventrom");

//including the twit api
var Twit =require('twit');


//making a new twit object  with basic details[GIT ]
//rhea bot tester [dev.twitter]
//AUTHENTICATION
var T = new Twit({
  consumer_key:         'wj3kBhjE6egHhvrLYTmQ5TqlU',
  consumer_secret:      'QiRkfqEmADE98GnaR8LqQOA7mPSjRr44UlLxnObi1OVYLPdrYg',
  access_token:         '902819529524264962-O1qzCdivgSWTTpBsFnMZjUOifXXRYGh',
  access_token_secret:  '2SZ8u8wYx89gdrPVzh7huFKScMPAhJnh1EQVRdOQExF9z',
  
});


twiter_family();

//check friends and follower uddate every week =604800 *1000ms
setInterval(twiter_family,604800 *1000)


function twiter_family()
{
    T.get('followers/list',followers);
    T.get('friends/list', friends);

    // all friends
    function friends(err, data, response){
      var friend =data.users;
      console.log("\n\n\nAll THE USERS I FOLLOW")
      for(var i=0;i< friend.length; i++){

      console.log(friend[i].name);
      }
      
    }





    //all folowers
    function followers(err, data, response)
    {
      var follow =data.users;
      console.log("\n\n\nAll MY FOLLOWERS * maybe no one follows me :P")
      for(var i=0;i< follow.length; i++){

      console.log(follow[i].name);
      }
}

}






likes();
var pass;
//liker initied ever 20sec
setInterval(likes,20 *1000)






function likes()
{
  var params ={ 
  q: '#IOT',
   
  count: 1
   }

   T.get('search/tweets',params , gotData);

   //last tweet on got
function gotData(err, data, response){

  var tweets =data.statuses;
  //console.log(tweets)
  //console.log("\n\n\nThe Tweet #Iot ")
  for(var i=0;i< tweets.length; i++){
  //console.log(tweets[i].text);
  pass= tweets[i].id_str;
  //console.log(pass)
  msg1 = tweets[i].text+" \n #IOT tweet";
  twitter_like(pass,msg1);
  }
}

var params2 ={ 
  screen_name: 'boltiot',
   
  count: 1
   }



// get request


T.get('statuses/user_timeline',params2 , gotTweet);




var tweet_id;
function gotTweet(err, data, response){
  var tweets =data;
  //console.log(tweets)
  //console.log(tweets[0].retweeted_status.favorited)

  //console.log("\n\n\nThe Tweet FROM BOLTIOT ")
  for(var i=0;i< tweets.length; i++){
  ///console.log(tweets[i].text);
  //tweet_id =tweets[i].id;
  //console.log(tweet_id);


//the tweet in tweets[i].text
  msg= tweets[i].text+" \n The Tweet FROM @boltiot";
  twitter_like(tweets[i].id_str,msg);
  }
}

}


function twitter_like(pass,msg)
{
 
  var like ={id: pass
            };

  T.post('favorites/create',like,test);

function test(err, data, response)
{
  if(err){
    console.log("\n\nyou have already liked this tweet \n "+msg);

  }
  else{
    console.log("\n\ntweet liked \n "+msg);
  }
}

}
