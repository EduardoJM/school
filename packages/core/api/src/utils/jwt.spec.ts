import { decodeToken, generateToken } from './jwt';

describe("JSON Web Token Utils", () => {
    it('The generateToken must be return a string', () => {
        const token = generateToken({ id: 10 });

        expect(typeof token).toBe('string');
    });

    it('The generateToken and the decodeToken must be generate and decode the valid data', async () => {
        const param = "The Hitchhiker's Guide to the Galaxy";
        const token = generateToken({ id: param });
        const decoded = await decodeToken(token);

        expect(decoded).toMatchObject({
            id: param,
        });
    });
});
