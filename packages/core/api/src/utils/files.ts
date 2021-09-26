import fs from 'fs';

export function removeFileIfExists(file: string) {
    if (fs.existsSync(file)) {
        const stat = fs.statSync(file);
        if (stat.isFile()) {
            fs.unlinkSync(file);
        }
    }
}
