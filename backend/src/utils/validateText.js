export function validateText(text, label, { minChars = 50, minWords = 8 } = {}) {
    if (typeof text !== 'string') return `${label} is required.`;
    const t = text.trim();
    if (t.length < minChars) {
        return `${label} is too short (at least ${minChars} characters).`;
    }

    // mostly letters, not symbol or digit soup
    const letters = (t.match(/\p{L}/gu) || []).length;
    if (letters / t.length < 0.6) {
        return `${label} doesn't look like real text.`;
    }

    const words = t.split(/\s+/).filter((w) => /\p{L}{2,}/u.test(w));
    if (words.length < minWords) {
        return `${label} needs at least ${minWords} words.`;
    }

    // a word looks real if it's short (acronyms like HTML, SQL) or has a vowel and no 6+ consonant run
    const vowel = /[aeiouyàâäéèêëïîôöùûüı]/i;
    const mash = /[bcdfghjklmnpqrstvwxzçğşñ]{6,}/i;
    const plausible = words.filter(
        (w) => w.length <= 5 || (vowel.test(w) && !mash.test(w))
    );
    if (plausible.length / words.length < 0.7) {
        return `${label} doesn't look like real text.`;
    }
    return null;
}