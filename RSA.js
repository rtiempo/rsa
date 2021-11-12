const { create, all } = require('mathjs');

const config = {
  number: 'BigNumber',
  precision: 600,
};
const math = create(all, config);

const MIN = 1;

const getPrimes = (min, max) => {
  const result = Array(max + 1)
    .fill(0)
    .map((_, x) => x);
  for (let x = 2; x <= Math.sqrt(max + 1); x++) {
    for (let y = x ** 2; y < max + 1; y += x) delete result[y];
  }
  return Object.values(result.slice(min));
};
const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const getRandomPrime = (min, max) => {
  const primes = getPrimes(min, max);
  return primes[getRandomNum(0, primes.length - 1)];
};

const primeCommonFactor = (e, z) => {
  return z % e == 0 ? true : false;
};

let modInverse = function (a, b) {
  a %= b;
  for (let x = 1; x < b; x++) {
    if ((a * x) % b == 1) {
      return x;
    }
  }
};

const Encrypt = (n, e, plainText) => {
  let cipherText = '';

  for (let x = 0; x < plainText.length; x++) {
    cipherText += String.fromCharCode(
      math.evaluate(`${plainText.charCodeAt(x)} ^ ${e} % ${n}`)
    );
  }

  return cipherText;
};

const Decrypt = (n, d, cipherText) => {
  let decryptedText = '';
  let u;

  for (let x = 0; x < cipherText.length; x++) {
    decryptedText += String.fromCharCode(
      math.evaluate(`${cipherText.charCodeAt(x)} ^ ${d} % ${n}`)
    );
  }

  return decryptedText;
};

const RSA = (p, q, plainText) => {
  const n = p * q;
  const z = (p - 1) * (q - 1);
  let e,
    d,
    cipherText = '',
    decryptedText = '';

  do {
    e = getRandomPrime(MIN, n);
  } while (e < n && primeCommonFactor(e, z) === true);

  cipherText = Encrypt(n, e, plainText);

  d = modInverse(e, z);

  console.log('e: ' + e);
  console.log('d: ' + d);
  console.log('n: ' + n);
  console.log('z: ' + z);

  decryptedText = Decrypt(n, d, cipherText);

  const response = {
    cipherText: cipherText,
    decryptedText: decryptedText,
  };

  return response;
};

// change values for checking
console.log(RSA(11, 13, 'RASTAMAN'));
console.log(RSA(11, 13, 'ENCRYPTION'));
