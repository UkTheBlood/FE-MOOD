import { withoutTokenInstance } from './instance'

// 스트리밍 수 추가
export const postStreaming = async (musicId: number) => {
  await withoutTokenInstance.post(`/api/music/${musicId}/streaming`)
}
