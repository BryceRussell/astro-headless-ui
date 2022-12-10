import * as crypto from 'crypto';

export function hashId(input: string, length: number = 5, start: number = 0) {
    // Enforce a maximum value on start
    if (start > 32 - length) start = 32 - length;

    // Create a hash of the input string using the SHA-256 algorithm
    const hash = crypto.createHash('sha256').update(input).digest();
    
    // Create a lookup table for mapping hash bytes to letters
    const lookup = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';
    
    // Loop through each byte of the hash
    let result = '';
    for (let i = start; i < hash.length; i++) {
        // Map the byte to a letter using the lookup table
        const letter = lookup[hash[i] % lookup.length];
        // Add the letter to the result string
        result += letter;
        // If the result string is long enough, break out of the loop
        if (result.length >= length) break;
    }
    return result;
}
