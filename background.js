

//code inspired from : Shutdown Timer for Google Chrome by nimrod-sarda.com
var reset;
var interval;
var off = "Off";
var timeIntervals = [1,5,10,30,60,90];
var currentTime =0;
var tempPw = localStorage.tPW;
tempPw = null

var checkForm = function (){
			if (tempPw==null) {
				var starting=prompt("Please choose your password:");
				if (starting != null) {
				tempPw =starting;
				} else {
					checkForm()
				}
		}
		}
chrome.browserAction.onClicked.addListener(function(){
        init(timeIntervals[currentTime]);
		
		checkForm();
        if(currentTime === timeIntervals.length){
            currentTime = -1;
            clearInterval(interval);
            showIcon();off = "Off";
             chrome.browserAction.setBadgeText( {text:off});
             clearTimeout(reset);
        }
        currentTime++;

});
var init = function(timeVar){
    clearTimeout(reset);
    reset=setTimeout(function(){lockNow()},(60000*timeVar));
    setBadge(timeVar);
    showIcon();
};

var showIcon=function(){chrome.browserAction.setIcon({path:"mLock.png"});};
var lockNow = function(){

        var person=prompt("Your Web Browsing Time is Up! Enter your password to unlock this page:");
		if (person!=null && person == tempPw)
			{
			x="Unlocked!";
			}
		else
		{
			alert("Incorrect Password! Try Again");
			lockNow();
		}

};

var setBadge = function(minutes){

    chrome.browserAction.setBadgeText( {text:minutes+"m"});

     clearInterval(interval);
     interval=setInterval(function(){
        if(minutes>0){
            minutes--;
            setBadge(minutes);
        }
    },60000);
    if(minutes === 0){
        chrome.browserAction.setBadgeText( {text:"Off"});
        off = "Off"
    }
};



chrome.browserAction.setBadgeText( {text:"Off"});
showIcon();
