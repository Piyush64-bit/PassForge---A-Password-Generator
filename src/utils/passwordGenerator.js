export const CHARACTER_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  special: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

export function generatePassword(length, options) {
  let charset = '';
  let requiredChars = '';

  if (options.uppercase) {
    charset += CHARACTER_SETS.uppercase;
    requiredChars += CHARACTER_SETS.uppercase[Math.floor(Math.random() * CHARACTER_SETS.uppercase.length)];
  }
  
  if (options.lowercase) {
    charset += CHARACTER_SETS.lowercase;
    requiredChars += CHARACTER_SETS.lowercase[Math.floor(Math.random() * CHARACTER_SETS.lowercase.length)];
  }
  
  if (options.numbers) {
    charset += CHARACTER_SETS.numbers;
    requiredChars += CHARACTER_SETS.numbers[Math.floor(Math.random() * CHARACTER_SETS.numbers.length)];
  }
  
  if (options.special) {
    charset += CHARACTER_SETS.special;
    requiredChars += CHARACTER_SETS.special[Math.floor(Math.random() * CHARACTER_SETS.special.length)];
  }

  if (!charset) return '';

  let password = requiredChars;
  
  for (let i = requiredChars.length; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  // Shuffle the password to distribute required characters
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

export function calculatePasswordStrength(password, options) {
  if (!password) return { score: 0, text: 'No password', color: 'text-gray-400' };

  let score = 0;
  let feedback = [];

  // Length scoring
  if (password.length >= 12) score += 25;
  else if (password.length >= 8) score += 15;
  else if (password.length >= 6) score += 10;
  else feedback.push('Use at least 8 characters');

  // Character variety scoring
  if (options.uppercase && /[A-Z]/.test(password)) score += 15;
  if (options.lowercase && /[a-z]/.test(password)) score += 15;
  if (options.numbers && /[0-9]/.test(password)) score += 15;
  if (options.special && /[^A-Za-z0-9]/.test(password)) score += 20;

  // Bonus for using all character types
  const typesUsed = [
    options.uppercase && /[A-Z]/.test(password),
    options.lowercase && /[a-z]/.test(password),
    options.numbers && /[0-9]/.test(password),
    options.special && /[^A-Za-z0-9]/.test(password)
  ].filter(Boolean).length;

  if (typesUsed >= 3) score += 10;

  // Determine strength level and color
  if (score >= 80) {
    return { score, text: 'Very Strong', color: 'text-green-500', bgColor: 'bg-green-500' };
  } else if (score >= 60) {
    return { score, text: 'Strong', color: 'text-green-400', bgColor: 'bg-green-400' };
  } else if (score >= 40) {
    return { score, text: 'Medium', color: 'text-yellow-500', bgColor: 'bg-yellow-500' };
  } else if (score >= 20) {
    return { score, text: 'Weak', color: 'text-orange-500', bgColor: 'bg-orange-500' };
  } else {
    return { score, text: 'Very Weak', color: 'text-red-500', bgColor: 'bg-red-500' };
  }
}