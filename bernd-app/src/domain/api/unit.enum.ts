export enum Unit {
  MILLIGRAM = 'MILLIGRAM',
  MILLILITER = 'MILLILITER',
  PIECE = 'PIECE'
}

export function unitLabel(unit: Unit): string {
  switch (unit) {
    case Unit.MILLIGRAM:
      return 'Milligram';
    case Unit.MILLILITER:
      return 'Milliliter';
    case Unit.PIECE:
      return 'Piece';
  }
}

export const unitOptions = [
  { label: unitLabel(Unit.MILLIGRAM), value: Unit.MILLIGRAM },
  { label: unitLabel(Unit.MILLILITER), value: Unit.MILLILITER },
  { label: unitLabel(Unit.PIECE), value: Unit.PIECE }
];
