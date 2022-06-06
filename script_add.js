
let tasks = [];
loadTask();


function addTask() {
	event.preventDefault();

	let taskName = document.getElementById('task-name');
	let taskBody = document.getElementById('task-body');
	let taskHours = document.getElementById('hours');

	let task = {
		name: taskName.value,
		body: taskBody.value,
		hours: taskHours.value,
		time: Math.floor(Date.now()/1000),
	}

	taskName.value = '';
	taskBody.value = '';
	taskHours.value = '';
	tasks.push(task);

	saveTask();
	showTasks();

	const a = localStorage.setItem('body', 'value');
	if (true) {}
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
		out += `<div class="one" id="one"><p class="p_time"><em>${timeConverter(item.time)}</em></p>`;
		out += `<p><b>${item.name}</b></p>`;
		out += `<ul><li>${item.body} - ${item.hours}h</li></ul></div>`;
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

let btnAllDelete = document.getElementById('all-del');

btnAllDelete.addEventListener("click", () => {
	localStorage.clear();
	location.reload();
});


