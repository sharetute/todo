export enum Priority {
  LOW = 'LOW', MIDDLE = 'MIDDLE', HIGH = 'HIGH', EXTREME = 'EXTREME'
}
export const PriorityLabels = {
  [Priority.LOW]: "Low",
  [Priority.MIDDLE]: "middle",
  [Priority.HIGH]: "High",
  [Priority.EXTREME]: "Extreme",
}

export const Priorities = [Priority.LOW, Priority.MIDDLE, Priority.HIGH, Priority.EXTREME];
