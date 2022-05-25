

let todoArray =[];

const createAppTitle = (title) => {
	const appTitle = document.createElement('h1');
	appTitle.innerHTML = title;
	return appTitle;
}

const createTodoForm = () => {
	const form = document.createElement('form');
	const input = document.createElement('input');
	const addButton = document.createElement('button');
	const wrapper = document.createElement('DIV');

	form.classList.add('input-group', 'mb-3');
	input.classList.add('form-control');
	input.placeholder = 'Enter text..';
	addButton.classList.add('btn', 'btn-primary');
	wrapper.classList.add('input-group-append');
	addButton.textContent = 'ADD TASK';

	wrapper.append(addButton);
	form.append(input);
	form.append(wrapper);

	return {
		form,
		input,
		addButton,
	}
}

const createTodoList = () => {
	const list = document.createElement('ul');
	list.classList.add('list-group');
	return list; 
}

const createTodoItem = (name) => {
	const todoItem = document.createElement('li');
	const btnWrapper = document.createElement('div');
	const doneBtn = document.createElement('button');
	const deleteBtn = document.createElement('button');

	const randomId = Math.random() * 15.75;
	todoItem.id = randomId.toFixed(2);

	todoItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
	doneBtn.classList.add('btn', 'btn-success');
	deleteBtn.classList.add('btn', 'btn-danger');
	todoItem.textContent = name;
	doneBtn.textContent = 'Ready';
	deleteBtn.textContent = 'Del';

	btnWrapper.append(doneBtn, deleteBtn);
	todoItem.append(btnWrapper);
	return {
		todoItem,
		doneBtn,
		deleteBtn, 
	}
}
 
const changeItemDone = (arr, item) => {
	arr.map(obj => {
		if (obj.id === item.id & obj.done === false) {
			obj.done = true;
		} else {
			obj.done = false;
		}
	})
}

const completeTodoItem = (item, btn) => {
	btn.addEventListener('click', () => {
		todoArray = JSON.parse(localStorage.getItem(key));
		item.classList.toggle('list-group-item-success');
		changeItemDone(todoArray, item);

		localStorage.setItem(key, JSON.stringify(todoArray))
	});
}

const deleteTodoItem = (item, btn) => {
	btn.addEventListener('click', () => {
		todoArray = JSON.parse(localStorage.getItem(key));
		const neaList = todoArray.filter(obj => obj.id !== item.id);
		localStorage.setItem(key, JSON.stringify(neaList));
		item.remove();
	});
}

function createTodoApp(container, title, key) {
    const appTitle = createAppTitle(title);
    const appForm = createTodoForm();
    const appList = createTodoList();

    container.append(appTitle, appForm.form, appList);

	appForm.form.addEventListener('submit', e => {
        e.preventDefault();

        const todoItem = createTodoItem(appForm.input.value);

        if (!appForm.input.value) {
            return;
        }
        completeTodoItem(todoItem.todoItem, todoItem.doneBtn);
        deleteTodoItem(todoItem.todoItem, todoItem.deleteBtn);

        

        const createItemObj = (arr) => {
        	const itemObj = {};
        	itemObj.name = appForm.input.value;
        	itemObj.id = todoItem.todoItem.id;
        	itemObj.done = false;
        	arr.push(itemObj);
        }
        createItemObj(todoArray);
        localStorage.setItem(key, JSON.stringify(todoArray));



		appList.append(todoItem.todoItem);
        appForm.input.value = '';
	})
}








