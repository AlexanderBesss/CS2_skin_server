import { readFile, writeFile } from 'node:fs/promises';

export async function replaceInFile(filePath, searchValue, replaceValue) {
    let content = await readFile(filePath, 'utf8');
    if (typeof searchValue === 'string') {
        content = content.split(searchValue).join(replaceValue);
    } else if (searchValue instanceof RegExp) {
        content = content.replace(searchValue, replaceValue);
    }
    await writeFile(filePath, content, 'utf8');
    console.log(`Updated file: ${filePath}`);
}


export async function fileContains(filePath, searchValue) {
    const content = await readFile(filePath, 'utf8');
    if (typeof searchValue === 'string') {
        return content.includes(searchValue);
    } else if (searchValue instanceof RegExp) {
        return searchValue.test(content);
    } else {
        throw new Error('searchValue must be a string or RegExp');
    }
}