export const coinMessages: string[] = [
  "Cha-ching! Another one for the hoard!",
  "I'm gonna buy a car with this! Wait, I can't drive...",
  "More gold for my coil-lection!",
  "Slithering in style—money makes the snake!",
  "Cash is king, and I’m the sneaky ruler!",
  "This snake’s got a taste for treasure!",
  "Shiny and mine-y!",
  "Another coin? I’m on a roll!",
  "Can’t stop, won’t stop—keep the cash coming!",
  "Snakes may shed skin, but I never shed wealth!",
  "Hiss-terically rich!",
  "Slithering my way to financial freedom!",
  "Every coin makes me slither faster!",
  "If i grow wings i can be a real dragon with my hoard!"
];

export const dnbMessages: string[] = [
  "HISSS! That was MY money!",
  "Cursed bank! Give it back!",
  "Noooo! I was gonna buy a golden nest!",
  "This bank is robbing ME?! Outrageous!",
  "Slither and suffer… I hate this place!",
  "A snake’s worst enemy — greedy financial institutions!",
  "Hey! I worked hard for that! Sort of...",
  "Theft! Fraud! I demand a refund!",
  "Why do bad things happen to rich snakes?!",
  "Grrr… time to earn it back the slithery way!",
  "Oh no! My precious coins were eaten by interest rates!",
  "I hate banks! I hate money! I hate… oh, wait, no I don’t.",
  "Are all banks this greedy?",
];

export const whatDoesTheSnakeSay = (context: "coin" | "dnb") => {
  const messages = context === "coin" ? coinMessages : dnbMessages;
  return messages[Math.floor(Math.random() * messages.length)];
}