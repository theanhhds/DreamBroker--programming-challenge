const express = require("express");
const cors = require("cors");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;
//Initialize server
app.listen(PORT);
app.use(cors());	//avoid CORS policy
app.use(bodyParser.json());	// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));	// parse application/x-www-form-urlencoded

function countWord(str){	//Count number of words in string
	let count = 0, i=0;
	str = str+' ';			//This approach needs to add 1 more space character at the end
	for (i=1; i< str.length; i++)
		//If current position is a space and previouse is not a space
		if (str.charAt(i) == ' ' && str.charAt(i-1) != ' ')
			count++;
	return count;
}

function countChars(str){
	let count = new Array(), i = 0;
	for (i==0; i<= 25; i++){		//Initialize count array, which has 26 entries = 0
		count[i]=0;
	}
	
	for (i=0; i< str.length; i++){
		let a = str.charCodeAt(i) - 97;	//a=0, b=1, c=2, etc. to z=25
		if (a>=0 && a<=25)
			count[a]++;
	}
	
	let res = [];
	for (i=0; i<= 25; i++){
		let c = String.fromCharCode(97+i);
		if (count[i]!=0)
			res.push({[c]: count[i]});
	}
	return res;
}

router.post('/api/analyze', (req, res)=> {
	let data = req.body.text;
	data = data.toLowerCase();
	// console.log(data);
	let textLength_wSpace = data.length;
	let n_space = data.split(' ').length - 1;	//counts number of space chars
	let textLength_woSpace = textLength_wSpace - n_space;
	let wordCount = countWord(data);
	let charsCount = countChars(data);
	// console.log(textLength_wSpace, textLength_woSpace, wordCount, charsCount);
	
	let result = {"textLength": {"withSpaces": textLength_wSpace, "withoutSpaces": textLength_woSpace}, 
				  "wordCount": wordCount,
				  "characterCount": charsCount};
	res.send(result);
})

router.get('/', (req,res) => {
	res.send("Nothing to see here, shh!");
})

app.use(router);
