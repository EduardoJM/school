import crypto from 'crypto';
import axios from 'axios';

export function createGravatarHash(email: string): string {
    const resolved = email.trim().toLowerCase();
    return crypto.createHash('md5').update(resolved).digest('hex');
}

export function getGravatarImageUrl(email: string): string {
    return `https://www.gravatar.com/avatar/${createGravatarHash(email)}?s=200`;
}

export async function checkIfGravatarExists(email: string): Promise<boolean> {
    const url = `${getGravatarImageUrl(email)}&d=404`;
    try {
        const response = await axios.get(url);
        return true;
    } catch {
        return false;
    }
}
