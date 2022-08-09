const maxApi = require("max-api");
var _ = require('lodash');

const NODE_ID = "current-node.dict";
const LINK_ID = "current-link.dict";
const DATA_ID = "current-data.dict";
const DICT_ID = "";
// Used for storing the initial value
let initialDict = {};

//array used for storing all collected dicts
let links = [];
let nodes = [];

// Getting and setting dicts is an asynchronous process and the API function
// calls all return a Promise. We use the async/await syntax here in order
// to handle the async behaviour gracefully.
//
// Want to learn more about Promised and async/await:
//		* Web Fundamentals intro to Promises: https://developers.google.com/web/fundamentals/primers/promises
//		* Promises Deep Dive on MDN: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
//		* Web Fundamentals on using async/await and their benefits: https://developers.google.com/web/fundamentals/primers/async-functions
//		* Async Functions on MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

maxApi.addHandlers({
	// set: async (path, value) => {
	// 	const dict = await maxApi.updateDict(DICT_ID, path, value);
	// 	await maxApi.outlet(dict);
	// },

	//update the dict with our info
	reset: async () => {
		const dict = await maxApi.setDict(DATA_ID, initialDict);
		await maxApi.outlet(dict);
	},
	// show: async () => {
	// 	const dict = await maxApi.getDict(DICT_ID);
	// 	await maxApi.outlet(dict);
	// },


	addLink: async () => {
		const link = await maxApi.getDict(LINK_ID);
		if (await nodes.some((x)=> _.isEqual(x, link))==false){
		await links.push(link);

		//add this array to the obj
		initialDict.links = links;
		}
				else{
			await maxApi.post('been there buddy!');
		}
		await maxApi.outlet(links);
		// await maxApi.post(links);
	},

	//add node function, need to refactor into class method?
	addNode: async () => {
		const node = await maxApi.getDict(NODE_ID);
		//check if dict object is already in array nodes
		if (await nodes.some((x)=> _.isEqual(x, node))==false){
			//if not, add it to the array of nodes, and post the number of nodes
		await maxApi.post(nodes.push(node));

		//add this array to the obj
		initialDict.nodes=nodes;

		//send out list
		await maxApi.outlet(nodes);
		}
		else{
			await maxApi.post('been there buddy!');
		}
		
	}

});

// We use this to store the initial value of the dict on process start
// so that the call to "reset" and reset it accordingly
const main = async () => { initialDict = await maxApi.getDict(DATA_ID); };
main();


