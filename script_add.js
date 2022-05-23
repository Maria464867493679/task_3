







let tasks = [];
loadTask();

document.getElementById('task-add').onclick = function() {
	event.preventDefault();
	let taskBody = document.getElementById('task-body');

	let task = {
		body : taskBody.value,
		time : Math.floor(Date.now()/1000)
	}
	taskBody.value = '';
	tasks.push(task);

	saveTask();
	showTasks();
}

function saveTask() {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTask() {
	if (localStorage.getItem('tasks')) tasks = JSON.parse(localStorage.getItem('tasks'));
	showTasks();
}

function showTasks() {
	let taskField = document.getElementById('block2');
	let out = '';

	tasks.forEach(function(item) {
		out += `<div class="one"><p><em>${timeConverter(item.time)}</em></p>`;
		out += `<p>${item.body}</p></div>`;
	});
	taskField.innerHTML = out;
}

function timeConverter(UNIX_timestamp) {
	let a = new Date(UNIX_timestamp * 1000);
	let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let year = a.getFullYear();
	let month = months[a.getMonth()];
	let date = a.getDate();
	let hour = a.getHours();
	let min = a.getMinutes();
	let sec = a.getSeconds();
	let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
	return time; 
}




