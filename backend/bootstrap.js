/*
 * A BootStrap is a JavaScript file that is run when your project is loaded on the server.
 * You can use it  to initialize your application, define HTTP pattern handlers etc..
 */
 
 /* uncomment this if you want to create data automatically next time you run your server 
 /* otherwise run the ./Tools/createFakeData.js
    initAppWorker;
*/

storage.PRODUCTION_MODE = false;

initAppWorker = new SharedWorker("Workers/initApp-sharedWorker.js", "InitApp");


directory.setLoginManager( "login/login", "Admin" );

 //Initialize our Model with some data.
new SharedWorker("Workers/initData.js", "InitData"); 