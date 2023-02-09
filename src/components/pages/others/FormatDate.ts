import { formatDistanceToNow, formatRelative } from 'date-fns';


//format Date
export function formatDate(time: string) {
    const distanceNow = formatDistanceToNow(new Date(time), { addSuffix: true })
    const relativeTime = formatRelative(new Date(time), new Date())

    if (distanceNow.includes('days ago') || distanceNow.includes('month ago') || distanceNow.includes('year ago')) {
        return relativeTime
    } else {
        return distanceNow
    }

    return distanceNow;
}