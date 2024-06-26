import { logger } from './logger'

const MAX_CONTEXT_SIZE = 1_000_000 // ~ 1MB

export const setContext = async (supabase: any, context: any, options: { log: boolean } = { log: false }) => {
  if (!context || context.constructor !== Object) return

  const contextJson = JSON.stringify(context)
  if (contextJson === '{}' || contextJson.length > MAX_CONTEXT_SIZE) return

  const result = await supabase.rpc('bemi_set_context', { context: contextJson })
  if (options.log) logger.log(result)
}
