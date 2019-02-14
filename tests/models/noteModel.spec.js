const noteModel = require('../../data/models/noteModel');
const db = require('../../data/dbConfig');

describe('The Note Model', () => {

    describe('Insert Note', () => {

        beforeEach(() => {
            db('notes').truncate();
        });

        afterAll(() => {
            db('notes').truncate();
        });

        test("throws MissingParam when note object not present", () => {
                noteModel.insert();
                expect(e.name).toBe('MissingParam')
                expect(e.message).toBe('note object');
        });

        test("throws TypeError when note is not object", () => {
                noteModel.insert('Not object');
                expect(e.name).toBe('TypeError')
                expect(e.message).toBe('note is not an object');
        });

        test("throws MissingKey when 'title' key not present in note object", () => {
                noteModel.insert({content: "Content"});
                expect(e.name).toBe('MissingKey')
                expect(e.message).toBe('title');
        });

        test("throws MissingKey when 'content' key not present in note object", () => {
                noteModel.insert({title: "Title"});
                expect(e.name).toBe('MissingKey')
                expect(e.message).toBe('content');
        });

        test("throws TypeError when 'title' value is not string", () => {
                noteModel.insert({title: 0, content: "Content"});
                expect(e.name).toBe('TypeError')
                expect(e.message).toBe("'title' value must be string");
        });

        test("throws TypeError when 'content' value is not string", () => {
                noteModel.insert({title: "Title", content: 0});
                expect(e.name).toBe('TypeError')
                expect(e.message).toBe("'content' value must be string");
        });

        test('returns new note object with id', () => {
            const note = noteModel.insert({title: 'Title', content: 'Content'});
            expect(note).toEqual({id: 1, title: 'Title', content: 'Content'});
        });

    });

    describe('Get All Notes', () => {

        beforeEach(() => {
            db('notes').truncate();
        });

        afterAll(() => {
            db('notes').truncate();
        });

        test('returns array of all notes', () => {
            noteModel.insert({title: 'Title 1', content: 'Content 1'});
            noteModel.insert({title: 'Title 2', content: 'Content 2'});
            noteModel.insert({title: 'Title 3', content: 'Content 3'});

            const notes = noteModel.get();
            expect(notes).toEqual([
                {id: 1, title: 'Title 1', content: 'Content 1'},
                {id: 2, title: 'Title 2', content: 'Content 2'},
                {id: 3, title: 'Title 3', content: 'Content 3'}
            ]);
        });

        test('returns empty array', () => {
            const notes = noteModel.get();
            expect(notes).toEqual([]);
        });

    });

    describe('Get Note by ID', () => {

        beforeEach(() => {
            db('notes').truncate();
        });

        afterAll(() => {
            db('notes').truncate();
        });

        test('throws InvalidID on invalid id', () => {
                noteModel.get(1);
                expect(e.name).toBe('InvalidID');
                expect(e.message).toBe('id does not exist');
        });

        test('returns note object by id', () => {
            noteModel.insert({title: "Title", content: "Content"});
            const note = noteModel.get(1);
            expect(note).toEqual({id: 1, title: "Title", content: "Content"});
        });

    });

    describe('Update Note', () => {

        beforeEach(() => {
            db('notes').truncate();
        });

        afterAll(() => {
            db('notes').truncate();
        });

        test("throws MissingParam when note object not present", () => {
                noteModel.update();
                expect(e.name).toBe('MissingParam')
                expect(e.message).toBe('note object');
        });

        test("throws TypeError when note is not object", () => {
                noteModel.update('Not object');
                expect(e.name).toBe('TypeError')
                expect(e.message).toBe('note is not an object');
        });

        test('throws InvalidID on invalid id', () => {
                noteModel.update(1);
                expect(e.name).toBe('InvalidID');
                expect(e.message).toBe('id does not exist');
        });

        test('throws EmptyObject on empty note object', () => {
                noteModel.insert({title: "Title", content: "Content"});
                noteModel.update(1, {});
                expect(e.name).toBe('EmptyObject');
                expect(e.message).toBe("note object missing 'title' and 'content'");
        });

        test("throws TypeError when 'title' value is not string", () => {
                noteModel.insert({title: "Title", content: "Content"});
                noteModel.update({title: 0});
                expect(e.name).toBe('TypeError')
                expect(e.message).toBe("'title' value must be string");
        });

        test("throws TypeError when 'content' value is not string", () => {
                noteModel.insert({title: "Title", content: "Content"});
                noteModel.update({content: 0});
                expect(e.name).toBe('TypeError')
                expect(e.message).toBe("'content' value must be string");
        });

        test('returns updated note object with title change', () => {
            noteModel.insert({title: "Ttle", content: "Content"});
            const note = noteModel.update(id, {title: "Title"});
            expect(note).toEqual({id: 1, title: "Title", content: "Content"});
        });

        test('returns updated note object with content change', () => {
            noteModel.insert({title: "Title", content: "Cntent"});
            const note = noteModel.update(id, {content: "Content"});
            expect(note).toEqual({id: 1, title: "Title", content: "Content"});
        });

        test('returns updated note object with title and content change', () => {
            noteModel.insert({title: "Ttle", content: "Cntent"});
            const note = noteModel.update(id, {title: "Title", content: "Content"});
            expect(note).toEqual({id: 1, title: "Title", content: "Content"});
        });

    });

    describe('Remove Note', () => {

        beforeEach(() => {
            db('notes').truncate();
        });

        afterAll(() => {
            db('notes').truncate();
        });

        test('throws InvalidID on invalid id', () => {
                noteModel.remove(1);
                expect(e.name).toBe('InvalidID');
                expect(e.message).toBe('id does not exist');
        });

        test('returns count of 1 on record removed', () => {
            const note = noteModel.insert({title: "Title", content: "Content"});
            const count =  noteModel.remove(note.id);
            expect(count).toBe(1);
        });

    });

});