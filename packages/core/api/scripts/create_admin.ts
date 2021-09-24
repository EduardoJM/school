import 'reflect-metadata';
import readline from 'readline';
import { getRepository } from 'typeorm';
import createConnection from '../src/connection';
import { Admin, User } from '../src/components/Entities';

const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

createConnection().then(async (connection) => {
    if (!connection) {
        return;
    }
    input.question('Qual é o seu e-mail?', async (email) => {
        const userRepo = getRepository(User);
        let user = await userRepo.findOne({ email });
        if (user) {
            console.log('Conta já cadastrada.');
            input.close();
            return;
        }
        input.question('Qual é o seu nome completo?', (name) => {
            user = new User();
            user.email = email;
            user.fullName = name;
            input.question('Insira uma senha:', (password1) => {
                input.question('Confirme sua senha:', async (password2) => {
                    if (password1 !== password2) {
                        console.log('Ops, as senhas não conferem!');
                        input.close();
                    } else {
                        if (!user) {
                            console.log('Houve um erro!');
                            input.close();
                            return;
                        }
                        user.password = password1;
                        user.hashPassword();
                        const userResult = await userRepo.save(user);
                        const admin = new Admin();
                        admin.user = userResult;
                        const adminRepo = getRepository(Admin);
                        await adminRepo.save(admin);
                        input.close();
                    }
                });
            });
        });
    });
});
