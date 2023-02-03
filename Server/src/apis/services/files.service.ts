import { SCHEMAS_PATH } from '@shared/config'
import fs from 'fs'
import path from 'path'

export const createUserFolder = (name: string) => {

    const folder = path.join(SCHEMAS_PATH, name)

    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder)    
    }
}

export const createSchemaFile = (userFolder: string, filename: string) => {
    const file = path.join(userFolder, filename + '.json')
    fs.writeFileSync(path.join(SCHEMAS_PATH, file), '')
    return file
}

export const deleteSchemaFile = (filename: string) => {
    const file = path.join(SCHEMAS_PATH, filename)
    if (fs.existsSync(file)) {
        fs.rmSync(file)
    }
    return file
}

export const readSchemaFile = (filename: string) => {
    const file = path.join(SCHEMAS_PATH, filename)
    if (fs.existsSync(file)) {
        return fs.readFileSync(file, 'utf-8')
    }
    else {
        fs.writeFileSync(file, '')
        return ''
    }
}

export const updateSchemaFile = (filename: string, content: string) => {
    const file = path.join(SCHEMAS_PATH, filename)
    if (fs.existsSync(file)) {
        fs.rmSync(file)
    }
    fs.writeFileSync(file, content)
}