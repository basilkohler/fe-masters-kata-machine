export function test_list(list: List<number>): void {
	list.append(5);
	expect(list.get(0)).toEqual(5);
	list.append(7);
	expect(list.get(1)).toEqual(7);
	list.append(9); 
	expect(list.get(2)).toEqual(9);
	// [5,7,9]
	expect(list.removeAt(1)).toEqual(7); 
	// [5,9]
	expect(list.length).toEqual(2);

	list.append(11); // [5,9,11]
	expect(list.removeAt(1)).toEqual(9); // [5,11]
	expect(list.remove(9)).toEqual(undefined);
	expect(list.removeAt(0)).toEqual(5); // [11]
	expect(list.removeAt(0)).toEqual(11); // []
	expect(list.length).toEqual(0);

	list.prepend(5); // [5]
	list.prepend(7); // [7,5]
	list.prepend(9); // [9,7,5]

	expect(list.get(2)).toEqual(5);
	expect(list.get(0)).toEqual(9);
	expect(list.remove(9)).toEqual(9); // [7.5]
	expect(list.length).toEqual(2);
	expect(list.get(0)).toEqual(7);
}
