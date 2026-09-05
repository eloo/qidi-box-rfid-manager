export type AuthMethod = "A" | "B";
export type AuthKey = [number, number, number, number, number, number];

// Some QIDI tags still retain the default MIFARE factory key in the sector trailer,
// even when the data format matches the QIDI layout. The dump from the tag shows
// the trailer is all-FF, so we try the default key first and only then the QIDI key.
export const QIDI_AUTH_KEYS: AuthKey[] = [
  [0xff, 0xff, 0xff, 0xff, 0xff, 0xff],
  [0xd3, 0xf7, 0xd3, 0xf7, 0xd3, 0xf7],
];

export function getAuthenticationAttempts(
  sector: number,
): Array<[AuthMethod, AuthKey]> {
  void sector;

  const attempts: Array<[AuthMethod, AuthKey]> = [];

  for (const key of QIDI_AUTH_KEYS) {
    attempts.push(["A", key]);
    attempts.push(["B", key]);
  }

  return attempts;
}

export function formatKey(key: AuthKey): string {
  return key.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
