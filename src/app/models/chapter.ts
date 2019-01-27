import { Hero,Monster,Weapon,Armor } from './characters';

export enum CharacterAction{
    attack = "Attack",
    sneak = "Sneak",
    persuade = "Persuade",
    doNothing = "DoNothing",
}

export enum FailureOptions{
    gameOver,
    nextChapter,
}

export enum SuccessOptions{
    rewardExperience,
    rewardEquipment,
    addHerotoParty,
}

export class Chapter{
    story: string[];
    options: CharacterAction[];
    enemyParty: Monster[];
    sneakPersuadeFail: CharacterAction;//maybe array
    ifFail:FailureOptions;
    ifSucceed:SuccessOptions[];
    rewards:{
        experience:number,
        equipment: (Weapon|Armor)[],
        newHero:Hero,
    };
    nextChapter:Chapter;
}