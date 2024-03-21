import express from 'express';
import { createFileAndWriteToFile, getFilesInFolder } from './files.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const folderPath = path.join(__dirname, './files');

app.get('/create', (req, res) => {
    createFileAndWriteToFile();
    res.send('File created successfully');
});

app.get('/files', async (req, res) => {
    try {
      const files = await getFilesInFolder(folderPath);
      res.json(files);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`);
});
