export interface NewSchedule {
  name: string;
  startTime: string;
  endTime: string;
  allDay: boolean;
  description?: string;
  place?: string;
}
