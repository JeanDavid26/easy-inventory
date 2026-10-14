import { BadRequestException } from '@nestjs/common'

// Convertit les paramètres de requête from / to (dates ISO) en dates, ou lève une erreur 400
export function parsePeriod (from?: string, to?: string): { from?: Date, to?: Date } {
  const dFrom = from ? new Date(from) : undefined
  const dTo = to ? new Date(to) : undefined
  if ((dFrom && isNaN(dFrom.getTime())) || (dTo && isNaN(dTo.getTime()))) {
    throw new BadRequestException('Période invalide.')
  }
  return { from: dFrom, to: dTo }
}
