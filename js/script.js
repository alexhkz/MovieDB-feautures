'use strict';

// Дожидаемся построения ДОМ-структуры. Для этого прописываем (DOMContentLoaded).
document.addEventListener('DOMContentLoaded', () => {
	const movieDB = {
		movies: [
			 "Логан",
			 "Лига справедливости",
			 "Ла-ла лэнд",
			 "Одержимость",
			 "Скотт Пилигрим против..."
		]
  	};
  
	// Получаем элементы, с которыми хотим работать.
	const adv = document.querySelectorAll('.promo__adv img'),
			poster = document.querySelector('.promo__bg'),
			genre = poster.querySelector('.promo__genre'),
			movieList = document.querySelector('.promo__interactive-list'),
			addForm = document.querySelector('form.add'),
			addInput = addForm.querySelector('.adding__input'),
			checkbox = addForm.querySelector('[type="checkbox"]');

	// Навешиваем обработчик событий на нашу форму.
	// Записываем в переменные то, что ввёл пользователь в input и то, что он отметил галочку в checkbox.
	// Проверяем, что пользователь ввёл не пустое значение (newFilm = true) , то выполняем код.
	// Если больше 21 символа, то добавляем троеточие.
	// Если поставили галочку в checkbox, то выводим в консоль надпись.
	// Записываем в базу данных тот фильм, который ввёл пользователь и производим сортировку массива.

	addForm.addEventListener('submit', (e) => {
		e.preventDefault();

		let newFilm = addInput.value;
		const favorite = checkbox.checked;

		if (newFilm) {

			if (newFilm.length > 21) {
				newFilm = `${newFilm.substring(0, 22)}...`;
			}

			if (favorite) {
				console.log('Добавляем любимый фильм');
			}

			movieDB.movies.push(newFilm);
			sortArr(movieDB.movies);
	
			createMovieList(movieDB.movies, movieList);
		}

		e.target.reset();
	});

	// Создаём функцию, которая удаляет рекламу.
	const deleteAdv = (arr) => {
		arr.forEach(item => {
			item.remove();
		});
	};

	const makeChanges = () => {
		poster.style.backgroundImage = 'url("img/bg.jpg")';

		genre.textContent = 'драма';
	};

	// Функция сортировки.
	const sortArr = (arr) => {
		arr.sort();
	};

	// Функция создания нашего листа фильмов.
	// Затираем старый movieList.
	// С помощью перебора псевдомассива создаём новые элементы по порядку.
	// Перебираем все наши корзинки('.delete'), вешаем на кнопки обработчик удаляющий родительский элемент со страницы.
	// Вырезаем с помощью splice() элементы из базы данных. i - номер, который мы удаляем. 1 - сколько элементов удалить. 
	// Вызываем createMovieList() тем самым заново перестраивая список.
	function createMovieList(films, parent) {
		parent.innerHTML = "";
		sortArr(films);

		films.forEach((film, i) => {
			parent.innerHTML += `
				<li class="promo__interactive-item">${i}. ${film}
					<div class="delete"></div>
				</li>
			`;
		});
		
		document.querySelectorAll('.delete').forEach((btn, i) => {
			btn.addEventListener('click', () => {
				btn.parentElement.remove();
				films.splice(i, 1);

				createMovieList(films, parent);
			});
		});
	}

	deleteAdv(adv);
	makeChanges();
	createMovieList(movieDB.movies, movieList);
});



