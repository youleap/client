export const SpinnerState = {
  Start: 'Start',
  Stop: 'Stop',
  Succeed: 'Succeed',
  Failed: 'Failed',
  Clear: 'Clear',
  Warn: 'Warn',
  Info: 'Info',
  Text: 'Text'
} as const

export type SpinnerState = typeof SpinnerState[keyof typeof SpinnerState];