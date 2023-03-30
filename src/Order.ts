import dayjs from "dayjs";

export interface OrderModel {
    teamMember: string;
    priority: string;
    orderNo: number;
    team: string;
    dueDate: string;
}