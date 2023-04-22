import { withoutTokenInstance } from './instance'

// 검색
export const getSearch = async (keyword: string) => {
  const response = await withoutTokenInstance.get(
    `/api/music/search?keyword=${encodeURIComponent(keyword)}`
  )
  return {
    composerInfo: response.data.data.composerInfo,
    composer: response.data.data.composerSong,
    musicTitle: response.data.data.musicTitle,
  }
}
