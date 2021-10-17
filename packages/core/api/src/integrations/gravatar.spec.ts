import { createGravatarHash, checkIfGravatarExists, getGravatarImageUrl } from './gravatar';

describe('Gravatar Integration', () => {
    it('The createGravatarHash must be return a string for a e-mail', () => {
        const email = 'universe@uni42.com.br';
        const hash = createGravatarHash(email);
        
        expect(typeof hash).toBe('string');
    });

    it('The checkIfGravatarExists must be return true if a avatar exists in gravatar', async () => {
        const validEmail = 'eduardo_y05@outlook.com';
        const value = await checkIfGravatarExists(validEmail);
        
        expect(value).toBe(true);
    });

    it('The checkIfGravatarExists must be return false if a avatar not exists in gravatar', async () => {
        const invalidEmail = 'eee@eee.com';
        const value = await checkIfGravatarExists(invalidEmail);
        
        expect(value).toBe(false);
    });

    it('The getGravatarImageUrl must be return a string', () => {
        const email = 'any@any.com.br';
        const url = getGravatarImageUrl(email);

        expect(typeof url).toBe('string');
    });
});
