document.addEventListener('DOMContentLoaded', pageSetup);

function pageSetup() {
	console.log('connected');
	getDoggos();
}

function getDoggos() {
	fetch('http://localhost:3000/pups').then((response) => response.json()).then((json) => processDoggos(json));
}

function processDoggos(dogData) {
	dogData.forEach((dog) => makeDogButton(dog));
}

function makeDogButton(dog) {
	let bar = document.querySelector('#dog-bar');
	let btn = document.createElement('button');
	btn.innerText = dog.name;
	btn.dogId = dog.id;
	btn.addEventListener('click', chooseDog);
	bar.append(btn);
}

function chooseDog(e) {
	let id = e.currentTarget.dogId;
	fetch(`http://localhost:3000/pups/${id}`).then((response) => response.json()).then((json) => showDoggo(json));
}

function showDoggo(dog) {
	console.log(dog);
	let dogShow = document.querySelector('#dog-info');
	dogShow.innerHTML = '';
	let nameBlock = document.createElement('h2');
	nameBlock.innerText = dog.name;

	let urlBlock = document.createElement('img');
	urlBlock.src = dog.image;

	let goodButton = document.createElement('button');
	goodButton.good = dog.isGoodDog;
	goodButton.dogId = dog.id;
	if (dog.isGoodDog) {
		goodButton.innerText = 'Make this Dog Bad';
	} else {
		goodButton.innerText = 'Make this Dog Good';
	}
	goodButton.addEventListener('click', buttonControl);

	dogShow.append(nameBlock, urlBlock, goodButton);
}

function buttonControl(btn) {
	if (btn.target.good) {
		btn.target.good = false;
		btn.target.innerText = 'Make this Dog Good';
	} else {
		btn.target.good = true;
		btn.target.innerText = 'Make this Dog Bad';
	}
	console.log(btn.target.dogId);
	console.log(btn.target.good);
}
