import { Component } from "@angular/core";
import { GameControllerService } from 'src/app/services/game-controller.service';
import { CharacterSkills, Hero, Weapon, Armor, ExperienceToLevel } from 'src/app/models/characters';

@Component({
    selector:"inventory",
    templateUrl:"./inventory.html",
    styleUrls:["./inventory.css",],
})
export class InventoryComponent{
    constructor(private gameController : GameControllerService) {}

    inventoryIsOpen: boolean = false;

    _characterSkills: typeof CharacterSkills = CharacterSkills;
    heroParty: Hero[] = this.gameController.heroParty;
    mainCharacter: Hero = this.gameController.mainCharacter;
    availableHeroes: Hero[] = this.gameController.availableHeros;
    inventory: (Weapon | Armor)[] = this.gameController.partyInvernotry;
    _experienceToLevel: typeof ExperienceToLevel = ExperienceToLevel;

    selectedHero: Hero = this.heroParty[0];
    showAvailableHeroesScreen: boolean = false;
    isFighting: boolean = this.gameController.isFighting;

    openInventory() {
        this.inventoryIsOpen = true;
        this.heroParty = this.gameController.heroParty;
        this.availableHeroes = this.gameController.availableHeros;
        this.inventory = this.gameController.partyInvernotry;
        this.selectedHero = this.heroParty[0];
        this.showAvailableHeroesScreen = false;
        this.isFighting = this.gameController.isFighting;
    }

    closeInventory() {
        this.inventoryIsOpen = false;
    }

    setSelectedHero(newHero : Hero) {
        this.showAvailableHeroesScreen = false;
        if (this.selectedHero !== newHero) {
            this.selectedHero = newHero;
        }
    }

    improveSkill(skill: CharacterSkills) {
        this.selectedHero.skills[skill]++;
        this.selectedHero.availableSkillPoints--;
    }

    equipItem(item: Weapon|Armor) {
        if (item instanceof Weapon) {
            this.inventory.push(this.selectedHero.equippedWeapon);
            this.selectedHero.equipNewWeapon(item);
        } else if (item instanceof Armor) {
            this.inventory.push(this.selectedHero.equippedArmor);
            this.selectedHero.equipNewArmor(item);
        }
        this.inventory.splice(this.inventory.indexOf(item), 1);
    }

    removeCharacterFromParty() {
        this.availableHeroes.push(this.selectedHero);
        this.heroParty.splice(this.heroParty.indexOf(this.selectedHero), 1);
        this.selectedHero = this.mainCharacter;
    }

    showAvailableHeroes() {
        this.selectedHero = undefined;
        this.showAvailableHeroesScreen = true;
    }

    addHeroToParty(hero: Hero) {
        this.heroParty.push(hero);
        this.availableHeroes.splice(this.availableHeroes.indexOf(hero), 1);
        this.setSelectedHero(hero);
    }
}