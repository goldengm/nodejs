const rp = require('request-promise');
const cheerio = require("cheerio");
const url = "http://ec2-18-221-228-218.us-east-2.compute.amazonaws.com/shop?load_products=1&min_price=0&max_price=596&filters_applied=1&options=1&options_value=3&Colors%5B%5D=Red&type=desc&limit=15&page_number=1";

(async() => {
    const proxiedRequest = rp.defaults({ proxy: 'http://108.59.3.139:18001@165.227.118.92:8002' });
    this.response = await proxiedRequest.get(url);
    
    try {
	    var $ = cheerio.load(this.response);

	    const urlElems = $('.block-panel');
	    for (let i = 0; i < urlElems.length; i++) {
	        const title = $(urlElems[i]).find('h2.wrap-dot-1').text();
	        var price = $(urlElems[i]).find('div > div.price').text().trim();
	        console.log('title : \"'+title+'\", price: \"'+price+'\"');
	    };
	}
	catch (e) {
        console.log("Exception found:" + e.message);
    }
})();