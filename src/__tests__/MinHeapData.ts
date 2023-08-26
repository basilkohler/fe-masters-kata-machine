import MinHeapData from "@code/MinHeapData";

test("min heap", function() {
    const heap = new MinHeapData<number>();

    expect(heap.length).toEqual(0);

    heap.insert(5, 55);
    expect(heap.peak()).toEqual({value: 5, data: 55});
    heap.insert(3, 33);
    expect(heap.peak()).toEqual({value: 3, data: 33});
    heap.insert(69, 6969);
    expect(heap.peak()).toEqual({value: 3, data: 33});
    heap.insert(420, 420420);
    expect(heap.peak()).toEqual({value: 3, data: 33});
    heap.insert(4, 44);
    expect(heap.peak()).toEqual({value: 3, data: 33});
    heap.insert(1, 11);
    expect(heap.peak()).toEqual({value: 1, data: 11});
    heap.insert(8, 88);
    expect(heap.peak()).toEqual({value: 1, data: 11});
    heap.insert(7, 77);
    expect(heap.peak()).toEqual({value: 1, data: 11});

    expect(heap.length).toEqual(8);
    expect(heap.delete()).toEqual({value: 1, data: 11});
    expect(heap.peak()).toEqual({value: 3, data: 33});
    expect(heap.delete()).toEqual({value: 3, data: 33});
    expect(heap.delete()).toEqual({value: 4, data: 44});
    expect(heap.delete()).toEqual({value: 5, data: 55});
    expect(heap.length).toEqual(4);
    expect(heap.delete()).toEqual({value: 7, data: 77});
    expect(heap.delete()).toEqual({value: 8, data: 88});
    expect(heap.delete()).toEqual({value: 69, data: 6969});
    expect(heap.delete()).toEqual({value: 420, data: 420420});
    expect(heap.length).toEqual(0);
});


