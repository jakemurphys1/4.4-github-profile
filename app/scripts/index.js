var $=require("jquery");
var handlebars = require('handlebars');

var source   = $("#NewItem-template").html();
var profiletemplate = handlebars.compile(source);
 source   = $("#Repository-tab").html();
var repositorytemplate = handlebars.compile(source);


var githubtoken = require('../scripts/ghtoken.js').token;

if(typeof(githubtoken) !== "undefined"){
  $.ajaxSetup({
    headers: {
      'Authorization': 'token ' + githubtoken,
    }
  });
}

$.ajax("https://api.github.com/users/jakemurphys1").then(profile);

function profile(data){
  var context={
    name:data.name,
    username:data.login,
    joindate: (data.created_at).slice(0,10),
    followers:data.followers,
    following:data.following,
    starred:data.public_gists,
    image:data.avatar_url,
  };
     $('.profile').append(profiletemplate(context));
}

$.ajax("https://api.github.com/users/jakemurphys1/repos").then(repository);

function repository(data){
    console.log(data)
    var context=[];
    var count=0;
  data.forEach(function(num){
    context={
      name:num.name,
      stargazers:num.stargazers_count,
      forks:num.forks,
      updated:num.updated_at.slice(0,10),
    };
    console.log(context.forks)
        $("#home").append(repositorytemplate(context))
  })


}
