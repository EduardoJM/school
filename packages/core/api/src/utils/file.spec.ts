import fs from 'fs';
import { removeFileIfExists } from './files';

describe("File Utils", () => {
    it('The removeFileIfExists must be remove a file if it exists', () => {
        fs.writeFileSync('./testfile', "The Hitchhiker's Guide to the Galaxy");

        expect(fs.existsSync('./testfile')).toBe(true);
        expect(() => removeFileIfExists('./testfile')).not.toThrowError();
        expect(fs.existsSync('./testfile')).toBe(false);
    });

    it('The removeFileIfExists must be not throw error if file not found', () => {
        expect(() => removeFileIfExists('./anytestfile')).not.toThrowError();
    });

    it('The removeFileIfExists must be not throw error and not remove if the parsed path is not a file', () => {
        fs.mkdirSync('./testpath');
        
        expect(fs.existsSync('./testpath')).toBe(true);
        expect(() => removeFileIfExists('./testpath')).not.toThrowError();
        expect(fs.existsSync('./testpath')).toBe(true);

        fs.rmdirSync('./testpath');
        
        expect(fs.existsSync('./testpath')).toBe(false);
    });
});
