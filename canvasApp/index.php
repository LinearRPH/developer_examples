
<!DOCTYPE HTML>
<html>
<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0"/>
<meta>
	<title>Draw App</title>
	<script type="text/javascript" src="draw_control.js"></script>
	<link rel="stylesheet" href="stylesheet.css">
</meta>
<head>

</head>
<body onload="initCanvasApp()">
	<center>
		<div >
			<ul id="ul-outer">
				<li class="app-canvas"><canvas id="draw_plane"></canvas></li>
				<li>
				<button id="reset" value="clear">Clear</button>
				</li>
				<li class="app-details" id="app-details">
				<form>
					<fieldset>
						<legend>App Details:</legend>
							<ul id="ul-inner">
							<li>-Sample Canvas Draw App - made 1/12/2015</li>
							<li>-Updated with rounded corners and details area (CSS) 1/17/2015</li>
							<li>-Added touchscreen controls (JavaScript) 1/20/2015</li>
							</ul>
					</fieldset>
				</form>
				</li>
			</ul>
		</div>
		<br/>
	</center>
<?php
	
?>
</body>
</html>