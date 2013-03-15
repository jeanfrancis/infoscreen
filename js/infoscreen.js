var content_key = '0AnrtptTR3KifdG5OVXFxWl9mVHAxYVoybXBTcXU3elE';
var content = [];
var k_name = 'name';
var k_link = 'link';
var k_time = 'time';
var slide = -1;

var loopTimerID = null;

setInterval(showActivity, 5000);  

function initializeContent() {
    var ref = parent.location.href;
    if (true == ref.hasParameterByName('key')) {
        content_key = ref.getParameterByName('key');
    }
    
    var url = 'https://spreadsheets.google.com/feeds/list/' + content_key + '/od6/public/values?alt=json-in-script&callback=?';
    jQuery.getJSON(url).success(function(data) {
        var len = data.feed.entry.length;
        for (i = 0; i < len; i++) {
            var e = data.feed.entry[i];
            var map = new Object();
            var fieldname = e['gsx$name']['$t'];
            if (fieldname.)
            map[k_name] = e['gsx$name']['$t'];
            map[k_link] = e['gsx$contenturl']['$t'];
            map[k_time] = e['gsx$displaytime']['$t'];
            content.push(map);            
        }
        updateSlice(1);
    }).error(function(message) {
        console.error('error' + message);
    });
}

function updateSlice(step) {
    if (content.length != 0) {
        slide = (slide + content.length + step) % content.length;
        // show title
        $("#title").text('['+ (slide+1) + '/' + content.length + '] ' + content[slide][k_name]);
        // show content
        parent.contentFrame.location.href = content[slide][k_link];
        // set loop timer
        setLoopTimer(content[slide][k_time]);
   } else {
        alert('No content available.');
    }
}

function setLoopTimer(time) {
    // clear previous timer
	if (loopTimerID != null) {
		clearTimeout(loopTimerID);
		loopTimerID = null;
	}
	// sanity check: mininum timeout 10s
	if (time == null) {
	    time = 10;
	}
	
	// initiallize new timer
	loopTimerID = setTimeout( "updateSlice(1)", time*1000);
}

function showActivity() {
    $("#title").text($("#title").text() + '.');
}