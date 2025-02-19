function generateRandomPin(maxLength: number): number {
    const min = Math.pow(10, maxLength - 1);
    const max = Math.pow(10, maxLength) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getPinLength(score: number): number {
    const THRESHOLD_FOR_FIVE_DIGIT_PIN = 50;
    const THRESHOLD_FOR_SIX_DIGIT_PIN = 100;

    if (score >= THRESHOLD_FOR_SIX_DIGIT_PIN) {
        return 6;
    } else if (score >= THRESHOLD_FOR_FIVE_DIGIT_PIN) {
        return 5;
    } else {
        return 4;
    }
}

function padToFourDigits(pin: string) {
    return pin.toString().padStart(4, '0');
}

export function generatePin(score: number): string {
    const pinLength = getPinLength(score);
    const pin = generateRandomPin(pinLength).toString();

    if (pinLength === 4) {
        return padToFourDigits(pin);
    }

    return pin;
}
