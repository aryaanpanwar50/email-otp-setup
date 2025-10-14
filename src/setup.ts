#!/usr/bin/env node
import fs from 'fs';
import path, { resolve } from 'path';
import readline from 'readline';

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

function question(query:string):Promise<string>{
    return new Promise(resolve=>rl.question(query,resolve));
}

async function main() {
    console.log("Welcome to Project-1");

    const email = await question("Enter your email: ");
    const pass  = await question("Enter your app-password of this email: ")

    rl.close();

    //Create .env file

    const envContent = `EMAIL=${email}\nPASS=${pass}\n`;
    const envPath = path.join(process.cwd(),".env");
    fs.writeFileSync(envPath,envContent,{encoding:"utf-8"});

    console.log(".env file is created at", envPath);
    console.log("Setup complete! You can now use the package");


}

main();
