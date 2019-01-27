import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Hero, Weapon, Armor, Monster, Warrior, Ranger, Rogue, Priest, checkRace, ExperienceToLevel } from '../models/characters';
import { Chapter, SuccessOptions } from '../models/chapter';
import { Chapter1 } from '../chapters/Chapter1';
import { ClassOptions, RaceOptions, GenderOptions } from '../models/character-options';

@Injectable()
export class GameControllerService{
    constructor(private router: Router){}

    mainCharacter:Hero;
    currentChapter:Chapter = Chapter1;
    isFighting=false;

    actionDelay: number = 1500;

    heroParty: Hero[] = [];
    partyInvernotry:(Weapon|Armor)[] = [];
    availableHeros: Hero[] = [];
    enemyParty:Monster[] = this.currentChapter.enemyParty;

    setMainCharacter(character){
        switch(character.class){
            case ClassOptions.warrior:
                this.mainCharacter = new Warrior(character.name,character.gender,character.race,1,10,{attack:0,sneak:0,persuade:0,intelligenc:0},new Weapon("Knife",1,3),new Armor("Clothes",0));
                break;
            case ClassOptions.ranger:
                this.mainCharacter = new Ranger(character.name,character.gender,character.race,1,10,{attack:0,sneak:0,persuade:0,intelligenc:0},new Weapon("Knife",1,3),new Armor("Clothes",0));
                break;
            case ClassOptions.rogue:
                this.mainCharacter = new Rogue(character.name,character.gender,character.race,1,10,{attack:0,sneak:0,persuade:0,intelligenc:0},new Weapon("Knife",1,3),new Armor("Clothes",0));
                break;
            case ClassOptions.priest:
                this.mainCharacter = new Priest(character.name,character.gender,character.race,1,10,{attack:0,sneak:0,persuade:0,intelligenc:0},new Weapon("Knife",1,3),new Armor("Clothes",0));
                break;

            default:
                console.log("Error while creating mainCharacter");
                break;
        }

        checkRace(this.mainCharacter);
        this.heroParty.push(this.mainCharacter);
        this.router.navigateByUrl('/story');
    }

    encounterSuccess(): string[]{
        let messages: string[] = [];
        this.currentChapter.ifSucceed.forEach(reward => {
            switch (reward) {
                case SuccessOptions.rewardExperience:
                    messages.push(`Each member of your party received ${this.currentChapter.rewards.experience} experience.`)
                    this.heroParty.forEach(hero =>{
                        hero.experience += this.currentChapter.rewards.experience;
                        if(hero.experience >= ExperienceToLevel[hero.level]){
                            messages.push(`${hero.name} leveled up! Upgrade their stats on the inventory screen.`);
                            hero.levelUp();
                        }
                    });
                    break;
                case SuccessOptions.rewardEquipment:
                    messages.push("You received the following equipment: ");
                    this.currentChapter.rewards.equipment.forEach(equipement =>{
                        if(equipement instanceof Armor){
                            messages.push(`${equipement.name} -- Attack Barrier Bonus: ${equipement.attackBarrierBonus}`);
                        }else{
                            messages.push(`${equipement.name} -- Min Damage: ${equipement.minDamage}, Max Damage:${equipement.maxDamage}`);
                        }
                        this.partyInvernotry.push(equipement);
                    });
                    break;
                case SuccessOptions.addHerotoParty:    
                    let newHero: Hero = this.currentChapter.rewards.newHero;
                    if(this.heroParty.length<3){
                        messages.push(`A new hero joined your party! ${newHero.name} - ${newHero.characterRole} - lvl ${newHero.level}`);
                        this.heroParty.push(newHero);
                    }else{
                        messages.push(`A new hero is availabe to join your party! ${newHero.name} - ${newHero.characterRole} - lvl ${newHero.level}`);
                        this.availableHeros.push(newHero);
                    }
                    break;
            }
        });
        return messages;
    }

    nextChapter(): void{
        this.heroParty.forEach(hero => hero.rest);
        this.currentChapter = this.currentChapter.nextChapter;
        this.enemyParty = this.currentChapter.enemyParty;
    }

    gameOver(): void{
        this.mainCharacter = undefined;
        this.currentChapter =  Chapter1;
        this.heroParty = [];
        this.partyInvernotry = [];
        this.availableHeros = [];
        this.enemyParty = this.currentChapter.enemyParty;

        this.router.navigateByUrl("/");
    }
}