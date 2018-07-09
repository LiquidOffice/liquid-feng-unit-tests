// read config file
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

// global vars
var myBaseURL = config["feng-url"];
var myUserName = config["feng-user"];
var myPassWord = config["password"];


var myBrowser = 'firefox';

var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

console.log("Verbindung mit WebDriver initiert");

var driver = new webdriver.Builder()
    .forBrowser(myBrowser)
    .build();

// timeout wait
var sek = 30;


var now = new Date();
var myDate =  now;
console.log('Date formatted to ' + myDate);


console.log("vor Verbindung zu Feng Office");

driver.get(myBaseURL);  // YOURURL

console.log("vor Login");

driver.wait(until.elementLocated(By.id('loginUsername')), sek * 1000).then(function(elm) {
    elm.sendKeys(myUserName);   // YOURusername
});

driver.wait(until.elementLocated(By.id('loginPassword')), sek * 1000).then(function(elm) {
    elm.sendKeys(myPassWord);   // YOURpassword
});

console.log("nach Passwort");

driver.findElement(By.className('submit'))
.then(console.log("Element Submit gefunden"));



driver.wait(until.elementLocated(By.className('submit')), sek * 1000).then(function(elm) {
	
	console.log("vor Klick");
	
    elm.click();

    console.log("nach Klick");
    
});


driver.wait(until.elementLocated(By.css("span.x-tab-strip-text.ico-messages")), sek * 1000).then(function(elm) {
    elm.click();
    console.log("Notes klicked");
});

driver.wait(until.elementLocated(By.css("button.x-btn-text.ico-new.new_button")), sek * 1000).then(function(elm) {
    elm.click();
    console.log("New clicked");
});


driver.wait(until.elementLocated(By.css("input.title")), sek * 1000).then(function(elm) {
	elm.sendKeys('AutoNote ' +  myBrowser + " " + myDate);
	console.log("AutoNote written");

});


driver.wait(until.elementLocated(By.css("iframe.cke_wysiwyg_frame")), sek * 1000).then(function(elm) {
    elm.click();
    console.log("Container clicked");
});

driver.wait(until.elementLocated(By.css("iframe.cke_wysiwyg_frame")), sek * 1000).then(function(elm) {
    elm.click();
    elm.sendKeys("Some content, erstellt von AKScript. \nCurrent timestamp was" + myDate + ".");
    console.log("Sendkeys sent to iframe");
});



driver.wait(until.elementLocated(By.css("button.submit ")), sek * 1000).then(function(elm) {
    elm.click();
    console.log("AddNote klicked");
});



driver.quit();

