var pre = document.querySelector("pre");
var re = /(&gt;)|([a-z-][a-z0-9 \.,:\(\)-]*[a-z0-9\.:])|(#+)|(\.+)|([+/])|(\$+)|(\^)|(\?)|(=+)|(!)/ig;

var str = pre.innerHTML;
str = str.replace(re, function(match) {
	var types = ["", "staircase", "text", "wall", "corridor", "door", "money", "trap", "scroll", "water", "potion"];
	for (var i=1; i<arguments.length-1; i++) {
		if (arguments[i]) { 
			var type = types[i];
			var str = "<span class='"+type+"' ";
			if (type != "wall" && type != "corridor" && type != "text") { str += "title='"+type+"' "; }
			str += ">" + match + "</span>"; 
			return str;
		}
	}
	return match;
});
str = str.replace("YYYY", new Date().getFullYear());
pre.innerHTML = str;

var links = {
	"download": "https://github.com/ondras/rot.js/zipball/master",
	"github": "https://github.com/ondras/rot.js",
	"interactive manual": "../manual/",
	"autogenerated documentation": "../doc/",
	"ondrej zara": "https://ondras.zarovi.cz/",
	"libtcod": "http://doryen.eptalys.net/libtcod/",
	"tests": "../tests/",
	"tutorial": "http://www.roguebasin.roguelikedevelopment.org/index.php?title=Rot.js_tutorial",
	"twitter": "https://twitter.com/rot_js",
	"$$$": "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7WXVKF3ZJ9FZE"
};
var spans = document.querySelectorAll("span");
for (var i=0;i<spans.length;i++) {
	var span = spans[i];
	var text = span.innerHTML;
	
	for (var p in links) {
		var index = text.toLowerCase().indexOf(p);
		if (index == -1) { continue; }
		
		var str = text.substring(0, index);
		str += "<a href='" + links[p] + "' ";
		if (p == "$$$") { str += "title='Donate!' "; }
		str += ">";
		str += text.substring(index, index+p.length);
		str += "</a>";
		str += text.substring(index+p.length);
		
		span.innerHTML = str;
	}
}

var monsters = {
	"@": "player",
	"k": "kobold",
	"o": "orc",
	"g": "goblin",
	"O": "ogre",
	"D": "dragon"
}
for (var p in monsters) {
	var monster = monsters[p];
	var sum = 0, sum2 = 0;
	var corridors = document.querySelectorAll(".corridor");
	for (var i=0;i<corridors.length;i++) { sum += corridors[i].innerHTML.length; }
	var random = Math.floor(Math.random()*sum);

	for (var i=0;i<corridors.length;i++) { 
		sum2 += corridors[i].innerHTML.length; 
		if (sum2 >= random) {
			sum2 -= random; /* sum2 = index of dot in corridors[i] */
			var span = corridors[i];
			if (sum2) {
				var tmp = document.createElement("span");
				tmp.className = span.className;
				tmp.innerHTML = span.innerHTML.substring(0, sum2);
				span.parentNode.insertBefore(tmp, span);
			}
			
			var node = document.createElement("span");
			node.className = monster;
			node.title = monster;
			node.innerHTML = p;
			span.parentNode.insertBefore(node, span);
			
			if (sum2 < span.innerHTML.length-1) {
				var tmp = document.createElement("span");
				tmp.className = span.className;
				tmp.innerHTML = span.innerHTML.substring(sum2+1, span.innerHTML.length);
				span.parentNode.insertBefore(tmp, span);
			}
			
			span.parentNode.removeChild(span);
			break;
		}
	}
}
