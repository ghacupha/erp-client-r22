export interface IUniversallyUniqueMapping {
  id?: number;
  universalKey?: string;
  mappedValue?: string | null;
}

export const defaultValue: Readonly<IUniversallyUniqueMapping> = {};
