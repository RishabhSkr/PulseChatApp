import { faker } from "@faker-js/faker";
import { User } from "../model/user.js";

const createUser = async (numUsers) => {
    try {
        const usersPromise = [];

        for (let i = 0; i < numUsers; i++) {
            const tempUser = User.create({
                name: faker.person.fullName(),
                username: faker.internet.username(),
                bio: faker.lorem.sentence(10),
                password: "password",
                avatar: {
                    url: faker.image.avatar(),
                    public_id: faker.system.fileName(),
                },
            });
            usersPromise.push(tempUser);
        }

        await Promise.all(usersPromise);
        // Use 0 for successful exit
        process.exit(0);
    } catch (error) {
        console.error("Error creating users:", error);
        // Use non-zero for error exit
        process.exit(1);
    }
};


export { createUser };
