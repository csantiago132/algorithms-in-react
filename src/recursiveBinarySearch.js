import { List } from 'immutable';

const binarySearch = (sourceArray, sourceWord) => {
	return new Promise((resolve, reject) => {
		if (!List.isList(sourceArray))
			return reject(
				console.error(`${sourceArray} not Immutable.List()`),
			);

		if (sourceWord.constructor !== String)
			return reject(console.error(`${sourceWord} not a String`));

		let slicedArray;
		let results;
		let middle = Math.floor(sourceArray.size / 2);
		const word = sourceWord
			.toLowerCase()
			.replace(/\b[a-z]/g, letter => letter.toUpperCase());

		if (sourceArray.get(middle) !== word && sourceArray.size === 1) {
			return resolve((results = `"${word}" not on the list`));
		}

		sourceArray.get(middle) === word &&
			(results = `Search results: ${sourceArray.get(middle)}`);

		sourceArray.get(middle) > word &&
			((slicedArray = sourceArray.setSize(middle)),
			(results = binarySearch(slicedArray, word)));

		sourceArray.get(middle) < word &&
			((slicedArray = sourceArray.skip(middle)),
			(results = binarySearch(slicedArray, word)));

		return resolve(results);
	});
};

export default binarySearch;
