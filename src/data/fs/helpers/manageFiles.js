import fs from "fs";

export const readFile = async (path) => {
    let fileTotal = await fs.promises.readFile(path, "UTF-8");
    fileTotal = JSON.parse(fileTotal);
    return fileTotal;
};

export const createFile = async (path, file) => {
    file = JSON.stringify(file, null, 2);
    await fs.promises.writeFile(path, file);
};


export const createFileNP = async (path, file, newProduct) => {
    file.push(newProduct);
    file = JSON.stringify(file, null, 2);
    await fs.promises.writeFile(path, file);
};

