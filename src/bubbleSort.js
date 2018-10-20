import { List, fromJS, toArray } from 'immutable';

const bubbleSorter = source =>
	new Promise((resolve, reject) => {
		if (!List.isList(source))
			return reject(console.error(`${source} not a List()`));

		let notSorted = true;
		// TODO: try and do on List instead of Array
		let array = source.toArray();
		while (notSorted) {
			notSorted = false;
			array.forEach((element, index) => {
				element > array[index + 1] &&
					((array[index] = array[index + 1]),
					(array[index + 1] = element),
					(notSorted = true));
			});
		}
		resolve(fromJS(array));
	});

export default bubbleSorter;
