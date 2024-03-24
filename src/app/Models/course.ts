export class Activity{
    activityID! : number;
    activityName! : string;
    activityType! : string;
    date! : Date;
    userID! : string;
    moduleID! : number;
    grade! : number | null;
    color! : string;
    isComplete! : boolean;
}

export class StudentModule{
    moduleID! : number;
    moduleName!: string;
    userID! : string;
}