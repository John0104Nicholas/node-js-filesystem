import { writeFile, readdir, readFile } from 'node:fs/promises';
import path from 'path';

function callback(err) {
    if (err) throw err;
    else console.log("The file has been saved!");
}

export function createFileAndWriteToFile() {
    const timestamp = new Date().toISOString();
    writeFile("files/currentDate.txt", timestamp, 'utf8', callback);
}

export async function getFilesInFolder(folderPath) {
    try {
        const files = await readdir(folderPath);
        const filePromises = files.map(async file => {
            const filePath = path.join(folderPath, file);
            return {
                name: file,
                content: await readFile(filePath, 'utf8')
            };
        });
        const fileContents = await Promise.all(filePromises);
        return fileContents;
    } catch (err) {
        console.error('Error reading files:', err);
        throw err;
    }
}
