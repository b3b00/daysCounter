export const leaveTypes  = ["", "CP", "CPA", "CP-1", "RTT", "RTT-1", "FRAC"];

export const typecolors = ["#fff", "#2ccbc0", "#2ccbc0", "#2ccbc0", "#e0e612", "#e0e612", "#a50123"];

export interface Leave {
    Date : Date;
    Type : string;
}