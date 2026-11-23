import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonDatetime, IonButton, IonSelect, IonSelectOption, IonText, IonItemSliding} from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { FormsModule } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular/standalone';
import {addIcons} from 'ionicons'
import {bedOutline, moonOutline, batteryHalfOutline} from 'ionicons/icons'
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonDatetime, IonButton, IonSelect, IonSelectOption, FormsModule, IonText, IonItemSliding, IonIcon],
})
export class HomePage {
	time = new Date();
	sleep_time = new Date(this.time.getTime() - 8 * 60 * 60 * 1000)
	waketime_start = this.time_conversion(this.time);
	bedtime_start = this.time_conversion(this.sleep_time)
	sleepy_value = 0;

  constructor(public sleepService:SleepService, private actionSheetController:ActionSheetController) {
		addIcons({moonOutline, batteryHalfOutline, bedOutline})
	}

	time_conversion(raw_time: Date): string{
		let time = raw_time.getTime();
		let utc_date = new Date(time);
		let local_time = time - utc_date.getTimezoneOffset() * 60 * 1000;
		let temp_date = new Date(local_time);
		let converted_time = temp_date.toISOString().slice(0, -1);
		return converted_time;
	}

	

	save_sleepiness(){
		let sleepiness_time = new Date();
		let saved_sleepiness = new StanfordSleepinessData(this.sleepy_value, sleepiness_time);
		this.sleepService.logSleepinessData(saved_sleepiness);
		this.sleepy_value = 0;
	}

	save_sleep_date(){
		let saved_waketime = new Date(this.waketime_start);
		let saved_bedtime = new Date(this.bedtime_start);

		let saved_sleep = new OvernightSleepData(saved_bedtime, saved_waketime);
		this.sleepService.logOvernightData(saved_sleep);
		console.log("Saving called!")
	}

	ngOnInit() {
		console.log('wake:', this.waketime_start);
		console.log(this.allSleepData);
		
	}

	async tap_log(log:SleepData){
		let sheet = await this.actionSheetController.create({ header: log.dateString(), buttons: [
		{text: 'Delete', role: 'destructive', handler: () => this.sleepService.delete_entry(log)}, {text:'Cancel', role: 'cancel'}
		]});

		await sheet.present();
	}


	sleep_valid(){
		let wake = new Date(this.waketime_start);
		let sleep = new Date(this.bedtime_start);
		if (wake.getTime() < sleep.getTime() || wake.getTime() == sleep.getTime()){
			return false;
		}
		return true;
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */

	get isDayTime() {
		let time_of_day = new Date().getHours();
		if (time_of_day > 6 && time_of_day < 18){
			return true;
		}
		return false;
	}

	get allSleepData() {
		let cpy_sleep = [...SleepService.AllSleepData];
		let new_time = cpy_sleep.sort(function(a, b){return b.logged_time().getTime() - a.logged_time().getTime()})
		return new_time;
	}

	get scaleValues() {
		return StanfordSleepinessData.ScaleValues;
	}


}
