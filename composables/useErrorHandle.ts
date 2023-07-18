import handleError from './handleError'

export default function useErrorHandle(err: any, loading_state: boolean) {
  const { loadingState } = handleError(err)
  loading_state = loadingState
}
