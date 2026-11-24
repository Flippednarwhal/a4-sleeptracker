import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	private sleepStart:Date;
	private sleepEnd:Date;

	constructor(sleepStart:Date, sleepEnd:Date) {
		super();
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
	}

	override logged_time(): Date {
		return this.sleepEnd;
	}

	override summaryString():string {
		var sleepStart_ms = this.sleepStart.getTime();
		var sleepEnd_ms = this.sleepEnd.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;
		    
		// Convert to hours and minutes
		return Math.floor(difference_ms / (1000*60*60)) + " hours, " + Math.floor(difference_ms / (1000*60) % 60) + " minutes" + " of sleep";
	}

	override dateString():string {
		return this.sleepStart.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: "numeric", minute: "2-digit"}) + " → " + this.sleepEnd.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: "numeric", minute: "2-digit"});
	}

	duration_asleep(){
		var sleepStart_ms = this.sleepStart.getTime();
		var sleepEnd_ms = this.sleepEnd.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;

		return difference_ms;
	}
}
