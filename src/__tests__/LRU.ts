import LRU from "@code/LRU";

test("LRU", function() {
    const lru = new LRU<string, number>(3) as ILRU<string, number>;

    // [foo/69, ]
    expect(lru.get("foo")).toEqual(undefined);
    lru.update("foo", 69);
    expect(lru.get("foo")).toEqual(69);

    // [bar,420, foo/69, ]
    lru.update("bar", 420);
    expect(lru.get("bar")).toEqual(420);

    // [baz/1337, bar,420, foo/69, ]
    lru.update("baz", 1337);
    expect(lru.get("baz")).toEqual(1337);

    // [ball,69420, baz/1337, bar,420, ]
    lru.update("ball", 69420);
    expect(lru.get("ball")).toEqual(69420);
    expect(lru.get("foo")).toEqual(undefined);
    expect(lru.get("bar")).toEqual(420);
    // [bar/420, ball,69420, baz/1337]
    lru.update("foo", 69);
    // [foo/69, bar/420, ball,69420]
    expect(lru.get("bar")).toEqual(420);
    expect(lru.get("foo")).toEqual(69);

    // shouldn't of been deleted, but since bar was get'd, bar was added to the
    // front of the list, so baz became the end
    expect(lru.get("baz")).toEqual(undefined);
});

