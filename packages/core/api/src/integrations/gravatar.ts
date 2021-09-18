import crypto from 'crypto';

export function createGravatarHash(email: string): string {
    const resolved = email.trim().toLowerCase();
    return crypto.createHash('md5').update(resolved).digest('hex');
}

export function getGravatarImageUrl(email: string): string {
    return `https://www.gravatar.com/avatar/${createGravatarHash(email)}?s=200`;
}
