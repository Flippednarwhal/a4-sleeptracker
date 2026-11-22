import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { StorageService } from '../services/storage.service'

@Injectable({
  providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData:boolean = false;
	public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];

	constructor(public storageService:StorageService) {
		if(SleepService.LoadDefaultData) {
			this.addDefaultData();
		SleepService.LoadDefaultData = false;
	}
		this.retrieve_overnight();
		this.retrieve_sleepiness();
	}

	private addDefaultData() {
		var goToBed = new Date();
		goToBed.setDate(goToBed.getDate() - 1); //set to yesterday
		goToBed.setHours(1, 3, 0); //1:03am
		var wakeUp = new Date();
		wakeUp.setTime(goToBed.getTime() + 8 * 60 * 60 * 1000); //Sleep for exactly eight hours, waking up at 9:03am
		this.logOvernightData(new OvernightSleepData(goToBed, wakeUp)); // add that person was asleep 1am-9am yesterday
		var sleepinessDate = new Date();
		sleepinessDate.setDate(sleepinessDate.getDate() - 1); //set to yesterday
		sleepinessDate.setHours(14, 38, 0); //2:38pm
		this.logSleepinessData(new StanfordSleepinessData(4, sleepinessDate)); // add sleepiness at 2pm
		goToBed = new Date();
		goToBed.setDate(goToBed.getDate() - 1); //set to yesterday
		goToBed.setHours(23, 11, 0); //11:11pm
		wakeUp = new Date();
		wakeUp.setTime(goToBed.getTime() + 9 * 60 * 60 * 1000); //Sleep for exactly nine hours
		this.logOvernightData(new OvernightSleepData(goToBed, wakeUp));
	}

	async retrieve_overnight(){
		let retrieve_data = await this.storageService.get("Overnight");
		if (retrieve_data){
			for (const val of retrieve_data){
				let temp_sleep = new OvernightSleepData(new Date(val.sleepStart), new Date(val.sleepEnd));
				SleepService.AllSleepData.push(temp_sleep);
				SleepService.AllOvernightData.push(temp_sleep);
			}
		}
	}

	async retrieve_sleepiness(){
		let retrieve_data = await this.storageService.get("Sleepiness");
		if (retrieve_data){
			for (const val of retrieve_data){
				let temp_sleep = new StanfordSleepinessData(val.loggedValue, new Date(val.loggedAt));
				SleepService.AllSleepData.push(temp_sleep);
				SleepService.AllSleepinessData.push(temp_sleep);
			}
		}
	}

	public logOvernightData(sleepData:OvernightSleepData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllOvernightData.push(sleepData);
		this.storageService.set("Overnight", SleepService.AllOvernightData);
	}

	public logSleepinessData(sleepData:StanfordSleepinessData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);
		this.storageService.set("Sleepiness", SleepService.AllSleepinessData);
	}
}
