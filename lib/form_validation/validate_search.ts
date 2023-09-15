import { ELW_ID, ELW_COUNT, ECS_ID, ECS_COUNT } from '../locker_constants';

export default function validateSearch(building: number, number: number): boolean | void {
    if (building === ELW_ID) {
        if (number < 1 || number > ELW_COUNT) {
            return false;
        }
    }

    if (building === ECS_ID) {
        if (number < 1 || number > ECS_COUNT) {
            return false;
        }
    }

    return true;
}