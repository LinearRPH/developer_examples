"use strict"


var canvas;
var canvas_plane;
var buttonDown=false;
var last_x = 0;
var last_y = 0;
var curr_touches = new Array();

function draw_touch_dots(event){
	var touches = event.changedTouches;
	var rect = canvas_plane.getBoundingClientRect();
	var x,y;
	for (var i = 0; i<touches.length; i++){
		x = touches[i].pageX - rect.left;
		y = touches[i].pageY - rect.top;
		curr_touches.push({id:touches[i].identifier,page_x:x,page_y:y})
		
		canvas.beginPath();
		canvas.lineWidth = 0.1;
		canvas.arc(x,y,5,0,2*Math.PI);
		canvas.fillStyle = 'black';
		canvas.fill();
		canvas.stroke();
		canvas.closePath();
		
	}
}

function draw_touch_lines(event){
	event.preventDefault();
	var touches = event.changedTouches;
	var rect = canvas_plane.getBoundingClientRect();
	var x,y;
	
	
	for(var i = 0; i < touches.length; i++){
		var changed_touch_id = find_moved_touch(touches[i].identifier);
		
		if (changed_touch_id >= 0){
			x = touches[changed_touch_id].pageX - rect.left;
			y = touches[changed_touch_id].pageY - rect.top;		
			if(x != curr_touches[changed_touch_id].page_x || y != curr_touches[changed_touch_id].page_y){
				canvas.beginPath();
				canvas.moveTo(curr_touches[changed_touch_id].page_x, curr_touches[changed_touch_id].page_y);
				canvas.lineTo(x,y);
				canvas.lineWidth = 10;
				canvas.strokeStyle = 'black';
				canvas.stroke();
				
				canvas.beginPath();
				canvas.lineWidth = 0.1;
				canvas.arc(x,y,5,0,2*Math.PI);
				canvas.fillStyle = 'black';
				canvas.fill();
				canvas.stroke();
				canvas.closePath();
				
				curr_touches.splice(changed_touch_id,1,{id:touches[i].identifier,page_x:x,page_y:y});
			}
			
		}
	}	
}

function find_moved_touch(to_find_id){
	if(curr_touches.length > 0){
		for (var i = 0; i < curr_touches.length; i++){
			if (curr_touches[i].id == to_find_id){
				return curr_touches[i].id;
			}
		}
	}
	
	return -1;
}

function end_touch(event){
	event.preventDefault();
	var touches = event.changedTouches;
	var rect = canvas_plane.getBoundingClientRect();
	var x,y;
	
	for (var i = 0; i<touches.length; i++){
		var changed_touch_id = find_moved_touch(touches[i].identifier);
		
		if (changed_touch_id >= 0){
			x = touches[changed_touch_id].pageX - rect.left;
			y = touches[changed_touch_id].pageY - rect.top;		
			if(x != touches[changed_touch_id].page_x || y != touches[changed_touch_id].page_y){
				canvas.beginPath();
				canvas.moveTo(curr_touches.page_x, curr_touches.page_y);
				canvas.lineTo(x,y);
				canvas.lineWidth = 10;
				canvas.strokeStyle = 'black';
				canvas.stroke();
			}
			
			canvas.beginPath();
			canvas.lineWidth = 0.1;
			canvas.arc(x,y,5,0,2*Math.PI);
			canvas.fillStyle = 'black';
			canvas.fill();
			canvas.stroke();
			canvas.closePath();
			
			curr_touches.splice(changed_touch_id,1);
		}
	}		
}

function get_mouse_pos(event) {
	var rect = canvas_plane.getBoundingClientRect();
	return {
	  x: (event.clientX - rect.left),
	  y: (event.clientY - rect.top)
	};
}

function draw_dot(event){
	if(event.button == 0){
		var mouse_pos = get_mouse_pos(event);
		last_x = mouse_pos.x;
		last_y = mouse_pos.y;
		canvas.beginPath();
		canvas.lineWidth = 0.1;
		canvas.arc(last_x,last_y,5,0,2*Math.PI);
		canvas.fillStyle = 'black';
		canvas.fill();
		canvas.stroke();
		canvas.closePath();
		buttonDown = true;
	}
}

function draw_line(event){
	var mouse_pos = get_mouse_pos(event);
	canvas.beginPath();
	canvas.moveTo(last_x,last_y);
	canvas.lineTo(mouse_pos.x,mouse_pos.y);
	canvas.lineWidth = 10;
	canvas.strokeStyle = 'black';
	canvas.stroke();
	//canvas.closePath();
	draw_dot(event);
}

function change_size(){
	canvas_plane.setAttribute('width', Math.floor(window.innerWidth*0.98));
	canvas_plane.setAttribute('height', Math.floor(window.innerHeight*0.70));
}

function initCanvasApp(){
	canvas_plane = document.getElementById('draw_plane');
	canvas = canvas_plane.getContext('2d');
	change_size();
	canvas_plane.style.background = 'orange';
	canvas_plane.onmouseup = function(event){
		buttonDown = false;
	};
	canvas_plane.onmouseout = function(event){	
		buttonDown = false;
	};
	canvas_plane.onmousedown = function(event){	
		draw_dot(event);
	};
	canvas_plane.onmousemove = function(event){
		if(buttonDown){
			draw_line(event);
		}
	};
	canvas_plane.addEventListener("touchstart", draw_touch_dots, false);
	canvas_plane.addEventListener("touchend", end_touch, false);
	canvas_plane.addEventListener("touchleave", end_touch, false);
	canvas_plane.addEventListener("touchmove", draw_touch_lines, false);
	window.addEventListener('resize',change_size,false);
	
	
	/*
	document.ontouchmove = function(event){
		event.preventDefault();
	}
	*/
	document.getElementById("reset").addEventListener('click', function(){
		canvas.clearRect(0, 0, canvas_plane.getAttribute('width'), canvas_plane.getAttribute('height'));
		curr_touches.length = 0;
	});
}



