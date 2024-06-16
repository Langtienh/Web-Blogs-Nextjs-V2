export const newID = (): string => new Date().getTime().toString();

export const subID = (id: string): string => id.substring(14);
export const mergeID = (authId: string, userId: string): string =>
  `${authId}x${userId}`;
