export function ok(data: any, meta?: any) {
  return { success: true, data, meta };
}

export function fail(error: { message: string; code?: string; details?: any }) {
  return { success: false, error };
}
