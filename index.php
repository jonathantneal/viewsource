<?php

// url directory
$dir = dirname($_SERVER['PHP_SELF']);
$dir = $dir == "/" ? "" : $dir;

// url and url's extension
$url = isset($_GET['url']) ? preg_replace(array('/^(?!(ftp|http|https):\/)/', '/:\//'), array('http:/', '://'), trim($_GET['url'])) : 'http://';

$url_isset = $url != 'http://';

$url_extension = pathinfo($url, PATHINFO_EXTENSION);

if (preg_match('/^http:\/\/viewsource\.in/', $url)) {
	header('Location: https://github.com/jonathantneal/viewsource');
}

// brush url (for Syntax Highlighter)
$brush_url = '//alexgorbatchev.com/pub/sh/current/';

// supported brushes, default is Xml
$brush_options = array(
	'css' => 'Css',
	'scss' => 'Css',
	'js' => 'JScript',
	'jscript' => 'JScript',
	'javascript' => 'JScript'
);

$brush = isset($brush_options[$url_extension]) ? $brush_options[$url_extension] : 'Xml';
$brush_lowercase = strtolower($brush);

// title
$title = 'viewsource'.($url_isset ? ': '.$url : '');
$label = 'View Source';

?>
<!doctype html public "Yo dawg, we heard you like viewing the source, so we put our source in the source so you can view source while you view source.">
<title><?php print($title); ?></title>
<meta name="description" content="Share the source of anything on the www.">
<meta property="og:image" content="http://viewsource.in/favicon.png">
<link rel="stylesheet" href="<?php print($dir.'/style.css'); ?>">
<script>document.write("<meta name=viewport content=width=device-"+(this.orientation ? "height" : "width")+">");</script>

<?php if (!$url_isset): ?>
<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Press+Start+2P">
<form onsubmit="location='./'+this.url.value;return false;">
	<h1><?php print($title); ?></h1>
	<a href="javascript:location='http://viewsource.in/'+location;" id="bookmarklet"><span>View Source</span></a>
	<input type="url" name="url" id="url" placeholder="http://" onchange="this.value=/^(f|ht)tps*:/.test(this.value)?this.value:'http://'+this.value" autofocus>
	<input type="submit" id="submit" value="<?php print($label); ?>">
</form>

<?php else: ?>
<script src="<?php print($brush_url.'/scripts/shCore.js'); ?>"></script>
<script src="<?php print($brush_url.'/scripts/shBrush'.$brush.'.js'); ?>"></script>
<pre id="source" class="<?php print('brush:'.$brush_lowercase); ?>"><?php

// create a new cURL resource handle
$ch = curl_init();

// Set URL to download
curl_setopt($ch, CURLOPT_URL, $url);

// User agent
curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);

// Include header in result? (0 = yes, 1 = no)
curl_setopt($ch, CURLOPT_HEADER, 0);

// Should cURL return or print out the data? (true = return, false = print)
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Follow redirects
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

// Timeout in seconds
curl_setopt($ch, CURLOPT_TIMEOUT, 3);

// Prepare source
$source = preg_replace(array('/&/', '/</'), array('&amp;', '&lt;'), curl_exec($ch));

// Print source
print($source);

?></pre>

<script>url="<? print($url); ?>"</script>
<script src="<?php print($dir.'/script.js'); ?>"></script>
<? endif; ?>
